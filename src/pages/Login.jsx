import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgLogin from '../assets/bglogin.png';
import logoElcom from '../assets/LogoElcom.png';
import authService from '../services/auth.service';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(email, password);
      
      if (response.success) {
        // Đăng nhập thành công, redirect về dashboard hoặc trang chủ
        navigate('/dashboard');
      } else {
        setError(response.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      // Xử lý validation errors từ backend
      if (err.errors) {
        const errorMessages = Object.values(err.errors).flat().join(', ');
        setError(errorMessages);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic
    console.log('Google login');
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-end bg-cover bg-center"
      style={{ backgroundImage: `url(${bgLogin})` }}
    >
      {/* Login Panel with Glassmorphism */}
      <div className="mr-16 md:mr-24 lg:mr-32">
        <div className="w-[380px] backdrop-blur-xl bg-white/70 border border-white/30 shadow-2xl rounded-2xl shadow-xl p-8" style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}>
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src={logoElcom} 
              alt="Elcom Logo" 
              className="h-12 object-contain"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center mb-2" style={{ color: '#000B80' }}>
            ĐĂNG NHẬP
          </h1>
          {/* Subtitle */}
          <p className="text-sm text-center mb-8" style={{ color: '#000B80' }}>
            Chào mừng trở lại. Đăng nhập để tiếp tục.
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-300">
              <p className="text-sm text-red-700 text-center">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" style={{ color: '#000B80' }}>
                Email <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#000B80]">
                  {/* Email icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 7.5v9A2.25 2.25 0 0119.5 18H4.5a2.25 2.25 0 01-2.25-2.25v-9A2.25 2.25 0 014.5 6h15a2.25 2.25 0 012.25 2.25z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5l8.25 6.75 8.25-6.75" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/90 border border-white/50 
                           text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-2" style={{ color: '#000B80' }}>
                Mật khẩu <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#000B80]">
                  {/* Lock icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V7.5a4.5 4.5 0 10-9 0v3" />
                    <rect x="6" y="10.5" width="12" height="8" rx="2" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2.5 rounded-lg bg-white/90 border border-white/50 
                           text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent transition-all [&::-ms-reveal]:hidden"
                  placeholder="Nhập mật khẩu"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 
                           hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end mb-6">
              <a 
                href="#" 
                className="text-sm hover:underline transition-all"
                style={{ color: '#000B80' }}
              >
                Quên mật khẩu?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#003AAB] text-white font-medium py-2.5 rounded-lg 
                       hover:bg-[#002a7f] transition-all duration-200 shadow-lg 
                       hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 
                       disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/30"></div>
            <span className="px-4 text-sm" style={{ color: '#000B80' }}>Hoặc</span>
            <div className="flex-1 border-t border-white/30"></div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white/90 text-gray-700 font-medium py-2.5 rounded-lg 
                     border border-white/50 hover:bg-white hover:shadow-lg 
                     transition-all duration-200 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Đăng nhập với Google
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm mt-6" style={{ color: '#000B80' }}>
            Chưa có tài khoản?{' '}
            <a 
              href="/register" 
              className="font-medium underline"
              style={{ color: '#000B80' }}
            >
              Đăng ký
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
