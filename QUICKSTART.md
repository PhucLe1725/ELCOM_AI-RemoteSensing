# 🚀 Quick Start - Tích hợp đăng nhập/đăng ký

## ✅ Đã hoàn thành

Tất cả các file cần thiết đã được tạo và tích hợp với backend .NET Core Web API.

## 📋 Checklist

### Backend Setup
- [ ] Backend .NET Core Web API đang chạy trên `http://localhost:5148`
- [ ] CORS đã được enable cho frontend `http://localhost:5173` (hoặc 5174)
- [ ] Database đã được migrate và có sẵn test users

### Frontend đã tích hợp
- ✅ Axios đã được cài đặt
- ✅ Auth Service đã được tạo (`src/services/auth.service.js`)
- ✅ Axios interceptor để tự động thêm JWT token (`src/utils/axios.config.js`)
- ✅ Login page với API integration (`src/pages/Login.jsx`)
- ✅ Register page với API integration (`src/pages/Register.jsx`)
- ✅ Protected Route component (`src/components/ProtectedRoute.jsx`)
- ✅ Dashboard page (protected) (`src/pages/Dashboard.jsx`)
- ✅ Routes đã được cấu hình (`src/routes/AppRoutes.jsx`)
- ✅ Environment variables (`.env`)

## 🎯 Test ngay bây giờ

### 1. Đảm bảo backend đang chạy
```bash
# Trong terminal của backend project
dotnet run
```
Backend phải chạy trên: `http://localhost:5148`

### 2. Frontend đang chạy
Frontend đã được khởi động và đang chạy trên: `http://localhost:5174`

### 3. Test flow

#### Đăng ký tài khoản mới:
1. Mở browser: `http://localhost:5174/register`
2. Nhập thông tin:
   - Họ và tên: `Nguyen Van A`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
   - ✓ Đồng ý với điều khoản
3. Click "Xác nhận"
4. Nếu thành công → redirect về `/login`

#### Đăng nhập:
1. Mở browser: `http://localhost:5174/login`
2. Nhập thông tin:
   - Email: `test@example.com` (hoặc `admin@demo.com`)
   - Password: `password123`
3. Click "Đăng nhập"
4. Nếu thành công → redirect về `/dashboard`

#### Test với tài khoản có sẵn:
**Admin:**
- Email: `admin@demo.com`
- Password: `password123`

**User:**
- Email: `testuser@demo.com`
- Password: `password123`

## 🔍 Kiểm tra token

1. Đăng nhập thành công
2. Mở DevTools (F12)
3. Application → Local Storage → `http://localhost:5174`
4. Bạn sẽ thấy:
   - `accessToken` - JWT token
   - `refreshToken` - Refresh token
   - `tokenExpiry` - Thời gian hết hạn

## 🐛 Nếu gặp lỗi

### CORS Error
```
Access-Control-Allow-Origin
```
**Fix:** Backend cần enable CORS. Thêm vào `Program.cs`:
```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:5174") // Đổi port nếu cần
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

app.UseCors(); // Đặt trước app.UseAuthorization()
```

### Network Error
- Kiểm tra backend có chạy không
- Kiểm tra URL trong `.env` file: `VITE_API_BASE_URL=http://localhost:5148/api`

### 401 Unauthorized
- Token có thể đã hết hạn
- Logout và login lại

## 📚 Chi tiết hơn

Xem file `INTEGRATION_GUIDE.md` để biết:
- Cấu trúc project chi tiết
- Cách sử dụng Auth Service
- API endpoints
- Troubleshooting đầy đủ
- Production checklist

## 🎉 Kết quả

Bạn đã có:
1. ✅ Login page với glassmorphism design
2. ✅ Register page với validation đầy đủ
3. ✅ Tích hợp hoàn toàn với backend API
4. ✅ JWT token management
5. ✅ Protected routes
6. ✅ Auto refresh token khi hết hạn
7. ✅ Loading states & error handling
8. ✅ Dashboard page

---

**Happy coding! 🚀**
