# 👨‍💻 Developer Guide

## 🎯 Overview

Hướng dẫn này dành cho developers muốn hiểu và mở rộng authentication system của Elcom AI Remote Sensing.

---

## 📚 Architecture

### Authentication Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ 1. User enters credentials
       ▼
┌─────────────────┐
│  Login.jsx      │ ──────┐
└─────────────────┘       │
                          │ 2. Call authService.login()
┌─────────────────┐       │
│ auth.service.js │◄──────┘
└────────┬────────┘
         │ 3. POST /api/auth/login
         ▼
┌─────────────────┐
│  axios.config   │ ─────► Backend API (localhost:5148)
└────────┬────────┘
         │ 4. Return JWT tokens
         ▼
┌─────────────────┐
│  localStorage   │ ◄──── Store accessToken, refreshToken
└─────────────────┘
         │ 5. Navigate to /dashboard
         ▼
┌─────────────────┐
│ ProtectedRoute  │ ─────► Check isAuthenticated()
└─────────────────┘
         │ 6. If valid, render Dashboard
         ▼
┌─────────────────┐
│  Dashboard.jsx  │
└─────────────────┘
```

---

## 🔧 Core Components

### 1. Auth Service (`src/services/auth.service.js`)

**Purpose:** Single source of truth cho tất cả authentication operations.

**Key Methods:**
```javascript
// Authentication
login(email, password)      // Login user
register(username, email, password, role)  // Register new user
logout()                    // Logout current user
refreshToken()              // Refresh expired token

// Token Management
getAccessToken()            // Get current access token
setAccessToken(token)       // Set access token
getRefreshToken()           // Get refresh token
clearTokens()               // Clear all tokens

// User Information
isAuthenticated()           // Check if user is logged in
getCurrentUser()            // Get user info from JWT
getUserRole()               // Get user role
isAdmin()                   // Check if user is admin
getUserId()                 // Get user ID
```

**Example Usage:**
```javascript
import authService from '../services/auth.service';

// Login
const response = await authService.login('user@example.com', 'password123');
if (response.success) {
  // Token tự động được lưu
  navigate('/dashboard');
}

// Check authentication
if (authService.isAuthenticated()) {
  const user = authService.getCurrentUser();
  console.log('User role:', user.role);
}

