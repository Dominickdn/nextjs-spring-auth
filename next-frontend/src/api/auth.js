import api from './api';

export const registerUser = async (formData) => {
  try {
    await logoutUser();
    const res = await api.post('/api/v1/auth/register', formData);
    return {
      success: true,
      message: 'Registration successful.',
      data: res.data,
    };
  } catch (err) {
    console.warn('Register error:', err);
    return {
      success: false,
      message: err.response?.data?.message || 'Something went wrong during registration.',
    };
  }
};

export const loginUser = async (formData) => {
  try {
    await logoutUser();
    const res = await api.post('/api/v1/auth/authenticate', formData);
    return {
      success: true,
      message: 'Login successful.'
    };
  } catch (err) {
    console.warn('Login error:', err);
    return {
      success: false,
      message: err.response?.data?.message || 'Login failed. Please try again.',
    };
  }
};

export const logoutUser = async () => {
  try {
    await api.post('/api/v1/auth/logout');
    return {
      success: true,
      message: 'Logout successful.',
    };
  } catch (err) {
    console.warn('Logout error:', err);
    return {
      success: false,
      message: 'Logout failed. Please try again.',
    };
  }
};

export const getProtectedData = async () => {
  try {
    const res = await api.get('/api/v1/demo-controller');
    return res.data;
    
  } catch (err) {
    if (err.response?.status === 403 || err.response?.status === 401) {
      return null; 
    }

    return null;
  }
};

export const forgotPassword = async (formData) => {
  try {
    const res = await api.post('/api/v1/auth/forgot-password', formData);

    return {
      success: true,
      message: res.data?.message || 'Password reset successful.',
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || 'Failed to reset password.',
    };
  }
};

export const resetPassword = async ({ token, newPassword }) => {
  try {
    const res = await api.post('/api/v1/auth/reset-password', {
      token,
      newPassword,
    });

    return {
      success: true,
      message: res.data?.message || 'Password reset successful.',
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || 'Failed to reset password.',
    };
  }
};
