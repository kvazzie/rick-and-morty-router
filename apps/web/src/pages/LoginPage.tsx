
import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { AuthForm } from '../components/AuthForm';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSubmit = (formData: Record<string, string>) => {
    const { username, password } = formData;

    const usersString = localStorage.getItem('users');
    const users = usersString ? JSON.parse(usersString) : [];

    const foundUser = users.find(
      (user: any) => user.username === username && user.password === password
    );

    if (foundUser) {
      login();
      navigate('/');
    } else {
      alert('Invalid username or password!');
    }
  };

  const fields = [
    { name: 'username', label: 'Username', type: 'text', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
  ];

  return (
    <AuthForm
      title="Login"
      buttonText="Login"
      fields={fields}
      onSubmit={handleLoginSubmit}
    />
  );
};
