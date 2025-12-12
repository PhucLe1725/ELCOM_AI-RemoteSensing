import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';
import APITester from '../components/APITester';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Vẫn redirect về login dù có lỗi
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                       transition-colors duration-200"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Chào mừng bạn đến với Elcom AI Remote Sensing!
          </h2>
          
          {user && (
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">User ID:</span> {user.sub}</p>
              <p><span className="font-medium">Role:</span> {user.role}</p>
              <p><span className="font-medium">Token hết hạn:</span> {new Date(user.exp * 1000).toLocaleString('vi-VN')}</p>
            </div>
          )}
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Đây là trang Dashboard được bảo vệ. Chỉ những người dùng đã đăng nhập mới có thể truy cập.
            </p>
          </div>
        </div>

        {/* API Tester */}
        <div className="mt-8">
          <APITester />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
