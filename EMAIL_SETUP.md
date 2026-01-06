# Email Setup Instructions

The contact form now uses Resend to send emails. Follow these steps to set it up:

## Step 1: Sign up for Resend

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (free tier includes 3,000 emails/month)
3. Verify your email address

## Step 2: Get your API Key

1. After signing in, go to the [API Keys section](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name (e.g., "Portfolio Contact Form")
4. Copy the API key (you'll only see it once!)

## Step 3: Verify a Domain (Optional but Recommended)

For production use, you should verify your domain:
1. Go to [Domains](https://resend.com/domains) in Resend dashboard
2. Click "Add Domain"
3. Follow the DNS configuration instructions

**Note:** For testing, you can use the default `onboarding@resend.dev` sender email, but it will show "via resend.dev" in the recipient's email client.

## Step 4: Set Environment Variables

### For Local Development:

Create a `.env.local` file in the `portfolio-website` directory:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=your-email@yourdomain.com
CONTACT_EMAIL=your-email@yourdomain.com
```

Replace:
- `re_xxxxxxxxxxxxxxxxxxxxx` with your actual Resend API key
- `your-email@yourdomain.com` with your email address (or use `onboarding@resend.dev` for testing)

### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `RESEND_API_KEY` = Your Resend API key
   - `RESEND_FROM_EMAIL` = The email address to send from (must be verified in Resend)
   - `CONTACT_EMAIL` = The email address where you want to receive contact form submissions

## Step 5: Test the Form

1. Start your development server: `npm run dev`
2. Navigate to the contact form
3. Fill out and submit the form
4. Check your email inbox for the message

## Troubleshooting

### Emails not sending?

1. **Check API Key**: Make sure `RESEND_API_KEY` is set correctly
2. **Check Email Addresses**: Ensure `RESEND_FROM_EMAIL` and `CONTACT_EMAIL` are valid
3. **Check Resend Dashboard**: Look at the [Logs](https://resend.com/emails) section in Resend to see if there are any errors
4. **Check Browser Console**: Open browser DevTools and check for any errors in the console
5. **Check Vercel Logs**: If deployed, check Vercel function logs for errors

### Using a different email service?

If you prefer to use a different service (SendGrid, Mailgun, etc.), you'll need to:
1. Update the API route at `app/api/contact/route.ts`
2. Install the appropriate npm package
3. Update the environment variables

### Free Alternative: Web3Forms

If you want a simpler, no-setup solution, you can use Web3Forms:
1. Go to [https://web3forms.com](https://web3forms.com)
2. Get your access key
3. Update the Contact component to use Web3Forms instead

Let me know if you need help setting this up!
