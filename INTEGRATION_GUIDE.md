# Elcom AI Remote Sensing - Frontend Integration Guide

## 🎯 Tổng quan

Frontend React đã được tích hợp với backend .NET Core Web API để xử lý authentication (đăng nhập/đăng ký).

## 📁 Cấu trúc dự án

```
src/
├── components/
│   └── ProtectedRoute.jsx      # Component bảo vệ routes yêu cầu auth
├── pages/
│   ├── Login.jsx                # Trang đăng nhập (đã tích hợp API)
│   ├── Register.jsx             # Trang đăng ký (đã tích hợp API)
│   ├── Dashboard.jsx            # Trang dashboard (protected)
│   └── index.js
├── services/
│   └── auth.service.js          # Service xử lý tất cả auth API calls
├── types/
│   └── auth.types.js            # Type definitions cho authentication
├── utils/
│   └── axios.config.js          # Axios instance với interceptors
└── routes/
    └── AppRoutes.jsx            # Routing configuration
```

## 🚀 Cài đặt & Chạy dự án

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Cấu hình environment variables
File `.env` đã được tạo với config mặc định:
```env
VITE_API_BASE_URL=http://localhost:5148/api
```

**Lưu ý:** Nếu backend của bạn chạy trên port khác, hãy sửa URL này.

### 3. Chạy development server
```bash
npm run dev
```

Frontend sẽ chạy trên: **http://localhost:5173**

## 🔧 Backend Configuration

### Yêu cầu Backend
Backend .NET Core Web API cần chạy trên: **http://localhost:5148**

### CORS Configuration
Backend cần enable CORS cho frontend. Thêm vào `Program.cs`:

```csharp
// Program.cs
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:5173") // Vite dev server
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Đặt trước app.UseAuthorization()
app.UseCors();
```

## 📝 API Endpoints được sử dụng

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/auth/login` | Đăng nhập với email & password |
| POST | `/api/auth/register` | Đăng ký tài khoản mới |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Đăng xuất |

## 🔐 Authentication Flow

### 1. Đăng ký (Register)
```
User nhập thông tin → Frontend gọi API register → Backend tạo tài khoản → Redirect về Login
```

### 2. Đăng nhập (Login)
```
User nhập email/password → Frontend gọi API login → Backend trả về JWT token → Lưu token vào localStorage → Redirect về Dashboard
```

### 3. Protected Routes
```
User truy cập route protected → ProtectedRoute kiểm tra token → Nếu valid: hiển thị page, Nếu invalid: redirect về Login
```

### 4. Đăng xuất (Logout)
```
User click logout → Gọi API logout → Xóa token khỏi localStorage → Redirect về Login
```

## 🧪 Test với dữ liệu mẫu

Sau khi backend tạo test users, bạn có thể login với:

**Admin:**
- Email: `admin@demo.com`
- Password: `password123`

**User:**
- Email: `testuser@demo.com`
- Password: `password123`

## 🎨 Features đã implement

### ✅ Login Page (`src/pages/Login.jsx`)
- Form với email & password validation
- Show/hide password
- Loading state khi đang gọi API
- Error handling & hiển thị lỗi từ backend
- Redirect về dashboard sau khi login thành công

### ✅ Register Page (`src/pages/Register.jsx`)
- Form đầy đủ: Full name, Email, Password, Confirm Password
- Validation client-side:
  - Password phải ít nhất 6 ký tự
  - Confirm password phải khớp
  - Email format
- Terms & conditions checkbox
- Loading state & error handling
- Redirect về login sau khi đăng ký thành công

### ✅ Auth Service (`src/services/auth.service.js`)
- `login(email, password)` - Đăng nhập
- `register(username, email, password, role)` - Đăng ký
- `logout()` - Đăng xuất
- `refreshToken()` - Refresh JWT token
- `isAuthenticated()` - Kiểm tra đã login chưa
- `getCurrentUser()` - Lấy thông tin user từ JWT
- `getUserRole()` - Lấy role của user
- `isAdmin()` - Kiểm tra có phải admin không

### ✅ Protected Route (`src/components/ProtectedRoute.jsx`)
- Bảo vệ các route yêu cầu authentication
- Hỗ trợ role-based access (admin only routes)
- Auto redirect về login nếu chưa đăng nhập

### ✅ Axios Interceptor (`src/utils/axios.config.js`)
- Tự động thêm JWT token vào header của mỗi request
- Auto refresh token khi token hết hạn (401)
- Redirect về login nếu refresh token fail

### ✅ Dashboard Page (`src/pages/Dashboard.jsx`)
- Protected page (chỉ user đã login mới access được)
- Hiển thị thông tin user từ JWT token
- Button logout

## 🔧 Cách sử dụng Auth Service

### Trong component:
```jsx
import authService from '../services/auth.service';

