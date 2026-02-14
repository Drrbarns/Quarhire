# Hubtel Integration Testing Guide

## Summary of Changes

### What Was Wrong
1. **Wrong Endpoint**: Status check was using `api-topup.hubtel.com` but Hubtel requires `rmsc.hubtel.com`
2. **No Verification**: Callback handler was trusting incoming callbacks without verifying with Hubtel API
3. **Missing Idempotency**: No protection against duplicate updates or status downgrades
4. **No `verifiedAt` Tracking**: No way to know when/if a payment was verified

### Files Changed
1. `lib/hubtel.ts` - Complete refactor with correct endpoint and centralized `hubtelGetTransactionStatus()`
2. `app/api/hubtel/callback/route.ts` - Hardened to verify before trusting, idempotent updates
3. `app/api/hubtel/status/route.ts` - Simplified to use centralized function
4. `app/api/hubtel/status-check/route.ts` - Updated to use centralized function
5. `app/api/hubtel/verify/route.ts` - **NEW** manual verification endpoint
6. Database: Added `payment_verified_at` column to `bookings` table

---

## Testing Checklist

### Local Testing

#### 1. Test Status Check API
```bash
# Replace YOUR_CLIENT_REFERENCE with an actual payment reference
curl "http://localhost:3000/api/hubtel/status?clientReference=YOUR_CLIENT_REFERENCE"
```

Expected response:
```json
{
  "success": true,
  "status": "Paid",
  "transaction": {
    "clientReference": "...",
    "transactionId": "...",
    "amount": 350.00,
    "isPaid": true
  }
}
```

#### 2. Test Manual Verify Endpoint
```bash
# GET - Quick status check (no DB updates)
curl "http://localhost:3000/api/hubtel/verify?clientReference=YOUR_CLIENT_REFERENCE"

# POST - Full verification with DB update and email
curl -X POST http://localhost:3000/api/hubtel/verify \
  -H "Content-Type: application/json" \
  -d '{"clientReference": "YOUR_CLIENT_REFERENCE"}'
```

#### 3. Simulate Callback
```bash
curl -X POST http://localhost:3000/api/hubtel/callback \
  -H "Content-Type: application/json" \
  -d '{
    "ResponseCode": "0000",
    "Status": "Success",
    "Data": {
      "CheckoutId": "test-checkout-123",
      "SalesInvoiceId": "test-invoice-456",
      "ClientReference": "YOUR_CLIENT_REFERENCE",
      "Status": "Success",
      "Amount": 350.00,
      "CustomerPhoneNumber": "0201234567",
      "PaymentDetails": {
        "MobileMoneyNumber": "0201234567",
        "PaymentType": "MOMO",
        "Channel": "mtn-gh"
      },
      "Description": "Test payment"
    }
  }'
```

### Production Testing (Vercel)

#### ⚠️ IP Whitelisting Required
Hubtel's `rmsc.hubtel.com` endpoint requires IP whitelisting. Vercel uses dynamic IPs.

**Solutions:**
1. **Contact Hubtel**: Ask them to whitelist Vercel's IP ranges or use a different endpoint
2. **Use Static IP Proxy**: Services like Fixie or QuotaGuard Static provide static IPs for Vercel
3. **Rely on Callbacks**: The callback verification will work because Hubtel initiates the request

#### 1. Test with Real Payment
1. Make a test booking with a small amount (e.g., GHS 1)
2. Complete payment on Hubtel's checkout page
3. Verify you're redirected to success page
4. Check admin dashboard for booking status

#### 2. Verify Callback Worked
1. Go to Admin > Payments
2. Check "Hubtel Callbacks" tab
3. Look for your payment reference
4. Status should show "Paid" and `verification_status` should be "verified"

#### 3. Test Manual Verification (Admin)
1. Go to Admin > Bookings > [Pending Booking]
2. Click "Verify Payment Status" button
3. Should show verification result and update booking if paid

---

## Environment Variables Required

```env
# Hubtel Credentials (NEVER expose client-side)
HUBTEL_CLIENT_ID=your_api_id
HUBTEL_CLIENT_SECRET=your_api_key
HUBTEL_MERCHANT_ACCOUNT_NUMBER=your_merchant_id

# Optional (defaults to https://rmsc.hubtel.com)
HUBTEL_BASE_URL=https://rmsc.hubtel.com
```

---

## Known Limitations

1. **IP Whitelisting**: `rmsc.hubtel.com` may require whitelisted IPs. If you get 403 errors, this is likely the cause.

2. **Callback Verification**: If Hubtel's status API is unavailable, callbacks will be logged as "unverified" but still return 200 to Hubtel. You can manually verify later.

3. **Email Sending**: If email sending fails, the payment is still marked as successful. Check logs for email errors.

---

## Troubleshooting

### "403 Forbidden" on Status Check
- Your server IP is not whitelisted with Hubtel
- Contact Hubtel to whitelist your IP or use a static IP proxy

### "No transaction data in response"
- Transaction may not exist yet (payment not initiated)
- ClientReference may be incorrect

### Callback not updating booking
- Check `hubtel_callbacks` table for verification_status
- If "unverified", run manual verification
- Check booking `payment_reference` matches callback ClientReference
