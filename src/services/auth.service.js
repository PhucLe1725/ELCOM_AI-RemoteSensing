import axios from 'axios';

// API Base URL - backend chạy trên port 5148
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5148/api';

/**
 * Auth Service
 * Xử lý tất cả các API calls liên quan đến authentication
 */
class AuthService {
  /**
   * Login với email và password
   * @param {string} email - Email address
   * @param {string} password - Password
   * @returns {Promise<LoginResponse>}
   */
  async login(email, password) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      });
      
      if (response.data.success && response.data.token) {
        // Lưu tokens vào localStorage
        this.setAccessToken(response.data.token);
        this.setRefreshToken(response.data.refreshToken);
        this.setTokenExpiry(response.data.expiresAt);
      }
      
      return response.data;
    } catch (error) {
      // Xử lý error từ backend
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  }

  /**
   * Register user mới
   * @param {string} username - Username
   * @param {string} email - Email address
   * @param {string} password - Password
   * @param {string} role - User role ("User" hoặc "Admin")
   * @returns {Promise<RegisterResponse>}
   */
  async register(username, email, password, role = 'User') {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        username,
        email,
        password,
        role
      });
      
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  }

  /**
   * Refresh access token
   * @returns {Promise<LoginResponse>}
   */
  async refreshToken() {
    try {
      const refreshToken = this.getRefreshToken();
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken
      });
      
      if (response.data.success && response.data.token) {
        this.setAccessToken(response.data.token);
        this.setTokenExpiry(response.data.expiresAt);
      }
      
      return response.data;
    } catch (error) {
      // Nếu refresh token fail, logout user
      this.logout();
      throw error;
    }
  }

  /**
   * Logout - xóa tất cả tokens
   */
  async logout() {
    try {
      const refreshToken = this.getRefreshToken();
      
      if (refreshToken) {
        // Gọi API logout để invalidate token
        await axios.post(`${API_BASE_URL}/auth/logout`, {
          refreshToken
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Luôn luôn xóa tokens từ localStorage
      this.clearTokens();
    }
  }

  // Token Management Methods
  
  setAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  setRefreshToken(token) {
    localStorage.setItem('refreshToken', token);
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  setTokenExpiry(expiresAt) {
    localStorage.setItem('tokenExpiry', expiresAt);
  }

  getTokenExpiry() {
    return localStorage.getItem('tokenExpiry');
  }

  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiry');
  }

  /**
   * Kiểm tra xem user đã đăng nhập chưa
   * @returns {boolean}
   */
  isAuthenticated() {
    const token = this.getAccessToken();
    const expiry = this.getTokenExpiry();
    
    if (!token || !expiry) {
      return false;
    }

    // Kiểm tra token có hết hạn chưa
    const expiryDate = new Date(expiry);
    const now = new Date();
    
    if (now >= expiryDate) {
      this.clearTokens();
      return false;
    }

    return true;
  }

  /**
   * Decode JWT token để lấy thông tin user
   * @returns {User|null}
   */
  getCurrentUser() {
    const token = this.getAccessToken();
    
    if (!token) {
      return null;
    }

    try {
      // Decode JWT payload (phần giữa của token)
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /**
   * Lấy role của user hiện tại
   * @returns {string|null}
   */
  getUserRole() {
    const user = this.getCurrentUser();
    return user?.role || null;
  }

  /**
   * Kiểm tra xem user có phải admin không
   * @returns {boolean}
   */
  isAdmin() {
    return this.getUserRole() === 'Admin';
  }

  /**
   * Lấy user ID
   * @returns {string|null}
   */
  getUserId() {
    const user = this.getCurrentUser();
    return user?.sub || null;
  }
}

// Export singleton instance
const authService = new AuthService();
export default authService;
