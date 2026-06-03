import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../hooks/use-toast';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  Camera, 
  Edit, 
  Save, 
  X,
  Calendar,
  Activity,
  Download,
  Trash2
} from 'lucide-react';

function Profile() {
  const { user, updateUser, logout } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bloodGroup: user?.bloodGroup || '',
    age: user?.age || '',
    country: user?.country || 'India',
    state: user?.state || '',
    district: user?.district || '',
    town: user?.town || '',
    address: user?.address || '',
    isActive: user?.isActive || true,
    lastDonation: user?.lastDonation || '',
    medicalConditions: user?.medicalConditions || ''
  });
  const [loading, setLoading] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const locationData = {
    'Andhra Pradesh': {
      'Guntur': ['Narasaraopet', 'Guntur City', 'Tenali', 'Bapatla'],
      'Krishna': ['Vijayawada', 'Machilipatnam', 'Gudivada'],
      'Visakhapatnam': ['Visakhapatnam', 'Anakapalli', 'Narsipatnam']
    },
    'Telangana': {
      'Hyderabad': ['Hyderabad', 'Secunderabad', 'Cyberabad'],
      'Warangal': ['Warangal', 'Kazipet', 'Parkal']
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateUser(formData);
      setIsEditing(false);
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.'
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bloodGroup: user?.bloodGroup || '',
      age: user?.age || '',
      country: user?.country || 'India',
      state: user?.state || '',
      district: user?.district || '',
      town: user?.town || '',
      address: user?.address || '',
      isActive: user?.isActive || true,
      lastDonation: user?.lastDonation || '',
      medicalConditions: user?.medicalConditions || ''
    });
    setIsEditing(false);
  };

  const exportProfile = () => {
    const profileData = {
      ...user,
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(profileData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `blood-donor-profile-${user.name.replace(/\s+/g, '-')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: 'Profile Exported',
      description: 'Your profile has been downloaded as a JSON file.'
    });
  };

  const deleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      logout();
      toast({
        title: 'Account Deleted',
        description: 'Your account has been deleted successfully.'
      });
    }
  };

  const getAvailableDistricts = () => {
    if (!formData.state) return [];
    return Object.keys(locationData[formData.state] || {});
  };

  const getAvailableTowns = () => {
    if (!formData.state || !formData.district) return [];
    return locationData[formData.state][formData.district] || [];
  };

  const canDonateNext = () => {
    if (!user?.lastDonation) return 'Ready to donate';
    
    const lastDonation = new Date(user.lastDonation);
    const nextDonation = new Date(lastDonation);
    nextDonation.setDate(nextDonation.getDate() + 56); // 8 weeks
    
    const now = new Date();
    if (now >= nextDonation) {
      return 'Ready to donate';
    } else {
      const daysLeft = Math.ceil((nextDonation - now) / (1000 * 60 * 60 * 24));
      return `Next donation in ${daysLeft} days`;
    }
  };

  if (!user) {
    return (
      <div className="content-section py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
          <Button onClick={() => window.location.href = '/'}>Go to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="content-section py-8 page-container">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <div className="flex space-x-2">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="space-x-2">
                <Button onClick={handleSave} disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save'}
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative mb-4">
                    <img
                      src={user.photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'}
                      alt={user.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-red-600"
                    />
                    {isEditing && (
                      <Button
                        size="sm"
                        className="absolute bottom-0 right-1/3 rounded-full bg-red-600 hover:bg-red-700"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-bold mb-2">{user.name}</h2>
                  <p className="text-gray-600 mb-4">{user.email}</p>
                  
                  {user.bloodGroup && (
                    <Badge variant="outline" className="mb-4 bg-red-50 text-red-700 border-red-200 text-lg px-4 py-2">
                      {user.bloodGroup}
                    </Badge>
                  )}
                  
                  <div className="flex items-center justify-center mb-4">
                    <div className={`w-3 h-3 rounded-full mr-2 ${user.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-sm">
                      {user.isActive ? 'Available for donation' : 'Currently unavailable'}
                    </span>
                  </div>

                  {user.isDonor && (
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                      <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                        Registered Donor
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-300">
                        {canDonateNext()}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={exportProfile}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700"
                  onClick={deleteAccount}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Full Name
                      </Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        />
                      ) : (
                        <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded">{user.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Label>
                      {isEditing ? (
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      ) : (
                        <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded">{user.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Phone
                      </Label>
                      {isEditing ? (
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      ) : (
                        <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded">{user.phone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Age
                      </Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={formData.age}
                          onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                        />
                      ) : (
                        <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded">{user.age} years</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center">
                        <Heart className="w-4 h-4 mr-2" />
                        Blood Group
                      </Label>
                      {isEditing ? (
                        <Select value={formData.bloodGroup} onValueChange={(value) => setFormData(prev => ({ ...prev, bloodGroup: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood group" />
                          </SelectTrigger>
                          <SelectContent>
                            {bloodGroups.map(group => (
                              <SelectItem key={group} value={group}>{group}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded">{user.bloodGroup || 'Not specified'}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center">
                        <Activity className="w-4 h-4 mr-2" />
                        Availability Status
                      </Label>
                      <div className="flex items-center space-x-2 p-2">
                        <Switch
                          checked={formData.isActive}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                          disabled={!isEditing}
                        />
                        <span className="text-sm">
                          {formData.isActive ? 'Available for donation' : 'Currently unavailable'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Location Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>State</Label>
                      {isEditing ? (
                        <Select 
                          value={formData.state} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, state: value, district: '', town: '' }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(locationData).map(state => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded">{user.state || 'Not specified'}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>District</Label>
                      {isEditing ? (
                        <Select 
                          value={formData.district} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, district: value, town: '' }))}
                          disabled={!formData.state}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select district" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableDistricts().map(district => (
                              <SelectItem key={district} value={district}>{district}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded">{user.district || 'Not specified'}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Town/City</Label>
                      {isEditing ? (
                        <Select 
                          value={formData.town} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, town: value }))}
                          disabled={!formData.district}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select town" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableTowns().map(town => (
                              <SelectItem key={town} value={town}>{town}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded">{user.town || 'Not specified'}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Complete Address
                    </Label>
                    {isEditing ? (
                      <Textarea
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Enter your complete address"
                        rows={3}
                      />
                    ) : (
                      <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded min-h-[80px]">
                        {user.address || 'Not specified'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Medical Information */}
                {user.isDonor && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Medical Information</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Last Blood Donation</Label>
                        {isEditing ? (
                          <Input
                            type="date"
                            value={formData.lastDonation}
                            onChange={(e) => setFormData(prev => ({ ...prev, lastDonation: e.target.value }))}
                          />
                        ) : (
                          <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            {user.lastDonation ? new Date(user.lastDonation).toLocaleDateString() : 'Never donated'}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Medical Conditions</Label>
                      {isEditing ? (
                        <Textarea
                          value={formData.medicalConditions}
                          onChange={(e) => setFormData(prev => ({ ...prev, medicalConditions: e.target.value }))}
                          placeholder="List any medical conditions or medications"
                          rows={3}
                        />
                      ) : (
                        <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded min-h-[80px]">
                          {user.medicalConditions || 'None specified'}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;