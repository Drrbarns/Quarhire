# Hubtel Payment Integration Guide for Quarhire

## ✅ Integration Complete

The Hubtel Online Checkout API has been integrated as the primary payment gateway for Quarhire bookings.

---

## 📁 Files Created/Modified

### New Files:
1. **`lib/hubtel.ts`** - Hubtel utility functions and types
2. **`app/api/hubtel/checkout/route.ts`** - Initiates checkout session
3. **`app/api/hubtel/callback/route.ts`** - Receives payment notifications
4. **`app/api/hubtel/status/route.ts`** - Checks transaction status
5. **`app/booking/success/page.tsx`** - Payment success/confirmation page

### Modified Files:
1. **`app/booking/page.tsx`** - Updated to use Hubtel instead of Paystack
2. **`.env.example`** - Added Hubtel configuration variables

---

## 🔧 Configuration Required

Add these to your `.env.local` file:

```env
# Hubtel Payment Gateway
HUBTEL_CLIENT_ID=your_hubtel_client_id
HUBTEL_CLIENT_SECRET=your_hubtel_client_secret
HUBTEL_MERCHANT_ACCOUNT_NUMBER=your_pos_sales_id
```

### Getting Your Credentials:
1. Log in to your **Hubtel Business Dashboard**
2. Navigate to **Settings** → **API Integration**
3. Copy your **Client ID** and **Client Secret**
4. Find your **POS Sales ID** (merchantAccountNumber)

---

## 🔄 Payment Flow

### When Customer Clicks "Book Now & Pay":

1. **Form Submission** → Booking data is saved
2. **Email Sent** → Confirmation email to customer
3. **Hubtel API Call** → Creates checkout session
4. **Redirect** → Customer goes to Hubtel payment page
5. **Payment** → Customer selects payment method (MTN MoMo, Vodafone Cash, Card, etc.)
6. **OTP Verification** → Customer verifies with phone OTP
7. **Callback** → Hubtel sends payment status to `/api/hubtel/callback`
8. **Redirect Back** → Customer returns to `/booking/success?ref=xxx`
9. **Status Check** → Page verifies payment status

### When Customer Clicks "Reserve Now (No Payment)":

1. **Form Submission** → Booking data is saved
2. **Email Sent** → Confirmation email to customer
3. **Success Message** → Displayed with booking details

---

## 📡 API Endpoints

### POST `/api/hubtel/checkout`
Creates a new Hubtel checkout session.

**Request:**
```json
{
  "totalAmount": 600,
  "description": "Quarhire Sedan - Airport to Accra Mall",
  "clientReference": "QRH-ABC123",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+233240665648"
}
```

**Response:**
```json
{
  "success": true,
  "checkoutUrl": "https://pay.hubtel.com/xxx",
  "checkoutDirectUrl": "https://pay.hubtel.com/xxx/direct",
  "checkoutId": "xxx",
  "clientReference": "QRH-ABC123"
}
```

### POST `/api/hubtel/callback`
Receives payment notifications from Hubtel (webhook).

### GET `/api/hubtel/status?clientReference=xxx`
Checks transaction status (requires IP whitelisting).

---

## 💡 Important Notes

### IP Whitelisting (For Status Check)
The status check endpoint requires your server's IP to be whitelisted with Hubtel.
- Contact your **Hubtel Retail Systems Engineer**
- Submit up to 4 IP addresses
- Without whitelisting, status checks will return 403 Forbidden

### Callback URL
Your callback URL must be publicly accessible:
- **Production:** `https://yourdomain.com/api/hubtel/callback`
- Hubtel will POST payment status to this URL

### Pricing
The fixed vehicle prices are:
- **Sedan:** GHS 600
- **Mini SUV:** GHS 900
- **Premium SUV:** GHS 1,500
- **Executive Van:** GHS 2,000

---

## 🧪 Testing

1. Add your Hubtel credentials to `.env.local`
2. Restart the development server: `npm run dev`
3. Go to `/booking`
4. Fill out the form
5. Click "Book Now & Pay"
6. You should be redirected to Hubtel's payment page

---

## 🐛 Troubleshooting

### "Payment gateway not configured"
- Check that `.env.local` has all three Hubtel variables
- Ensure values are not the placeholder defaults
- Restart the development server

### "Payment initialization failed"
- Verify your Hubtel credentials are correct
- Check the browser console for detailed error
- Check server logs for API response

### Callback not received
- Ensure callback URL is publicly accessible
- Check Hubtel dashboard for transaction logs
- Use `/api/hubtel/status` to manually check (requires IP whitelist)

---

## 📞 Support

- **Quarhire Customer Support:** +233 240 665 648
- **Hubtel Technical Support:** Contact your Hubtel Retail Systems Engineer