// Logout
await authService.logout();
```

---

### 2. Axios Config (`src/utils/axios.config.js`)

**Purpose:** Centralized axios instance với interceptors để tự động xử lý JWT tokens.

**Features:**
- Auto-attach JWT token vào header của mọi request
- Auto-refresh token khi receive 401 response
- Redirect về login nếu refresh fail

**Request Interceptor:**
```javascript
api.interceptors.request.use((config) => {
  const token = authService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**Response Interceptor:**
```javascript
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Try to refresh token
      await authService.refreshToken();
      // Retry original request
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);
```

**Usage:**
```javascript
import api from '../utils/axios.config';

// Token được tự động thêm vào header
const data = await api.get('/protected-endpoint');
const result = await api.post('/some-endpoint', { data });
```

---

### 3. ProtectedRoute (`src/components/ProtectedRoute.jsx`)

**Purpose:** Wrapper component để bảo vệ routes yêu cầu authentication.

**Props:**
- `children` - Component con cần render
- `requireAdmin` - (optional) Nếu true, chỉ admin mới access được

**Example:**
```jsx
// Basic protected route
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>

// Admin-only route
<Route 
  path="/admin" 
  element={
    <ProtectedRoute requireAdmin={true}>
      <AdminPanel />
    </ProtectedRoute>
  } 
/>
```

**Logic Flow:**
```javascript
// 1. Check authentication
if (!authService.isAuthenticated()) {
  return <Navigate to="/login" />;
}

// 2. Check admin requirement
if (requireAdmin && !authService.isAdmin()) {
  return <Navigate to="/dashboard" />;
}

// 3. Render protected component
return children;
```

---

## 🔐 JWT Token Structure

### Access Token Payload
```json
{
  "sub": "2",                      // User ID
  "role": "Admin",                 // User role
  "exp": 1765274164,               // Expiration (Unix timestamp)
  "iss": "DemoGeoServer",          // Issuer
  "aud": "DemoGeoServerUsers"      // Audience
}
```

### Decoding Token
```javascript
const user = authService.getCurrentUser();
// Returns decoded payload:
// {
//   sub: "2",
//   role: "Admin",
//   exp: 1765274164,
//   iss: "DemoGeoServer",
//   aud: "DemoGeoServerUsers"
// }
```

---

## 🎨 Adding New Protected Pages

### Step 1: Create Page Component
```jsx
// src/pages/Profile.jsx
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

const Profile = () => {
  const user = authService.getCurrentUser();
  
  return (
    <div>
      <h1>Profile</h1>
      <p>User ID: {user.sub}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default Profile;
```

### Step 2: Add Route
```jsx
// src/routes/AppRoutes.jsx
import Profile from '../pages/Profile';

<Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  } 
/>
```

### Step 3: Add Navigation
```jsx
// In any component
import { Link } from 'react-router-dom';

<Link to="/profile">My Profile</Link>
```

---

## 🔄 Token Refresh Flow

### Auto Refresh on 401
```
1. User makes request to protected endpoint
2. Token is expired
3. Backend returns 401 Unauthorized
4. Axios interceptor catches 401
5. Calls authService.refreshToken()
6. Gets new access token
7. Retries original request with new token
8. Returns response to user
```

### Manual Refresh Check
```javascript
// In auth.service.js
isAuthenticated() {
  const token = this.getAccessToken();
  const expiry = this.getTokenExpiry();
  
  if (!token || !expiry) return false;
  
  // Check if token expired
  const expiryDate = new Date(expiry);
  const now = new Date();
  
  if (now >= expiryDate) {
    this.clearTokens();
    return false;
  }
  
  return true;
}
```

---

## 🛠 Extending Auth Service

### Add Custom Method
```javascript
// src/services/auth.service.js

class AuthService {
  // ... existing methods ...
  
  /**
   * Check if user has specific permission
   * @param {string} permission - Permission to check
   * @returns {boolean}
   */
  hasPermission(permission) {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    // Add your permission logic here
    const permissions = user.permissions || [];
    return permissions.includes(permission);
  }
  
  /**
   * Update user profile
   * @param {Object} profileData - Profile data to update
   * @returns {Promise}
   */
  async updateProfile(profileData) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/user/profile`,
        profileData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
```

---

## 🧪 Testing Authentication

### Test Login Flow
```javascript
// Manual test
1. Open http://localhost:5173/login
2. Enter credentials: admin@demo.com / password123
3. Check localStorage for tokens (F12 → Application → Local Storage)
4. Should redirect to /dashboard
5. Dashboard should show user info
```

### Test Protected Routes
```javascript
// Test 1: Access without login
1. Open http://localhost:5173/dashboard (incognito)
2. Should redirect to /login

// Test 2: Access with login
1. Login first
2. Navigate to /dashboard
3. Should show dashboard content
```

### Test Token Expiry
```javascript
// Simulate expired token
localStorage.setItem('tokenExpiry', new Date(Date.now() - 1000).toISOString());
// Try to access protected route → should redirect to login
```

---

## 🚨 Error Handling

### Login Errors
```javascript
// In Login.jsx
try {
  const response = await authService.login(email, password);
  if (response.success) {
    navigate('/dashboard');
  } else {
    setError(response.message);
  }
} catch (err) {
  // Backend validation errors
  if (err.errors) {
    const errorMessages = Object.values(err.errors).flat().join(', ');
    setError(errorMessages);
  } 
  // General error
  else if (err.message) {
    setError(err.message);
  } 
  // Unknown error
  else {
    setError('Có lỗi xảy ra. Vui lòng thử lại.');
  }
}
```

### API Call Errors
```javascript
// Using axios config
import api from '../utils/axios.config';

try {
  const response = await api.get('/some-endpoint');
  return response.data;
} catch (error) {
  if (error.response) {
    // Backend returned error
    console.error('API Error:', error.response.data);
  } else if (error.request) {
    // Network error
    console.error('Network Error:', error.request);
  } else {
    // Other errors
    console.error('Error:', error.message);
  }
}
```

---

## 📊 State Management (Optional)

### Using Context API for Auth State
```jsx
// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/auth.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authService.isAuthenticated()) {
      setUser(authService.getCurrentUser());
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    if (response.success) {
      setUser(authService.getCurrentUser());
    }
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

**Usage:**
```jsx
// In App.jsx
import { AuthProvider } from './contexts/AuthContext';

<AuthProvider>
  <App />
</AuthProvider>

// In any component
import { useAuth } from '../contexts/AuthContext';

const { user, login, logout } = useAuth();
```

---

## 🔍 Debugging Tips

### Check Token in Console
```javascript
// In browser console
localStorage.getItem('accessToken')
localStorage.getItem('refreshToken')
localStorage.getItem('tokenExpiry')
```

### Decode JWT Token
```javascript
// In browser console
const token = localStorage.getItem('accessToken');
const payload = JSON.parse(atob(token.split('.')[1]));
console.log(payload);
```

### Test API Endpoint
```javascript
// In browser console or APITester component
import api from './utils/axios.config';

api.get('/test/protected')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
```

---

## 📚 Additional Resources

- **Axios Documentation:** https://axios-http.com/
- **React Router:** https://reactrouter.com/
- **JWT.io:** https://jwt.io/ (decode JWT tokens)
- **Tailwind CSS:** https://tailwindcss.com/

---

## 🎯 Best Practices

1. ✅ Always use `authService` methods instead of direct localStorage access
2. ✅ Use `api` instance from `axios.config.js` instead of raw axios
3. ✅ Wrap protected pages with `<ProtectedRoute>`
4. ✅ Handle errors gracefully with try-catch
5. ✅ Show loading states during API calls
6. ✅ Clear tokens on logout
7. ✅ Validate forms on client-side before API call
8. ✅ Never log sensitive data (tokens, passwords)

---

**Happy Coding! 🚀**
