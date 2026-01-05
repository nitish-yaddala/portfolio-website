# Deploy to Vercel - Much Easier!

Since GitHub Actions is having issues, let's use **Vercel** instead - it's specifically designed for Next.js and works automatically!

## Why Vercel?
- ✅ Free for personal projects
- ✅ Automatically detects Next.js
- ✅ One-click deployment from GitHub
- ✅ Automatic deployments on every push
- ✅ Custom domain support
- ✅ Works perfectly with Next.js (no static export needed!)

## Step-by-Step Guide:

### Step 1: Go to Vercel
1. Visit: https://vercel.com
2. Click **"Sign Up"** (or "Log In" if you have an account)
3. **Sign in with GitHub** (recommended - uses your GitHub account)

### Step 2: Import Your Repository
1. After signing in, you'll see a dashboard
2. Click **"Add New..."** → **"Project"**
3. Find your repository: **`nitish-yaddala/portfolio-website`**
4. Click **"Import"**

### Step 3: Configure (Usually Auto-Detected!)
1. Vercel will auto-detect it's a Next.js project
2. **Framework Preset**: Should show "Next.js" (leave as is)
3. **Root Directory**: Leave as `./` (default)
4. **Build Command**: Should be `npm run build` (auto-filled)
5. **Output Directory**: Leave empty (Next.js handles this)
6. **Install Command**: Should be `npm install` (auto-filled)

### Step 4: Deploy!
1. Click **"Deploy"** button
2. Wait 1-2 minutes
3. Your portfolio will be live at: `https://portfolio-website-[random].vercel.app`
4. You can add a custom domain later!

### Step 5: Custom Domain (Optional)
1. Go to your project settings in Vercel
2. Click **"Domains"**
3. Add your custom domain (if you have one)

## Automatic Future Deployments
- Every time you push to GitHub `main` branch
- Vercel automatically detects the push
- Builds and deploys automatically
- Your site updates in 1-2 minutes!

## Benefits Over GitHub Pages:
- ✅ No workflow configuration needed
- ✅ Works with full Next.js (no static export limitations)
- ✅ Faster builds
- ✅ Better error messages
- ✅ Preview deployments for pull requests
- ✅ Analytics included (optional)

## Your Portfolio Will Be Live At:
- Default: `https://portfolio-website-[random-id].vercel.app`
- You can add custom domain: `https://yourdomain.com`

This should work immediately! 🚀
