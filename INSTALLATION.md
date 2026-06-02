# TB Guardian - Complete Installation & Setup Guide

## What Has Been Implemented

Your React.js frontend with Login and Registration pages has been **converted into a complete full-stack application** with:

✅ **Backend**: Node.js + Express.js API  
✅ **Database**: MongoDB Atlas (cloud database)  
✅ **Authentication**: JWT tokens + bcrypt password hashing  
✅ **Multi-Device Access**: Users persist in MongoDB, not localStorage  
✅ **Protected Routes**: Dashboard only for logged-in users  
✅ **Password Visibility**: Eye icons toggle password visibility  
✅ **Frontend Integration**: Axios API calls integrated  
✅ **Deployment Ready**: Configured for Render production deployment  

---

## File Structure & Placement

### Created Backend Files

```
backend/                          ← NEW FOLDER
├── server.js                    ← Express app + MongoDB connection
├── package.json                 ← Backend dependencies (with mongoose)
├── .env                         ← Environment variables (LOCAL TESTING)
├── .env.example                 ← Template for .env
├── models/
│   └── User.js                  ← Mongoose User schema (UPDATED)
├── routes/
│   ├── auth.js                  ← Register/Login endpoints (UPDATED)
│   └── dashboard.js             ← Protected routes (UPDATED)
├── middleware/
│   └── auth.js                  ← JWT verification
└── README_RENDER.md             ← Render deployment guide
```

### Modified Frontend Files

```
src/
├── hooks/
│   └── useAuth.jsx              ← UPDATED: API calls + JWT
├── components/forms/
│   └── AuthForm.jsx             ← UPDATED: Password visibility toggle
├── pages/
│   ├── Login.jsx                ← UPDATED: Async login
│   └── Register.jsx             ← UPDATED: Async register
└── App.jsx                      ← UPDATED: Auth initialization

.env                             ← CREATED: VITE_API_URL
.env.example                     ← CREATED: Template
package.json                     ← UPDATED: Added axios
DEPLOYMENT.md                    ← CREATED: Complete deployment guide
README_COMPLETE.md               ← CREATED: Full documentation
```

---

## Installation Steps

### Step 1: Install Frontend Dependencies

```bash
cd "c:\Users\Gadugina Vivek\OneDrive\Documents\GitHub\Tuberculosis"
npm install
```

**What this installs:**
- React, React DOM
- React Router DOM
- Axios (HTTP client for API calls)
- Recharts (charts library)
- Vite (build tool)

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

**What this installs:**
- Express.js (web framework)
- Mongoose (MongoDB driver)
- Bcrypt (password hashing)
- JWT (token generation)
- CORS (cross-origin requests)
- Dotenv (environment variables)

---

## Configuration

### Frontend Configuration

**1. Create `.env` file in project root:**

```bash
cat > .env << EOF
VITE_API_URL=http://localhost:5000
EOF
```

**Or manually create file with content:**
```
VITE_API_URL=http://localhost:5000
```

### Backend Configuration - LOCAL TESTING

**1. Create `backend/.env` file:**

```bash
cd backend
cat > .env << EOF
MONGO_URI=mongodb://localhost:27017/tbguardian
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars_long
PORT=5000
EOF
```

**Or manually create file with content:**
```
MONGO_URI=mongodb://localhost:27017/tbguardian
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars_long
PORT=5000
```

### Backend Configuration - PRODUCTION (MongoDB Atlas)

**1. Get MongoDB Atlas connection string:**
- Go to https://www.mongodb.com/cloud/atlas
- Create cluster → Get connection string
- Should look like: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

**2. Update `backend/.env`:**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tbguardian?retryWrites=true&w=majority
JWT_SECRET=generate_strong_secret_with_openssl_rand_base64_32
PORT=5000
```

---

## Running Locally

### Terminal 1: Start Backend

```bash
cd backend
npm start
```

**Expected output:**
```
✅ Connected to MongoDB Atlas
✅ Backend running on http://localhost:5000
```

**If you see MongoDB error:**
- This is normal if MongoDB isn't installed locally
- Use MongoDB Atlas connection string instead (see Production section)

### Terminal 2: Start Frontend

```bash
npm run dev
```

**Expected output:**
```
  VITE v5.4.21  ready in 652 ms
  ➜  Local:   http://localhost:5174/
```

### Terminal 3 (Optional): Monitor Logs

```bash
# Watch backend logs
curl http://localhost:5000/api/health

