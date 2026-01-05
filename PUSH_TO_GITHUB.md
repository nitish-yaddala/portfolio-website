# Push Portfolio to GitHub

## Step 1: Install Git (if not installed)
Download from: https://git-scm.com/download/win

## Step 2: Open Git Bash or Command Prompt
After installing Git, use Git Bash or Command Prompt (not PowerShell in Cursor)

## Step 3: Navigate to project directory
```bash
cd "C:\Users\ynikk\Downloads\Job Hunt\portfolio-website"
```

## Step 4: Initialize Git (if not already initialized)
```bash
git init
```

## Step 5: Add all files
```bash
git add .
```

## Step 6: Make initial commit
```bash
git commit -m "Initial commit: Portfolio website with hacker theme"
```

## Step 7: Create GitHub repository
1. Go to https://github.com
2. Click the "+" icon → "New repository"
3. Name it: `portfolio-website` (or your preferred name)
4. **Do NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

## Step 8: Add remote and push
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
git push -u origin main
```
(Replace YOUR_USERNAME with your GitHub username)

## Alternative: Using GitHub Desktop
1. Download GitHub Desktop: https://desktop.github.com/
2. File → Add Local Repository
3. Browse to: `C:\Users\ynikk\Downloads\Job Hunt\portfolio-website`
4. Click "Publish repository" button
5. Choose name and visibility
6. Click "Publish Repository"
