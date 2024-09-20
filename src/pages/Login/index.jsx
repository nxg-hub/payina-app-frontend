import React from 'react';
import Logo from './_components/ui/logo';
import LoginForm from './_components/form';

const Login = () => {
  return (
    <div className="bg-black h-screen overflow-x-hidden">
      <Logo />
      <LoginForm />
    </div>
  );
};

export default Login;
