# 🌍 Elcom AI Remote Sensing

> Ứng dụng Remote Sensing được xây dựng với React + Vite, tích hợp authentication với .NET Core Web API backend.

## 📋 Mục lục

- [Giới thiệu](#giới-thiệu)
- [Tính năng](#tính-năng)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cài đặt](#cài-đặt)
- [Chạy dự án](#chạy-dự-án)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Authentication](#authentication)
- [Documentation](#documentation)

---

## 🎯 Giới thiệu

Elcom AI Remote Sensing là ứng dụng web frontend được xây dựng bằng React, tích hợp hoàn toàn với backend .NET Core Web API để xử lý authentication và các chức năng liên quan đến remote sensing.

---

## ✨ Tính năng

### Authentication
- ✅ Đăng nhập với email & password
- ✅ Đăng ký tài khoản mới
- ✅ JWT token-based authentication
- ✅ Auto refresh token khi hết hạn
- ✅ Protected routes
- ✅ Role-based access control (User/Admin)
- ✅ Logout functionality

### UI/UX
- ✅ Glassmorphism design
- ✅ Responsive layout
- ✅ Loading states
- ✅ Error handling & display
- ✅ Form validation
- ✅ Password visibility toggle
- ✅ Custom color scheme
- ✅ Be Vietnam Pro font

### Developer Tools
- ✅ API Tester component
- ✅ Axios interceptors
- ✅ Environment variables
- ✅ Comprehensive documentation

---

## 🛠 Công nghệ sử dụng

### Frontend
- **React** 19.2.0 - UI framework
- **Vite** 7.2.4 - Build tool & dev server
- **React Router DOM** 7.10.1 - Routing
- **Axios** - HTTP client
- **Tailwind CSS** 3.4.18 - Styling

### Backend (Integration)
- **.NET Core Web API** - Backend framework
- **JWT Authentication** - Token-based auth
- **PostgreSQL** - Database

---

## 📦 Cài đặt

### Yêu cầu
- Node.js >= 18.0.0
- npm hoặc yarn
- Backend .NET Core Web API đang chạy trên port 5148

### Clone repository
```bash
git clone https://github.com/PhucLe1725/ELCOM_AI-RemoteSensing.git
cd ELCOM_AI-RemoteSensing
```

### Cài đặt dependencies
```bash
npm install
```

### Cấu hình environment variables
File `.env` đã được tạo với config mặc định:
```env
VITE_API_BASE_URL=http://localhost:5148/api
```

**Lưu ý:** Nếu backend chạy trên port khác, hãy sửa URL trong file `.env`

---

## 🚀 Chạy dự án

### Development
```bash
npm run dev
```
Frontend sẽ chạy trên: **http://localhost:5173**

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

---

## 📁 Cấu trúc dự án

```
src/
├── components/          # React components
│   ├── ProtectedRoute.jsx
│   ├── APITester.jsx
│   └── LoadingOverlay.jsx
├── pages/               # Page components
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   └── index.js
├── services/            # API services
│   └── auth.service.js
├── utils/               # Utility functions
│   └── axios.config.js
├── types/               # Type definitions
│   └── auth.types.js
├── routes/              # Routing configuration
│   ├── AppRoutes.jsx
│   └── index.js
├── assets/              # Static assets (images, fonts)
├── styles/              # CSS files
└── App.jsx              # Root component
```

---

## 🔐 Authentication

### Login
1. Truy cập `/login`
2. Nhập email và password
3. Click "Đăng nhập"
4. Redirect về `/dashboard` nếu thành công

### Register
1. Truy cập `/register`
2. Điền form đăng ký
3. Click "Xác nhận"
4. Redirect về `/login` để đăng nhập

### Test Credentials
**Admin:**
- Email: `admin@demo.com`
- Password: `password123`

**User:**
- Email: `testuser@demo.com`
- Password: `password123`

### Protected Routes
Pages yêu cầu authentication:
- `/dashboard` - Trang chủ sau khi đăng nhập
- `/profile` - Thông tin cá nhân (TODO)
- `/admin` - Admin panel (TODO, chỉ admin)

---

## 📚 Documentation

### Quick Start
- **[QUICKSTART.md](./QUICKSTART.md)** - Hướng dẫn bắt đầu nhanh

### Detailed Guides
- **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** - Hướng dẫn chi tiết tích hợp
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Tổng kết implementation

### API Documentation
- **[README_FRONTEND.md](./README_FRONTEND.md)** - Frontend API docs
- **[FRONTEND_INTEGRATION_REACTJS.md](./FRONTEND_INTEGRATION_REACTJS.md)** - Detailed integration
- **[QUICKSTART_REACTJS.md](./QUICKSTART_REACTJS.md)** - React quick start

### Backend Documentation
- **[LOGIN_WITH_EMAIL.md](./LOGIN_WITH_EMAIL.md)** - Backend API migration
- **[DemoGeoServer_Auth_API.postman_collection.json](./DemoGeoServer_Auth_API.postman_collection.json)** - Postman collection

---

## 🧪 Testing

### Manual Testing
1. Start backend server
2. Start frontend: `npm run dev`
3. Navigate to `http://localhost:5173/login`
4. Login với test credentials
5. Test các chức năng trong Dashboard

### API Testing
Dashboard có component **APITester** để test các endpoints:
- Public endpoint
- Protected endpoint
- Admin endpoint
- Check role endpoint

---

## 🐛 Troubleshooting

### CORS Error
**Lỗi:** `Access-Control-Allow-Origin`

**Fix:** Backend cần enable CORS. Xem `INTEGRATION_GUIDE.md` để biết cách config.

### Network Error
**Lỗi:** Cannot connect to API

**Check:**
1. Backend có đang chạy trên port 5148 không?
2. URL trong `.env` có đúng không?

### 401 Unauthorized
**Lỗi:** Protected endpoints trả về 401

**Fix:**
1. Kiểm tra token trong localStorage
2. Token có thể đã hết hạn → logout và login lại

---

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Team

**Elcom AI Team**
- GitHub: [@PhucLe1725](https://github.com/PhucLe1725)

---

## 🔗 Links

- [GitHub Repository](https://github.com/PhucLe1725/ELCOM_AI-RemoteSensing)
- [Documentation](./INTEGRATION_GUIDE.md)
- [Quick Start](./QUICKSTART.md)

---

**Built with ❤️ by Elcom AI Team** 🚀