# In browser DevTools:
# Network tab to see API calls
# Application > LocalStorage to see JWT tokens
```

---

## Testing the Application

### Test 1: Registration

1. Open **http://localhost:5174**
2. Click **Register**
3. Fill form:
   - Name: John Doe
   - Email: john@example.com
   - Password: SecurePass123
   - Confirm: SecurePass123
4. Click **Create account**
5. Should redirect to login page

**What happened:**
- Frontend sent POST to `http://localhost:5000/api/register`
- Backend hashed password with bcrypt
- Backend saved user to MongoDB (or JSON file if using local storage)
- Success message displayed

### Test 2: Login

1. On login page
2. Fill form:
   - Email: john@example.com
   - Password: SecurePass123
3. Click **Sign in**
4. Should redirect to Dashboard
5. Navbar shows "Hello, John Doe"

**What happened:**
- Frontend sent POST to `http://localhost:5000/api/login`
- Backend verified credentials against database
- Backend generated JWT token
- Frontend stored token in localStorage
- Frontend redirected to Dashboard

### Test 3: Password Visibility

1. Go to Register page
2. Click eye icon next to password field
3. Password becomes visible
4. Click eye icon again
5. Password becomes hidden

**What happened:**
- React state toggles between `<input type="password">` and `<input type="text">`
- Eye icon shows current visibility state

### Test 4: Session Persistence

1. While logged in on Dashboard
2. Press **F5** or refresh page
3. Should stay logged in (no redirect to login)
4. Open DevTools → Application → LocalStorage
5. See `tbToken` key with JWT value

**What happened:**
- On page load, useAuth checked localStorage
- Found JWT token
- Sent it to `/api/dashboard` to verify
- Backend validated token
- Session restored

### Test 5: Protected Routes

1. Open new browser tab/window (incognito)
2. Go to `http://localhost:5174/dashboard`
3. Should redirect to login page
4. Cannot access dashboard without login

**What happened:**
- RequireAuth component checked `useAuth.user`
- No user found (no JWT in localStorage)
- Automatically redirected to `/login`

---

## API Endpoints Reference

### Public Endpoints (No Auth Required)

**Register**
```
POST http://localhost:5000/api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response: { "message": "User registered successfully" }
```

**Login**
```
POST http://localhost:5000/api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response: {
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Protected Endpoints (JWT Required)

**Dashboard (Verify Session)**
```
GET http://localhost:5000/api/dashboard
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

