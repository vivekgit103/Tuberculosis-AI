# TB Guardian AI - Full-Stack Application

A complete full-stack tuberculosis risk screening application with user authentication, JWT-based sessions, and multi-device access.

## 🎯 Features Implemented

### ✅ Authentication & Security
- **User Registration**: Create account with Name, Email, Password
- **User Login**: Email + Password validation
- **Password Hashing**: bcrypt with salt rounds = 10
- **JWT Tokens**: Issued on login, expires in 7 days
- **Session Persistence**: Users stay logged in after page refresh
- **Multi-Device Access**: Same account works on multiple devices
- **Protected Routes**: Dashboard only accessible to authenticated users
- **Password Visibility Toggle**: Eye icons to show/hide password

### ✅ Database
- **MongoDB Atlas**: Cloud-based document database
- **Mongoose Schema**: Enforced data validation
- **Unique Emails**: Prevents duplicate registrations
- **Timestamps**: Auto-tracks created/updated dates

### ✅ Frontend
- **React 18**: Modern UI framework
- **Vite**: Lightning-fast build tool
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **Recharts**: Data visualization

### ✅ Backend
- **Express.js**: Lightweight web framework
- **JWT Middleware**: Protects sensitive endpoints
- **CORS**: Handles cross-origin requests
- **Error Handling**: Detailed error messages

---

## 📁 Project Structure

```
Tuberculosis/
├── frontend files (React + Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx          - Login form
│   │   │   ├── Register.jsx       - Registration form
│   │   │   ├── Dashboard.jsx      - Protected dashboard
│   │   │   └── ...
│   │   ├── components/
│   │   │   ├── forms/
│   │   │   │   └── AuthForm.jsx   - Reusable auth form (password toggle)
│   │   │   └── ...
│   │   ├── hooks/
│   │   │   └── useAuth.jsx        - Auth context with API calls
│   │   └── ...
│   ├── package.json               - Frontend dependencies
│   ├── .env                       - Frontend environment variables
│   └── vite.config.js
│
├── backend/                        - Node.js + Express API
│   ├── server.js                  - Express app + MongoDB connection
│   ├── models/
│   │   └── User.js                - Mongoose User schema
│   ├── routes/
│   │   ├── auth.js                - POST /api/register, POST /api/login
│   │   └── dashboard.js           - GET /api/dashboard, GET /api/profile
│   ├── middleware/
│   │   └── auth.js                - JWT verification middleware
│   ├── data/
│   │   └── users.json             - Local storage (for testing)
│   ├── package.json               - Backend dependencies
│   ├── .env                       - Backend environment variables
│   ├── .env.example               - Template for .env
│   └── README_RENDER.md           - Render deployment guide
│
├── .env                           - Frontend config (VITE_API_URL)
├── .env.example                   - Template for .env
├── package.json                   - Frontend dependencies
├── DEPLOYMENT.md                  - Complete deployment guide
└── README.md                      - This file
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 16+ 
- npm or yarn
- MongoDB (local or Atlas)

### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
cd ..
```

### 2. Configure Environment

**Frontend** - Create `.env`:
```
VITE_API_URL=http://localhost:5000
```

**Backend** - Create `backend/.env`:
```
MONGO_URI=mongodb://localhost:27017/tbguardian
JWT_SECRET=your_super_secret_key_min_32_chars_long
PORT=5000
```

### 3. Start Backend

```bash
cd backend
npm start
```

Expected output:
```
✅ Connected to MongoDB Atlas
✅ Backend running on http://localhost:5000
```

*Note: If MongoDB is not running locally, you'll see an error. Skip to "Production Setup" to use MongoDB Atlas.*

### 4. Start Frontend (new terminal)

```bash
npm run dev
```

Expected output:
```
  VITE v5.4.21  ready in 652 ms
  ➜  Local:   http://localhost:5174/
```

### 5. Open in Browser

```
http://localhost:5174
```

---

## 📝 API Endpoints

### Authentication (Public)

**Register**
```bash
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response (201 Created):
{
  "message": "User registered successfully"
}
```

**Login**
```bash
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response (200 OK):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Protected Routes (Requires JWT)

**Verify Session**
```bash
GET /api/dashboard
Authorization: Bearer <JWT_TOKEN>

Response (200 OK):
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Get Profile**
```bash
GET /api/profile
Authorization: Bearer <JWT_TOKEN>

Response (200 OK):
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-06-02T11:40:00.000Z"
  }
}
```

---

## 🔐 How It Works

### Registration Flow

