# How to Check Workflow Errors

## Step 1: Open a Failed Workflow Run
1. Go to: https://github.com/nitish-yaddala/portfolio-website/actions
2. Click on any failed workflow run (red X icon)
3. Click on the "build" job (left sidebar)

## Step 2: Find the Error
1. Scroll down to see all the steps
2. Look for a step with a red X icon (failed step)
3. Click on that step to expand it
4. Look for error messages in red
5. Common error locations:
   - "Install dependencies" step
   - "Build" step (most common)
   - "Upload artifact" step

## Step 3: Common Errors to Look For

### Error: "Cannot find module" or "Module not found"
- Missing dependencies
- Need to check package.json

### Error: TypeScript errors
- Syntax errors in code
- Type mismatches

### Error: "Failed to compile" or "Build failed"
- Check the error message above
- Usually shows which file has the issue

### Error: "Command failed" or "Process exited with code"
- Build process failed
- Check the error output above

## Step 4: Copy the Error Message
- Select and copy the error message
- Share it so we can fix it
