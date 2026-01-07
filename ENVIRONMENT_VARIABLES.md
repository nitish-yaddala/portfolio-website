# Environment Variables Guide

This document explains all environment variables needed for the portfolio website and how to set them up.

## Required Environment Variables

### 1. `RESEND_API_KEY` ⚠️ **REQUIRED for Contact Form**
- **Purpose**: API key for Resend email service (used for contact form)
- **Where to get it**:
  1. Go to https://resend.com
  2. Sign up for a free account (100 emails/day free)
  3. Navigate to **API Keys** section
  4. Click **Create API Key**
  5. Copy the key (starts with `re_`)
- **Where to add in Vercel**:
  1. Go to your Vercel project dashboard
  2. Click **Settings** → **Environment Variables**
  3. Click **Add New**
  4. Name: `RESEND_API_KEY`
  5. Value: Paste your Resend API key
  6. Select environments: **Production**, **Preview**, **Development** (or just Production)
  7. Click **Save**
- **Note**: Without this, the contact form will return a 503 error

---

## Optional Environment Variables

### 2. `RESEND_FROM_EMAIL` (Optional)
- **Purpose**: Email address to send contact form emails FROM
- **Format**: `Your Name <your-email@yourdomain.com>` or just `your-email@yourdomain.com`
- **Default**: `Portfolio Contact <onboarding@resend.dev>` (if not set)
- **Where to add**: Same as above in Vercel Environment Variables
- **Note**: 
  - You need to verify your domain in Resend to use custom "from" addresses
  - Or use a Resend-verified email address

### 3. `CONTACT_EMAIL` (Optional)
- **Purpose**: Email address where contact form submissions will be sent TO
- **Format**: `your-email@example.com`
- **Default**: Uses `RESEND_FROM_EMAIL` or `your-email@example.com` if not set
- **Where to add**: Same as above in Vercel Environment Variables
- **Note**: This is where you'll receive contact form submissions

### 4. `UPSTASH_REDIS_REST_URL` (Optional - for Rate Limiting)
- **Purpose**: Redis REST URL for advanced rate limiting
- **Where to get it**:
  1. Go to https://upstash.com
  2. Sign up for a free account
  3. Create a new Redis database
  4. Copy the **REST URL** from the database details
- **Where to add**: Vercel Environment Variables
- **Note**: Without this, the app uses simple in-memory rate limiting (resets on server restart)

### 5. `UPSTASH_REDIS_REST_TOKEN` (Optional - for Rate Limiting)
- **Purpose**: Redis REST token for authentication
- **Where to get it**: Same Upstash database - copy the **REST TOKEN**
- **Where to add**: Vercel Environment Variables
- **Note**: Must be set together with `UPSTASH_REDIS_REST_URL`

---

## Quick Setup Guide

### Minimum Setup (Contact Form Only)
1. **Get Resend API Key**:
   - Sign up at https://resend.com
   - Create API key
   - Copy the key

2. **Add to Vercel**:
   - Project → Settings → Environment Variables
   - Add `RESEND_API_KEY` with your key
   - Add `CONTACT_EMAIL` with your email (optional but recommended)

3. **Redeploy**:
   - Vercel will automatically redeploy, or
   - Go to Deployments → Click "Redeploy" on latest

### Full Setup (With Rate Limiting)
1. Follow "Minimum Setup" above
2. **Get Upstash Redis**:
   - Sign up at https://upstash.com
   - Create Redis database
   - Copy REST URL and REST TOKEN
3. **Add to Vercel**:
   - Add `UPSTASH_REDIS_REST_URL`
   - Add `UPSTASH_REDIS_REST_TOKEN`

---

## How to Add Environment Variables in Vercel

### Step-by-Step:
1. Go to https://vercel.com/dashboard
2. Select your project (`portfolio-website` or similar)
3. Click **Settings** in the top navigation
4. Click **Environment Variables** in the left sidebar
5. Click **Add New** button
6. Fill in:
   - **Name**: The variable name (e.g., `RESEND_API_KEY`)
   - **Value**: The actual value/secret
   - **Environments**: Select where it applies:
     - ✅ Production (for live site)
     - ✅ Preview (for preview deployments)
     - ✅ Development (for local dev, optional)
7. Click **Save**
8. **Important**: After adding variables, you may need to redeploy:
   - Go to **Deployments** tab
   - Click the three dots (⋯) on the latest deployment
   - Click **Redeploy**

---

## Testing Your Setup

1. **Check Build**: After adding variables, check that the build succeeds
2. **Test Contact Form**: 
   - Visit your live site
   - Fill out the contact form
   - Submit and check if you receive the email
3. **Check Logs**: 
   - In Vercel → Deployments → Click on a deployment
   - Check "Functions" tab for any errors

---

## Troubleshooting

### Contact Form Returns 503 Error
- ✅ Check that `RESEND_API_KEY` is set in Vercel
- ✅ Verify the API key is correct (starts with `re_`)
- ✅ Make sure you redeployed after adding the variable

### Emails Not Sending
- ✅ Check `CONTACT_EMAIL` is set correctly
- ✅ Verify your Resend account is active
- ✅ Check Resend dashboard for email logs/errors
- ✅ Verify domain/email in Resend if using custom "from" address

### Build Fails
- ✅ The code now handles missing API keys gracefully
- ✅ Build should succeed even without `RESEND_API_KEY`
- ✅ Contact form will show error if API key is missing at runtime

---

## Security Notes

⚠️ **Never commit environment variables to Git!**
- They should only be in Vercel's environment variables
- The `.env.local` file (if used locally) should be in `.gitignore`
- Never share your API keys publicly

---

## Summary

**Minimum Required:**
- `RESEND_API_KEY` - For contact form to work

**Recommended:**
- `CONTACT_EMAIL` - Where to receive form submissions
- `RESEND_FROM_EMAIL` - Custom "from" address (requires domain verification)

**Optional:**
- `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` - For persistent rate limiting
