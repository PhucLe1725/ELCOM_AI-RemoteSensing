import { Navigate } from 'react-router-dom';
import authService from '../services/auth.service';

/**
 * ProtectedRoute Component
 * Bảo vệ các route yêu cầu authentication
 * Nếu user chưa đăng nhập, redirect về trang login
 * Nếu requireAdmin=true, chỉ cho phép admin access
 */
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const isAuthenticated = authService.isAuthenticated();
  const isAdmin = authService.isAdmin();

  // Kiểm tra authentication
  if (!isAuthenticated) {
    // Redirect về login nếu chưa đăng nhập
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra admin role nếu route yêu cầu
  if (requireAdmin && !isAdmin) {
    // Redirect về trang chủ nếu không phải admin
    return <Navigate to="/dashboard" replace />;
  }

  // Render children nếu pass tất cả checks
  return <>{children}</>;
};

export default ProtectedRoute;
