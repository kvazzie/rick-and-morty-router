import React from 'react';
import { AuthForm } from '../components/AuthForm';
import { useNavigate } from 'react-router'; // Import useNavigate

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignupSubmit = (formData: Record<string, string>) => {
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Retrieve existing users or initialize an empty array
    const usersString = localStorage.getItem('users');
    const users = usersString ? JSON.parse(usersString) : [];

    // Check if username or email already exists
    const userExists = users.some(
      (user: any) => user.username === username || user.email === email
    );

    if (userExists) {
      alert('Username or Email already registered!');
      return;
    }

    // Add new user (NOTE: Storing password in plain text is insecure for real apps)
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! You can now log in.');
    navigate('/login'); // Redirect to login page
  };

  const fields = [
    { name: 'username', label: 'Username', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
  ];

  return (
    <AuthForm
      title="Sign Up"
      buttonText="Register"
      fields={fields}
      onSubmit={handleSignupSubmit}
    />
  );
};
