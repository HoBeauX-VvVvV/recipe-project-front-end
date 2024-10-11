import api from './api';

export const signup = async (username, password) => {
  const response = await api.post('/users/signup', { username, password });
  return response.data;
};

export const signin = async (username, password) => {
  const response = await api.post('/users/signin', { username, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};