Response: {
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Profile**
```
GET http://localhost:5000/api/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

Response: {
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-06-02T11:40:00.000Z"
  }
}
```

---

## Key Changes Explained

### 1. Frontend Integration (useAuth.jsx)

**Before:**
```javascript
// Stored data in localStorage (not persistent across devices)
const users = getItem('tbGuardianUsers', []);
```

**After:**
```javascript
// API calls to backend (persistent in MongoDB)
import axios from 'axios';
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });
const res = await API.post('/api/login', { email, password });
localStorage.setItem('tbToken', res.data.token);  // Store JWT
```

**Impact:**
- Users now persist in cloud database
- Same user can login from any device
- JWT tokens expire after 7 days (configurable)
- Session restored automatically on page refresh

### 2. Password Visibility (AuthForm.jsx)

**Added:**
```javascript
const [showPassword, setShowPassword] = useState(false);

<input type={showPassword ? 'text' : 'password'} />
<button onClick={() => setShowPassword(!showPassword)}>
  {showPassword ? '🙈' : '👁️'}
</button>
```

**Impact:**
- Users can verify they typed password correctly
- Eye icon appears on both Login and Register forms
- Improves UX for long/complex passwords

### 3. Backend Authentication (auth.js)

**Security features:**
```javascript
// Bcrypt hashing (10 rounds)
const hash = await bcrypt.hash(password, 10);

// JWT token generation
const token = jwt.sign({ id, email, name }, JWT_SECRET, { expiresIn: '7d' });

// Duplicate email prevention
const existing = await User.findOne({ email });
if (existing) return res.status(409).json({ error: 'Email already registered' });

// Password validation
const ok = await bcrypt.compare(password, user.password);
```

**Impact:**
- Passwords hashed (never stored in plain text)
- Users can't register same email twice
- JWT tokens expire (automatic logout after 7 days)
- Multi-device access works seamlessly

### 4. Protected Routes (App.jsx)

**Added:**
```javascript
const RequireAuth = ({ children }) => {
  const { user, initialized } = useAuth();
  if (!initialized) return null;  // Wait for auth check
  if (!user) return <Navigate to="/login" />;  // Redirect if not logged in
  return children;
};
```

**Impact:**
- Dashboard only accessible after login
- Unauthenticated users redirected to login
- Prevents unauthorized access to protected routes

---

## Environment Variables Explained

### Frontend (`.env`)

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_API_URL` | Backend API URL (used in useAuth.jsx) | `http://localhost:5000` |

Vite automatically loads variables prefixed with `VITE_` and makes them available via `import.meta.env.VITE_API_URL`

### Backend (`.env`)

| Variable | Purpose | Example | Notes |
|----------|---------|---------|-------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/tbguardian` | Local or MongoDB Atlas |
| `JWT_SECRET` | Secret for signing JWT tokens | Random 32+ character string | Keep secret! |
| `PORT` | Server port | `5000` | Default, can be any unused port |

---

## File Descriptions

### New Backend Files

**`backend/server.js`**
- Initializes Express app
- Connects to MongoDB using Mongoose
- Mounts auth and dashboard routes
- Starts HTTP server on specified port

**`backend/models/User.js`**
- Mongoose schema for users
- Defines fields: name, email, password
- Enforces email uniqueness
- Auto-adds createdAt/updatedAt timestamps

**`backend/routes/auth.js`**
- `POST /api/register` - Register new user (bcrypt + MongoDB save)
- `POST /api/login` - Authenticate user (bcrypt compare + JWT generation)
- Input validation
- Error handling (duplicate email, invalid credentials, etc.)

**`backend/routes/dashboard.js`**
- `GET /api/dashboard` - Verify session (protected route)
- `GET /api/profile` - Get user profile (protected route)
- Both require JWT in Authorization header

**`backend/middleware/auth.js`**
- Verifies JWT token from Authorization header
- Extracts user info from token payload
- Protects sensitive endpoints
- Returns 401 if token invalid/expired

**`backend/package.json`**
- Dependencies: express, mongoose, bcrypt, jwt, cors, dotenv

### Updated Frontend Files

**`src/hooks/useAuth.jsx`**
- Changed from localStorage-only to API + localStorage
- Now makes HTTP requests to backend
- Stores JWT tokens instead of hashed passwords
- Auto-restores session on page load
- Exports: `useAuth()` hook, `AuthProvider` component

**`src/components/forms/AuthForm.jsx`**
- Added password visibility toggle
- Eye icons for password and confirm password fields
- Uses React state to toggle input type

**`src/pages/Login.jsx`**
- Now awaits async login function
- Handles API errors
- Displays error messages

**`src/pages/Register.jsx`**
- Now awaits async register function
- Handles API errors
- Displays error messages

**`src/App.jsx`**
- Updated RequireAuth to wait for `initialized` state
- Prevents redirecting to login before auth check completes

### Documentation Files

**`DEPLOYMENT.md`**
- Complete step-by-step deployment guide
- MongoDB Atlas setup
- Render backend deployment
- Frontend deployment options
- Production security checklist

**`README_COMPLETE.md`**
- Complete documentation
- Feature list
- Project structure
- API reference
- Testing instructions
- Troubleshooting guide
- Security considerations

---

## Build & Deploy Commands

### Development

```bash
# Start frontend dev server
npm run dev

# Start backend dev server
cd backend && npm start

# Build frontend for production
npm run build
```

### Production

```bash
# Build frontend
npm run build

# Deploy frontend to Vercel/Netlify
# Deploy backend to Render (see DEPLOYMENT.md)
```

---

## Next Steps

1. **Test Locally**
   - Follow "Testing the Application" section above
   - Verify all features work

2. **Setup MongoDB Atlas** (if not already done)
   - See DEPLOYMENT.md Part 1

3. **Deploy to Production**
   - See DEPLOYMENT.md Part 2 (Render) and Part 3 (Frontend)

4. **Add Features** (optional)
   - User profile editing
   - Password reset
   - Email verification
   - Two-factor authentication

---

## Troubleshooting Quick Reference

| Problem | Solution |
|---------|----------|
| "Cannot find module 'axios'" | `npm install` in project root |
| "Cannot find module 'mongoose'" | `npm install` in backend folder |
| Axios 404 errors | Check VITE_API_URL in .env |
| MongoDB connection error | Update MONGO_URI in backend/.env |
| "Invalid or expired token" | Clear localStorage, re-login |
| Redirect loop | Check RequireAuth in App.jsx |
| Password toggle not working | Check AuthForm.jsx useState hooks |

---

## Security Checklist

- [ ] Never commit `.env` files
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Use strong database password
- [ ] Enable HTTPS (automatic on Render)
- [ ] Restrict MongoDB network access
- [ ] Monitor logs for suspicious activity
- [ ] Implement rate limiting (advanced)

---

## Support & Resources

- **MongoDB Docs**: https://docs.mongodb.com
- **Mongoose Docs**: https://mongoosejs.com
- **Express Docs**: https://expressjs.com
- **JWT.io**: https://jwt.io (decode/verify tokens)
- **Render Docs**: https://render.com/docs
- **React Docs**: https://react.dev

---

**Everything is ready for production deployment!** 🚀