1. User enters Name, Email, Password on `/register`
2. Frontend validates form
3. Axios sends POST to `/api/register`
4. Backend:
   - Validates email format
   - Checks for duplicate email in MongoDB
   - Hashes password with bcrypt
   - Saves user to `users` collection
5. Frontend redirects to `/login` on success
6. Error message displayed if email already exists

### Login Flow

1. User enters Email, Password on `/login`
2. Frontend validates form
3. Axios sends POST to `/api/login`
4. Backend:
   - Finds user by email in MongoDB
   - Compares password with bcrypt
   - Generates JWT token (expires in 7 days)
   - Returns token + user info
5. Frontend stores token in localStorage (`tbToken`)
6. Frontend redirects to `/dashboard`
7. Navbar displays greeting: "Hello, [Name]"

### Session Persistence

1. Frontend loads → `useAuth.jsx` useEffect fires
2. Checks localStorage for `tbToken`
3. If token exists:
   - Sends GET to `/api/dashboard` with token
   - Backend verifies JWT signature
   - If valid: session restored, user data loaded
   - If invalid/expired: token deleted, user redirected to login
4. If no token: user stays on login page

### Multi-Device Access

1. User registers on Device A (email: john@example.com)
   - User data saved in MongoDB (not localStorage)
2. User opens app on Device B
3. Enters same email + password
4. Backend queries MongoDB for user
5. Password validation succeeds (same bcrypt hash in database)
6. JWT issued for Device B
7. Same user is now logged in on both devices
8. **Data stays in sync** because it's in MongoDB, not localStorage

### Protected Routes

1. User tries to access `/dashboard` without login
2. React Router → `RequireAuth` component
3. Checks `useAuth.initialized` and `useAuth.user`
4. If not authenticated → redirects to `/login`
5. If authenticated → renders Dashboard

---

## 🔑 Environment Variables

### Frontend (`.env`)

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` |

### Backend (`backend/.env`)

| Variable | Purpose | Example |
|----------|---------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret for signing JWT tokens | Random 32+ character string |
| `PORT` | Server port | `5000` |

---

## 🧪 Testing

### Test Registration

```bash
# In browser: http://localhost:5174/register
1. Fill: Name = "John Doe"
2. Fill: Email = "john@example.com"
3. Fill: Password = "SecurePass123"
4. Fill: Confirm = "SecurePass123"
5. Click "Create account"
6. Should redirect to login
```

### Test Login

```bash
# In browser: http://localhost:5174/login
1. Fill: Email = "john@example.com"
2. Fill: Password = "SecurePass123"
3. Click "Sign in"
4. Should redirect to dashboard
5. Navbar shows "Hello, John Doe"
```

### Test Password Toggle

```bash
# In browser: on Register or Login form
1. Click eye icon next to password field
2. Password should become visible (text input)
3. Click eye icon again
4. Password should be masked (password input)
```

### Test Session Persistence

```bash
# In browser: logged in at http://localhost:5174/dashboard
1. Press F5 to refresh page
2. Should stay logged in (no redirect to login)
3. Check DevTools → Application → LocalStorage
4. Verify "tbToken" contains JWT starting with "eyJ..."
```

### Test Protection

```bash
# In browser: logged out
1. Go to http://localhost:5174/dashboard
2. Should redirect to http://localhost:5174/login
3. Cannot access protected route without login
```

### Test Multi-Device

```bash
# Open in 2 browsers
Browser 1:
  1. Go to http://localhost:5174
  2. Register: john@example.com / SecurePass123
  3. Login successfully
  4. See dashboard

Browser 2:
  1. Go to http://localhost:5174
  2. Login: john@example.com / SecurePass123
  3. Should login successfully
  4. Same user data (from MongoDB)
```

---

## 🛠️ Development

### Frontend Development

```bash
# Start Vite dev server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Development

```bash
# Start with auto-reload (requires nodemon)
cd backend
npm install -D nodemon
npm run dev

# Or start once
npm start
```

### Monitor API Calls

Open DevTools (F12) → Network tab:
- See all requests to `/api/*`
- View request/response headers
- Check Authorization headers
- Inspect JWT tokens

### Debug JWT Tokens

```bash
# Decode JWT at https://jwt.io
1. Copy token from localStorage (DevTools → Application)
2. Paste into jwt.io
3. See decoded payload (user ID, email, expiration)
```

---

## 🚀 Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete instructions on deploying to:
- **Backend**: Render (free tier available)
- **Frontend**: Vercel, Netlify, or GitHub Pages
- **Database**: MongoDB Atlas (free tier available)

