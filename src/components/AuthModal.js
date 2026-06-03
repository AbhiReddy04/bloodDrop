import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../hooks/use-toast';
import { Eye, EyeOff, Mail, Phone, User } from 'lucide-react';

function AuthModal({ isOpen, onClose }) {
  // Keep signup code but default and force login view
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Phone is required only on signup
    if (!isLogin) {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone is required';
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Phone number must be 10 digits';
      }
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isLogin) {
        // First try admin login against backend
        try {
          const res = await fetch('https://blood-drop-3uh2.vercel.app/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email, password: formData.password })
          });

          if (res.ok) {
            const body = await res.json();
            const adminUser = {
              id: body.admin.id,
              name: 'Admin',
              email: body.admin.email,
              token: body.token,
              isAdmin: true
            };
            login(adminUser);
            toast({ title: 'Login Successful', description: `Welcome back, ${adminUser.name}!` });
            // Navigate admin to admin dashboard
            navigate('/admin');
            onClose();
            setFormData({ name: '', email: '', phone: '', password: '' });
            setErrors({});
            setLoading(false);
            return;
          }
        } catch (err) {
          // ignore and fallback to local user login
        }

        // Fallback: Mock login validation (local users)
        const users = JSON.parse(localStorage.getItem('blood-awareness-users') || '[]');
        const user = users.find(u => 
          u.email === formData.email && u.password === formData.password
        );

        if (!user) {
          toast({
            title: 'Login Failed',
            description: 'Invalid email or password',
            variant: 'destructive'
          });
          return;
        }
        login(user);
        toast({
          title: 'Login Successful',
          description: `Welcome back, ${user.name}!`
        });
        // Navigate regular users to profile
        navigate('/profile');
      } else {
        // Mock signup
        const users = JSON.parse(localStorage.getItem('blood-awareness-users') || '[]');
        
        if (users.some(u => u.email === formData.email)) {
          toast({
            title: 'Signup Failed',
            description: 'Email already exists',
            variant: 'destructive'
          });
          return;
        }

        const newUser = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          createdAt: new Date().toISOString(),
          isActive: true,
          isDonor: false
        };

        users.push(newUser);
        localStorage.setItem('blood-awareness-users', JSON.stringify(users));
        
        login(newUser);
        toast({
          title: 'Signup Successful',
          description: `Welcome, ${newUser.name}!`
        });
        navigate('/profile');
      }

      onClose();
      setFormData({ name: '', email: '', phone: '', password: '' });
      setErrors({});
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isLogin ? t('auth.login') : t('auth.signup')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {t('auth.name')}
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              {t('auth.email')}
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={errors.email ? 'border-red-500' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                {t('auth.phone')}
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={errors.phone ? 'border-red-500' : ''}
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={errors.password ? 'border-red-500' : ''}
                placeholder="Enter your password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700"
            disabled={loading}
          >
            {loading ? 'Processing...' : (isLogin ? t('auth.loginButton') : t('auth.signupButton'))}
          </Button>
        </form>

        {/* Signup toggle intentionally removed to keep modal login-only */}
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;