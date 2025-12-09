import { useState } from 'react';
import bgLogin from '../assets/bglogin.png';
import logoElcom from '../assets/LogoElcom.png';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Register:', formData);
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-end bg-cover bg-center"
      style={{ backgroundImage: `url(${bgLogin})` }}
    >
      {/* Register Panel with Glassmorphism */}
      <div className="mr-16 md:mr-24 lg:mr-32">
        <div className="w-[420px] backdrop-blur-xl bg-white/70 border border-white/30 shadow-2xl rounded-2xl p-8" style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}>
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
            ĐĂNG KÝ
          </h1>
          
          {/* Subtitle */}
          <p className="text-sm text-center mb-8" style={{ color: '#000B80' }}>
            Vui lòng điền thông tin của bạn để bắt đầu!
          </p>

          {/* Register Form */}
          <form onSubmit={handleRegister}>
            {/* Full Name Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" style={{ color: '#000B80' }}>
                Họ và tên <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#000B80]">
                  {/* User icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/90 border border-white/50 
                           text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Nhập họ và tên của bạn"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" style={{ color: '#000B80' }}>
                Email <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#000B80]">
                  {/* Email icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/90 border border-white/50 
                           text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" style={{ color: '#000B80' }}>
                Mật khẩu <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#000B80]">
                  {/* Lock icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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

            {/* Confirm Password Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" style={{ color: '#000B80' }}>
                Xác nhận mật khẩu <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#000B80]">
                  {/* Lock icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </span>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-2.5 rounded-lg bg-white/90 border border-white/50 
                           text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent transition-all [&::-ms-reveal]:hidden"
                  placeholder="Nhập lại mật khẩu"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 
                           hover:text-gray-700 transition-colors"
                >
                  {showConfirmPassword ? (
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

            {/* Terms Checkbox */}
            <div className="mb-6">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 
                           focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  required
                />
                <span className="text-sm" style={{ color: '#000B80' }}>
                  Tôi đồng ý với{' '}
                  <a href="#" className="font-medium hover:underline">
                    Điều khoản dịch vụ
                  </a>
                  {' '}và{' '}
                  <a href="#" className="font-medium hover:underline">
                    Chính sách bảo mật
                  </a>
                </span>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-[#003AAB] text-white font-medium py-2.5 rounded-lg 
                       hover:bg-[#002a7f] transition-all duration-200 shadow-lg 
                       hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Xác nhận
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm mt-6" style={{ color: '#000B80' }}>
            Đã có tài khoản?{' '}
            <a 
              href="/login" 
              className="font-medium underline"
              style={{ color: '#000B80' }}
            >
              Đăng nhập ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
