# Step-by-Step Guide: Deploy Portfolio to GitHub Pages

## ✅ Code Status
Your code is already configured for GitHub Pages deployment! The GitHub Actions workflow is set up and ready.

---

## Step 1: Verify Your Repository

1. Go to your repository: **https://github.com/nitish-yaddala/portfolio-website**
2. Make sure you're logged into GitHub
3. Verify that all your code is pushed (check the latest commits)

---

## Step 2: Enable GitHub Pages

1. **Go to Repository Settings**
   - Click the **"Settings"** tab at the top of your repository
   - It's located in the navigation bar: `Code | Issues | Pull requests | Actions | Projects | Wiki | Security | Insights | Settings`

2. **Navigate to Pages Section**
   - In the left sidebar, scroll down and click **"Pages"**
   - It's under the "Code and automation" section

3. **Configure Source**
   - Under **"Source"**, select:
     - **"Deploy from a branch"** (if not already selected)
   - Under **"Branch"**:
     - Branch: **`gh-pages`** (or select the branch that GitHub Actions creates)
     - Folder: **`/ (root)`**
   - Click **"Save"**

---

## Step 3: Trigger GitHub Actions Deployment

1. **Check Actions Tab**
   - Click the **"Actions"** tab in your repository
   - You should see a workflow called **"Deploy to GitHub Pages"**

2. **If Workflow Doesn't Run Automatically**
   - Go to the **"Actions"** tab
   - Click **"Deploy to GitHub Pages"** workflow on the left
   - Click **"Run workflow"** dropdown button (top right)
   - Select branch: **`main`**
   - Click **"Run workflow"** button

3. **Wait for Deployment**
   - Watch the workflow run (it takes 2-3 minutes)
   - You'll see steps: "Checkout", "Setup Node.js", "Install dependencies", "Build", "Setup Pages", "Upload artifact", "Deploy"
   - Wait for all steps to show green checkmarks ✅

---

## Step 4: Access Your Live Portfolio

Once deployment completes:

1. **Go back to Settings → Pages**
2. You'll see a message like:
   ```
   Your site is live at https://nitish-yaddala.github.io/portfolio-website/
   ```

3. **Visit Your Site**
   - Open: **https://nitish-yaddala.github.io/portfolio-website/**
   - Your portfolio should be live!

---

## Step 5: Custom Domain (Optional)

If you want to use a custom domain:

1. **Get a Domain** (e.g., from Namecheap, Google Domains, etc.)
2. **Add DNS Records**
   - Add a CNAME record pointing to: `nitish-yaddala.github.io`
   - Or add A records for GitHub Pages IPs (see GitHub docs)
3. **Configure in GitHub**
   - Go to Settings → Pages
   - Under "Custom domain", enter your domain
   - Check "Enforce HTTPS"
4. **Update next.config.js**
   - Update `basePath` to `/` (remove `/portfolio-website`)
   - Update `siteConfig.url` in `config/site.ts`

---

## Automatic Future Deployments

✅ **Every time you push to `main` branch:**
- GitHub Actions automatically builds and deploys
- Your site updates within 2-3 minutes
- No manual steps needed!

---

## Troubleshooting

### Issue: Workflow Fails
- Check the "Actions" tab for error messages
- Common issues:
  - Build errors (check terminal output)
  - Missing dependencies
  - Configuration errors

### Issue: Site Shows 404
- Wait 5-10 minutes (GitHub Pages can take time to propagate)
- Check that the workflow completed successfully
- Verify the branch is set to `gh-pages` in Settings → Pages

### Issue: Styles Not Loading
- Make sure `basePath` in `next.config.js` is `/portfolio-website`
- Clear browser cache (Ctrl+Shift+R)
- Check browser console for errors

### Issue: Need to Redeploy
- Push a new commit to `main` branch (even a small change)
- Or manually trigger workflow in Actions tab

---

## Quick Reference

- **Repository**: https://github.com/nitish-yaddala/portfolio-website
- **Live Site**: https://nitish-yaddala.github.io/portfolio-website/
- **Settings**: https://github.com/nitish-yaddala/portfolio-website/settings
- **Pages Settings**: https://github.com/nitish-yaddala/portfolio-website/settings/pages
- **Actions**: https://github.com/nitish-yaddala/portfolio-website/actions

---

## Summary

1. ✅ Code is already pushed to GitHub
2. ✅ GitHub Actions workflow is configured
3. ⏭️ Enable GitHub Pages in Settings → Pages
4. ⏭️ Select branch: `gh-pages`, folder: `/ (root)`
5. ⏭️ Wait for workflow to complete (2-3 minutes)
6. ✅ Visit: https://nitish-yaddala.github.io/portfolio-website/

Your portfolio will be live on GitHub Pages! 🚀