// Login
const handleLogin = async () => {
  const response = await authService.login(email, password);
  if (response.success) {
    // Đăng nhập thành công
  }
};

// Kiểm tra đã login chưa
const isLoggedIn = authService.isAuthenticated();

// Lấy thông tin user
const user = authService.getCurrentUser();
console.log(user.role); // "Admin" hoặc "User"

// Logout
const handleLogout = async () => {
  await authService.logout();
};
```

### API calls với authenticated requests:
```jsx
import api from '../utils/axios.config';

// Token tự động được thêm vào header
const data = await api.get('/protected-endpoint');
```

## 📦 Token Management

Tokens được lưu trong `localStorage`:
- `accessToken` - JWT access token
- `refreshToken` - Refresh token
- `tokenExpiry` - Thời gian hết hạn

**Lưu ý:** Trong production, nên sử dụng httpOnly cookies thay vì localStorage để bảo mật hơn.

## 🐛 Troubleshooting

### CORS Error
**Lỗi:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Giải pháp:** Kiểm tra backend đã enable CORS cho `http://localhost:5173`

### Token không hoạt động
**Lỗi:** Protected endpoints trả về 401

**Giải pháp:** 
1. Kiểm tra token có được lưu trong localStorage không (F12 → Application → Local Storage)
2. Kiểm tra axios interceptor có thêm `Authorization: Bearer <token>` vào header không

### API không kết nối được
**Lỗi:** Network error hoặc timeout

**Giải pháp:**
1. Kiểm tra backend có đang chạy trên port 5148 không
2. Kiểm tra URL trong `.env` file
3. Test API trực tiếp bằng Postman/Thunder Client

## 📚 Documentation tham khảo

Xem thêm tài liệu chi tiết trong các file:
- `FRONTEND_INTEGRATION_REACTJS.md` - Hướng dẫn chi tiết tích hợp frontend
- `QUICKSTART_REACTJS.md` - Quick start guide
- `README_FRONTEND.md` - Tổng quan về API
- `DemoGeoServer_Auth_API.postman_collection.json` - Postman collection để test API

## 🚀 Next Steps

1. ✅ Backend chạy trên port 5148
2. ✅ CORS đã được enable
3. ✅ Frontend chạy và test đăng nhập/đăng ký
4. 📋 Tạo các protected pages khác (Profile, Settings, Admin Panel, ...)
5. 📋 Implement forgot password
6. 📋 Implement Google OAuth login
7. 📋 Thêm form validation với Formik/Yup
8. 📋 Thêm loading skeletons & animations
9. 📋 Unit tests cho auth service

## 🎯 Production Checklist

- [ ] Chuyển từ localStorage sang httpOnly cookies
- [ ] Implement HTTPS
- [ ] Add rate limiting cho login endpoint
- [ ] Add CSRF protection
- [ ] Environment variables cho production
- [ ] Error logging & monitoring
- [ ] Security headers
- [ ] Code splitting & lazy loading

---

**Developed by Elcom AI Team** 🚀
