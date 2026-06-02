# TB Guardian - Complete Deployment Guide

This guide covers deploying the full-stack TB Guardian application to production.

## Architecture Overview

- **Frontend**: React + Vite (deployed on Vercel, Netlify, or similar)
- **Backend**: Node.js + Express (deployed on Render)
- **Database**: MongoDB Atlas (cloud database)
- **Authentication**: JWT tokens stored in localStorage

## Prerequisites

1. **MongoDB Atlas Account** (free) - https://www.mongodb.com/cloud/atlas
2. **Render Account** (free) - https://render.com  
3. **GitHub Account** - For hosting code
4. **Git** - For version control

---

## Part 1: MongoDB Atlas Setup

### Step 1.1: Create MongoDB Cluster

1. Sign up/login at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new project
3. Click "Create a Deployment" → Select "M0 (Free)" tier
4. Choose region closest to your users
5. Wait for cluster to be created (5-10 minutes)

### Step 1.2: Create Database User

1. Go to "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Create username and password (save these!)
4. Click "Add User"

**Example credentials:**
```
Username: tbguardian_admin
Password: SecurePass123!@#$%
```

### Step 1.3: Configure Network Access

1. Go to "Network Access" (left sidebar)
2. Click "Add IP Address"
3. **For development**: Add `0.0.0.0/0` (any IP)
4. **For production**: Add only Render's static IP
5. Click "Confirm"

### Step 1.4: Get Connection String

1. Click "Clusters" → "Connect"
2. Choose "Drivers" → Node.js
3. Copy the connection string

**Format:**
```
mongodb+srv://username:password@cluster0.mongodb.net/tbguardian?retryWrites=true&w=majority
```

Replace:
- `username` → your database user
- `password` → your password
- `cluster0` → your cluster name
- `tbguardian` → database name

---

## Part 2: Backend Deployment to Render

### Step 2.1: Prepare Repository

Push your code to GitHub:
```bash
cd /path/to/Tuberculosis
git add .
git commit -m "Production-ready full-stack app with MongoDB"
git push origin main
```

### Step 2.2: Create Render Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New+" → "Web Service"
3. Click "Build and deploy from a Git repository"
4. Authorize GitHub
5. Select your `Tuberculosis` repository

### Step 2.3: Configure Service

Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `tb-guardian-api` |
| **Environment** | `Node` |
| **Region** | Pick closest to users |
| **Branch** | `main` |
| **Root Directory** | `backend` ⚠️ Important! |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### Step 2.4: Add Environment Variables

Click "Advanced" → "Add Environment Variable" for each:

```
MONGO_URI=mongodb+srv://tbguardian_admin:SecurePass123!@#$%@cluster0.mongodb.net/tbguardian?retryWrites=true&w=majority

JWT_SECRET=use_openssl_rand_-base64_32_to_generate_strong_secret_here_minimum_32_chars

PORT=5000
```

⚠️ **DO NOT commit `.env` files to Git!**

### Step 2.5: Deploy

Click "Create Web Service"

Render will:
- Build your backend
- Install dependencies  
- Run the server
- Assign a live URL (e.g., `https://tb-guardian-api.onrender.com`)

**Wait for deployment to complete** (watch the logs)

### Step 2.6: Test Backend

Test your API endpoints:

**Test registration:**
```bash
curl -X POST https://tb-guardian-api.onrender.com/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

**Test login:**
```bash
curl -X POST https://tb-guardian-api.onrender.com/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

Response:
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "email": "test@example.com",
    "name": "Test User"
  }
}
```

---

## Part 3: Frontend Configuration

Update your frontend to use the deployed backend:

### Step 3.1: Create Frontend .env

In project root, create `.env`:

```
VITE_API_URL=https://tb-guardian-api.onrender.com
```

(Replace with your actual Render URL)

### Step 3.2: Update useAuth.jsx

Verify `src/hooks/useAuth.jsx` uses the environment variable:

```javascript
const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});
```

### Step 3.3: Deploy Frontend

Options:

**Option A: Vercel (Recommended)**
1. Connect GitHub repo to Vercel
2. Set root directory to project root
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add env var: `VITE_API_URL=https://tb-guardian-api.onrender.com`
6. Deploy

**Option B: Netlify**
1. Connect GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add env var: `VITE_API_URL=https://tb-guardian-api.onrender.com`
5. Deploy

**Option C: GitHub Pages**
1. Set repository visibility to public
2. Go to Settings → Pages
3. Build from `main` branch, `/dist` folder
4. Deploy

---

