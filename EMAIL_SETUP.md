# Email Setup Guide for Quarhire

This guide will help you set up email functionality for the contact form and booking confirmations.

## Overview

The website uses **Resend** for sending emails. Resend is a modern email API that works great with Next.js and Vercel.

## Step 1: Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (you get 3,000 emails/month free)
3. Verify your email address

## Step 2: Get Your API Key

1. Log into your Resend dashboard
2. Go to **API Keys** in the sidebar
3. Click **Create API Key**
4. Give it a name (e.g., "Quarhire Production")
5. Copy the API key (it starts with `re_`)

## Step 3: Set Up Environment Variables

### For Local Development:

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
# Resend API Key
RESEND_API_KEY=re_your_actual_api_key_here

# Admin Email - Where contact form submissions will be sent
ADMIN_EMAIL=info@quarhire.com

# From Email (Optional - for production with verified domain)
# EMAIL_FROM=Quarhire <noreply@quarhire.com>
```

### For Production (Vercel/Other Hosting):

1. **Vercel:**
   - Go to your project settings
   - Navigate to **Environment Variables**
   - Add each variable:
     - `RESEND_API_KEY` = your Resend API key
     - `ADMIN_EMAIL` = your admin email address
     - `EMAIL_FROM` = (optional) your verified domain email

2. **Other Hosting:**
   - Add the environment variables through your hosting platform's dashboard
   - Make sure they're set for the **Production** environment

## Step 4: Verify Your Domain (Optional but Recommended)

For production, you should verify your domain with Resend:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `quarhire.com`)
4. Add the DNS records Resend provides to your domain's DNS settings
5. Wait for verification (usually takes a few minutes)
6. Once verified, update `EMAIL_FROM` to use your domain:
   ```env
   EMAIL_FROM=Quarhire <noreply@quarhire.com>
   ```

**Note:** For development/testing, you can use Resend's test domain (`onboarding@resend.dev`) without verification.

## Step 5: Test the Contact Form

1. Start your development server: `npm run dev`
2. Go to the contact page: `http://localhost:3000/contact`
3. Fill out and submit the contact form
4. Check your `ADMIN_EMAIL` inbox for the submission
5. Check the browser console and server logs for any errors

## Troubleshooting

### Emails Not Sending?

1. **Check Environment Variables:**
   - Make sure `.env.local` exists and has the correct variables
   - Restart your dev server after adding/changing env variables
   - For production, verify variables are set in your hosting platform

2. **Check Resend Dashboard:**
   - Go to Resend dashboard → **Logs**
   - Check if emails are being sent and if there are any errors
   - Look for rate limits or account issues

3. **Check Server Logs:**
   - Look for console warnings about missing API keys
   - Check for error messages in the terminal/console

4. **Test API Key:**
   - Make sure your API key is correct (starts with `re_`)
   - Ensure the API key hasn't been revoked in Resend dashboard

### Common Issues:

- **"RESEND_API_KEY not configured"**: Add the API key to your `.env.local` file
- **"ADMIN_EMAIL not configured"**: Add your admin email to `.env.local`
- **Emails going to spam**: Verify your domain with Resend and use a custom `EMAIL_FROM`
- **Rate limits**: Free tier allows 3,000 emails/month. Upgrade if needed.

## What Gets Sent?

### Contact Form:
- Sends to: `ADMIN_EMAIL`
- Contains: Name, email, subject, message
- Reply-to: Set to the customer's email (so you can reply directly)

### Booking Confirmations:
- Sends to: Customer's email (from booking form)
- CC/BCC: Also sends notification to `ADMIN_EMAIL`
- Contains: Full booking details, payment status, references

## Support

If you need help:
1. Check Resend documentation: [https://resend.com/docs](https://resend.com/docs)
2. Check Resend status: [https://status.resend.com](https://status.resend.com)
3. Contact Resend support through their dashboard

