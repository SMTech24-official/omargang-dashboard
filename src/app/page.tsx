import LoginForm from "@/components/admin/LoginForm";
import React from "react";

const Login = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-pink-50">
      <div className="w-full max-w-md px-4">
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
