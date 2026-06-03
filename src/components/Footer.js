import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../hooks/use-toast';
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github
} from 'lucide-react';

function Footer() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter your email address',
        variant: 'destructive'
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email address',
        variant: 'destructive'
      });
      return;
    }
    // Send to backend subscribe API
    (async () => {
      try {
        const res = await fetch('https://blood-drop-3uh2.vercel.app/api/admin/subscribes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(body.error || 'Subscription failed');
        }
        toast({ title: 'Subscribed', description: 'You have been subscribed to our newsletter' });
        setEmail('');
      } catch (err) {
        toast({ title: 'Subscription failed', description: err.message || 'Unable to subscribe', variant: 'destructive' });
      }
    })();
  };

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/donors', label: 'Donor List' },
    { path: '/become-donor', label: 'Become a Donor' },
    { path: '/stories', label: 'Stories' },
    { path: '/contact', label: 'Contact' }
  ];

  const legalLinks = [
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms of Use' },
    { path: '/accessibility', label: 'Accessibility Statement' },
    { path: '/report', label: 'Report an Issue' }
  ];

  const teamMembers = [
    {
      name: 'Vineeth Kumar Reddy',
      role: 'Team Lead',
      linkedin: 'https://www.linkedin.com/in/vineeth-kumar-reddy-pasala/',
      github: 'https://github.com/vinni8871'
    },
    {
      name: 'ABHISEKHAR REDDY',
      role: 'Developer',
      linkedin: 'www.linkedin.com/in/abhisekhar-reddykothapalli-283b062a6'
    }
   
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-16">
      <div className="content-section py-20 px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-red-600">BloodDrop</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Dedicated to saving lives through blood donation awareness and connecting donors with those in need.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>Narasaraopet Engineering College</span>
              </div>
              <div className="text-sm text-gray-300 ml-6">
                Narasaraopet, Guntur District<br />
                Andhra Pradesh, India
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-red-600" />
                <a href="mailto:info@bloodcare.org" className="hover:text-red-600 transition-colors">
                  info@bloodcare.org
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-red-600" />
                <span>+91 9876543210</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-red-600 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal & Support</h3>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-red-600 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for blood donation updates and health tips.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 All rights reserved by Narasaraopet Engineering College Students
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="footer-social-icons text-gray-400 hover:text-red-600 transition-all duration-200 transform hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="footer-social-icons text-gray-400 hover:text-red-600 transition-all duration-200 transform hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="footer-social-icons text-gray-400 hover:text-red-600 transition-all duration-200 transform hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="footer-social-icons text-gray-400 hover:text-red-600 transition-all duration-200 transform hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="footer-social-icons text-gray-400 hover:text-red-600 transition-all duration-200 transform hover:scale-110">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;