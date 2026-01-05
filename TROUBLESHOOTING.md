# Troubleshooting: GitHub Pages Only Shows README

If GitHub Pages is only showing your README file, here's how to fix it:

## Issue: Pages Source Configuration

The problem is likely that GitHub Pages is set to deploy from a branch instead of using GitHub Actions.

## Solution:

1. **Go to Settings → Pages**
   - https://github.com/nitish-yaddala/portfolio-website/settings/pages

2. **Change the Source**
   - Under "Source", you should see options:
     - "Deploy from a branch" (current - WRONG)
     - "GitHub Actions" (this is what we need!)
   
3. **Select "GitHub Actions"**
   - If you see "GitHub Actions" option, select it
   - Click "Save"
   - This tells GitHub to use the workflow instead of serving files from a branch

4. **If "GitHub Actions" option is NOT available:**
   - This means the workflow hasn't run successfully yet
   - Go to Actions tab and check if the workflow ran/failed
   - The workflow needs to complete at least once for "GitHub Actions" option to appear

## Alternative: Check Workflow Status

1. Go to Actions tab: https://github.com/nitish-yaddala/portfolio-website/actions
2. Check if "Deploy to GitHub Pages" workflow has run
3. If it failed, check the error messages
4. If it hasn't run, manually trigger it: "Run workflow" → Select `main` → "Run workflow"

## Why This Happens

- GitHub Pages defaults to serving files from a branch (like `main` or `gh-pages`)
- Your portfolio is built by GitHub Actions workflow, not stored directly in a branch
- The built files are in the `/out` folder, which is created during the build process
- GitHub Pages needs to be told to use the workflow output, not branch files

## Quick Fix Checklist

- [ ] Go to Settings → Pages
- [ ] Change source from "Deploy from a branch" to "GitHub Actions"
- [ ] Save the changes
- [ ] Go to Actions tab and verify workflow is running/completed
- [ ] Wait 2-3 minutes for deployment
- [ ] Refresh your portfolio URL