---

## 📚 Key Files Explained

### `src/hooks/useAuth.jsx`
- Manages authentication state globally
- Provides `user`, `login()`, `register()`, `logout()`
- Axios API calls to backend
- Stores/retrieves JWT from localStorage
- Auto-restores session on page load

### `src/components/forms/AuthForm.jsx`
- Reusable form for login and registration
- Eye icons toggle password visibility
- Form validation
- Error message display

### `src/pages/Login.jsx` & `Register.jsx`
- Login and registration pages
- Use `AuthForm` and `useAuth` hook
- Handle form submission
- Display success/error messages

### `src/App.jsx`
- Routes configuration
- `RequireAuth` wrapper protects dashboard
- AuthProvider wraps entire app

### `backend/server.js`
- Express app setup
- MongoDB connection with Mongoose
- CORS configuration
- Route mounting

### `backend/models/User.js`
- Mongoose schema for users
- Email validation
- Data type enforcement
- Timestamps

### `backend/routes/auth.js`
- POST `/register` - Create new user
- POST `/login` - Authenticate and issue JWT
- Password hashing with bcrypt
- Duplicate email prevention

### `backend/middleware/auth.js`
- JWT verification middleware
- Bearer token parsing
- Token validation
- Error handling

---

## ⚠️ Security Considerations

### Password Security
- ✅ Hashed with bcrypt (10 rounds)
- ✅ Never stored in plain text
- ✅ Never sent back from server
- ✅ Re-hashed on each registration

### JWT Security
- ✅ Signed with secret key (HMAC-SHA256)
- ✅ Expires after 7 days
- ✅ Stored in localStorage (vulnerable to XSS)
- ⚠️ For production: Consider httpOnly cookies instead

### API Security
- ✅ Protected endpoints require valid JWT
- ✅ CORS configured
- ✅ Input validation on all routes
- ✅ Duplicate email detection

### Data Security
- ✅ HTTPS on production
- ✅ MongoDB password protected
- ✅ Network access restricted
- ✅ No sensitive data in logs

### Best Practices
- ✅ Never commit `.env` files
- ✅ Use strong JWT secret (32+ characters)
- ✅ Use strong database password
- ✅ Monitor logs for unauthorized access
- ✅ Regular password rotation (for users)
- ✅ Implement rate limiting (advanced)

---

## 🐛 Troubleshooting

### "Cannot find module 'mongoose'"
```bash
# Solution: Install backend dependencies
cd backend
npm install
```

### "MONGO_URI is not defined"
```bash
# Solution: Create backend/.env
cd backend
cp .env.example .env
# Edit .env with your MongoDB connection string
```

### "JWT_SECRET is not defined"
```bash
# Solution: Add to backend/.env
JWT_SECRET=your_super_secret_key_min_32_chars_long
```

### "VITE_API_URL is undefined"
```bash
# Solution: Create .env in project root
VITE_API_URL=http://localhost:5000
```

### Axios 404 errors
```
# Check:
1. Backend is running (npm start in backend/)
2. VITE_API_URL points to correct backend URL
3. API routes are correct (/api/login not /login)
4. No typos in endpoint names
```

### Mongoose connection errors
```
# Check:
1. MONGO_URI is correct in .env
2. MongoDB is running (local or Atlas connection active)
3. Database user credentials are correct
4. Network access is configured (if using Atlas)
```

---

## 📈 Future Enhancements

1. **User Profile Management**
   - Edit name, email
   - Change password
   - Update profile picture

2. **Email Verification**
   - Confirm email before activation
   - Resend verification email

3. **Password Reset**
   - Forgot password flow
   - Reset via email link

4. **Two-Factor Authentication**
   - SMS or email OTP
   - Authenticator app support

5. **Role-Based Access**
   - Admin dashboard
   - User roles and permissions

6. **Audit Logging**
   - Track login attempts
   - Monitor data changes

7. **Rate Limiting**
   - Prevent brute force attacks
   - API rate limits

8. **Advanced Caching**
   - Redis for session storage
   - Cache user data

---

## 📖 Resources

- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [JWT Introduction](https://tools.ietf.org/html/rfc7519)
- [Bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)
- [React Documentation](https://react.dev)
- [Axios Documentation](https://axios-http.com)
- [Render Deployment](https://render.com/docs)

---

## 📄 License

This project is open source. Use it for learning and development.

---

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues
3. Check terminal logs for error messages
4. Review API responses in browser DevTools

---

**Last Updated**: June 2, 2024  
**Version**: 1.0.0
