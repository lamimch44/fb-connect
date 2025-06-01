import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageContainer from '../components/layout/PageContainer';
import Card, { CardBody } from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Mail, Lock } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { login, isAuthenticated, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  if (isAuthenticated) {
    return <Navigate to="/connect" replace />;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };
  
  return (
    <PageContainer showProgress={false}>
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">FB</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">BusinessConnect</h1>
            <p className="text-gray-600">Connect your Facebook Business Page and grow your online presence</p>
          </div>
          
          <Card className="w-full">
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Welcome Back</h2>
                  <p className="text-gray-600 text-sm">Sign in to your account</p>
                </div>
                
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                    {error}
                  </div>
                )}
                
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  fullWidth
                  leftIcon={<Mail size={18} className="text-gray-400" />}
                />
                
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  fullWidth
                  leftIcon={<Lock size={18} className="text-gray-400" />}
                />
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isLoading}
                >
                  Sign In
                </Button>
                
                <div className="text-center text-xs text-gray-500">
                  <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default LoginPage;