## Part 4: Testing Full Application

### Test User Registration Flow

1. Go to your frontend URL
2. Click "Register"
3. Fill in: Name, Email, Password
4. Click "Create Account"
5. Verify success message
6. Check MongoDB Atlas: Data appears in `users` collection

### Test User Login

1. Click "Sign In"
2. Enter registered email and password
3. Click "Sign In"
4. Verify redirect to Dashboard
5. Verify greeting shows your name
6. Open DevTools → Application → LocalStorage
7. Verify `tbToken` contains JWT

### Test Session Persistence

1. While logged in, refresh page (F5)
2. Verify you stay logged in
3. Check backend logs for `/api/dashboard` call

### Test Multi-Device Access

1. Open app in Firefox (register different account)
2. Use same email/password on Chrome
3. Login should work on both devices
4. Change password on one device
5. Old password should fail on both devices

### Test Protected Routes

1. Logout
2. Try to access `/dashboard` directly in URL
3. Should redirect to `/login`

---

## Environment Variables Reference

### Backend (.env)

```
# MongoDB Atlas Connection String
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority

# JWT Secret (use: openssl rand -base64 32)
JWT_SECRET=your_strong_secret_min_32_chars

# Server Port
PORT=5000
```

### Frontend (.env)

```
# Backend API URL
VITE_API_URL=https://tb-guardian-api.onrender.com
```

---

## Production Security Checklist

- [ ] MongoDB user password is strong (12+ characters, mixed case, numbers, symbols)
- [ ] JWT_SECRET is strong (use `openssl rand -base64 32`)
- [ ] MONGO_URI not committed to GitHub
- [ ] JWT_SECRET not committed to GitHub
- [ ] `.env` file in `.gitignore`
- [ ] Network access restricted appropriately
- [ ] HTTPS enabled (automatic on Render and Vercel)
- [ ] CORS configured correctly (backend allows frontend origin)
- [ ] Error messages don't leak sensitive info
- [ ] Rate limiting enabled (optional, advanced)

---

## Troubleshooting

### Backend Won't Start

**Error**: `MongooseError: Cannot connect to MongoDB`

**Solution**:
1. Verify MONGO_URI in Render environment variables
2. Check MongoDB Atlas network access (add 0.0.0.0/0)
3. Verify database user credentials
4. Test connection locally: `npm run dev`

---

### Frontend Can't Reach Backend

**Error**: `Failed to resolve import "axios" ...` or CORS error

**Solution**:
1. Verify VITE_API_URL in frontend `.env`
2. Rebuild frontend: `npm run build`
3. Check backend CORS settings (should allow your frontend domain)
4. In DevTools → Network, verify requests go to correct backend URL

---

### JWT Errors

**Error**: `Invalid or expired token`

**Solution**:
1. Ensure JWT_SECRET is same everywhere
2. Clear localStorage and re-login
3. Check token expiration (default 7 days)
4. Verify Authorization header format: `Bearer <token>`

---

### Database Already Registered Email

**Error**: `Email already registered` but I never registered!

**Solution**:
1. This is expected - MongoDB is working!
2. Each registration persists across devices
3. Use different email to register again
4. Or reset MongoDB data (delete collection)

---

## Monitoring & Maintenance

### View Backend Logs

1. Render Dashboard → Select service
2. Click "Logs" tab
3. Watch real-time logs as you use the app

### Update Environment Variables

If you need to change MONGO_URI or JWT_SECRET:

1. Render Dashboard → Environment
2. Edit variable
3. Click "Save and Redeploy"
4. Render automatically redeploys

### Database Backup

MongoDB Atlas provides automatic backups. To configure:

1. MongoDB Atlas → Clusters → Backup
2. Set backup frequency
3. Test restore procedures before production

---

## Cost Estimation

| Service | Tier | Cost |
|---------|------|------|
| MongoDB Atlas | M0 | Free |
| Render | Free | Free |
| Vercel | Hobby | Free |
| **Total** | - | **Free** |

*Note: Costs apply if you scale beyond free tier limits*

---

## Next Steps

1. **Monitor Usage**: Check logs regularly
2. **Plan Scaling**: If traffic increases, upgrade services
3. **Add Features**: User profiles, settings, password reset
4. **Set Up CI/CD**: Automate deployments on push
5. **Error Tracking**: Integrate Sentry or similar
6. **Analytics**: Add Mixpanel or Google Analytics

---

## Support Resources

- [Render Docs](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Express.js Guide](https://expressjs.com)
- [React Documentation](https://react.dev)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
