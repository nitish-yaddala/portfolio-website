# GitHub Pages Setup Instructions

## ✅ Configuration Complete!

Your portfolio is now configured for GitHub Pages deployment. Here's what was set up:

### 1. Next.js Static Export
- Configured `next.config.js` for static export
- Set basePath to `/portfolio-website` for GitHub Pages
- Enabled image optimization for static export

### 2. GitHub Actions Workflow
- Created `.github/workflows/deploy.yml`
- Automatically builds and deploys on every push to `main` branch

### 3. Site Configuration
- Updated site URL to GitHub Pages URL
- Configured asset paths for GitHub Pages

## 🚀 Next Steps:

### Step 1: Enable GitHub Pages in Repository Settings

1. Go to your repository: https://github.com/nitish-yaddala/portfolio-website
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - **Deploy from a branch**
   - **Branch**: `gh-pages` (or select the branch GitHub Actions creates)
   - **Folder**: `/ (root)`
5. Click **Save**

### Step 2: Wait for GitHub Actions to Deploy

1. Go to **Actions** tab in your repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Wait for it to complete (usually 2-3 minutes)
4. Once it shows a green checkmark, your site is deployed!

### Step 3: Access Your Site

Your portfolio will be available at:
**https://nitish-yaddala.github.io/portfolio-website**

### 🔄 Automatic Deployments

Every time you push to the `main` branch, GitHub Actions will:
1. Build your Next.js app
2. Export it as static files
3. Deploy to GitHub Pages
4. Your site will update automatically!

### 📝 Notes

- The first deployment may take a few minutes
- GitHub Pages can take up to 10 minutes to update after deployment
- If you change the repository name, update `basePath` in `next.config.js`
- For local development, the basePath is automatically disabled

### 🐛 Troubleshooting

If the deployment fails:
1. Check the **Actions** tab for error messages
2. Make sure GitHub Pages is enabled in repository settings
3. Verify the workflow file is in `.github/workflows/deploy.yml`
4. Check that `next.config.js` has `output: 'export'`
