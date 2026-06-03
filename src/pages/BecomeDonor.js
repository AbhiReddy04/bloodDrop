import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { 
  Heart, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Camera,
  CheckCircle,
  AlertCircle,
  Weight,
  Activity
} from 'lucide-react';

function BecomeDonor() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: '',
    age: '',
    bloodGroup: '',
    country: 'India',
    state: '',
    district: '',
    town: '',
    address: '',
    weight: '',
    lastDonation: '',
    medicalConditions: '',
    consent: false,
    availability: true,
    photo: ''
  });
  
  const [photoPreview, setPhotoPreview] = useState(null);

  const [errors, setErrors] = useState({});
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

  const eligibilityChecks = [
    { id: 'age', text: 'Age between 18-65 years', icon: User },
    { id: 'weight', text: 'Weight at least 45 kg (100 lbs)', icon: Weight },
    { id: 'health', text: 'Good general health', icon: Activity },
    { id: 'medications', text: 'No medications that prevent donation', icon: AlertCircle },
    { id: 'diseases', text: 'No infectious diseases', icon: CheckCircle },
    { id: 'pregnancy', text: 'Not pregnant or breastfeeding', icon: Heart }
  ];

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.town) newErrors.town = 'Town is required';
    if (!formData.weight || formData.weight < 45) newErrors.weight = 'Weight must be at least 45 kg';
    if (!formData.consent) newErrors.consent = 'You must agree to the terms';

    // Age validation
    const age = calculateAge(formData.dateOfBirth);
    if (age < 18 || age > 65) {
      newErrors.dateOfBirth = 'Age must be between 18 and 65 years';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Auto-calculate age when date of birth changes
      if (field === 'dateOfBirth') {
        newData.age = calculateAge(value);
      }

      // Reset dependent location fields
      if (field === 'state') {
        newData.district = '';
        newData.town = '';
      } else if (field === 'district') {
        newData.town = '';
      }

      return newData;
    });

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: 'File too large',
          description: 'Please select an image under 5MB',
          variant: 'destructive'
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please select an image file',
          variant: 'destructive'
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const photoUrl = e.target.result;
        setPhotoPreview(photoUrl);
        handleInputChange('photo', photoUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Build multipart form data to support profile photo upload
      const form = new FormData();
      form.append('fullName', formData.name);
      form.append('email', formData.email);
      form.append('phoneNumber', formData.phone);
      form.append('dateOfBirth', formData.dateOfBirth);
      form.append('bloodGroup', formData.bloodGroup);
      form.append('weightKg', formData.weight);
      form.append('state', formData.state);
      form.append('district', formData.district);
      form.append('city', formData.town);
      form.append('completeAddress', formData.address);
      form.append('lastDonationDate', formData.lastDonation);
      form.append('medicalConditions', formData.medicalConditions);

      // If user selected a file via the hidden input, attempt to get it
      const fileInput = document.getElementById('photo-upload');
      if (fileInput && fileInput.files && fileInput.files[0]) {
        form.append('profilePhoto', fileInput.files[0]);
      }

      const res = await fetch('https://blood-drop-3uh2.vercel.app/api/donors', {
        method: 'POST',
        body: form
      });

      // parse response body (may contain donor and email status)
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error((data && data.error) || 'Failed to register donor');
      }

      // Basic registration success toast
      toast({
        title: 'Registration Successful!',
        description: 'Thank you for registering as a blood donor. You can now help save lives!'
      });

      // If backend returned email send status, show a secondary toast
      if (data && data.email) {
        const email = data.email;
        // attempted & sent
        if (email.attempted && email.sent) {
          toast({
            title: 'Confirmation Email Sent',
            description: `A confirmation email was sent to ${formData.email}`
          });
        } else if (email.attempted && !email.sent) {
          toast({
            title: 'Email Failed',
            description: email.error?.message || 'We were unable to send a confirmation email. Please contact support.',
            variant: 'destructive'
          });
        } else if (!email.attempted) {
          toast({
            title: 'Email Not Sent',
            description: 'The server did not attempt to send a confirmation email. Email may not be configured on the server.',
            variant: 'warning'
          });
        }
        // for debugging: log the email result
        // eslint-disable-next-line no-console
        console.log('email result:', email);
      }

      navigate('/donors');
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
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

  return (
    <div className="content-section py-8 page-container">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Become a Blood Donor</h1>
          <p className="text-gray-600">
            Join our community of heroes and help save lives through blood donation
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Eligibility Check */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Eligibility Checklist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {eligibilityChecks.map(check => (
                  <div key={check.id} className="flex items-center space-x-3">
                    <check.icon className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{check.text}</span>
                  </div>
                ))}
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Note:</strong> You can donate blood every 8-12 weeks. 
                    One donation can save up to 3 lives!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Donor Registration Form</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth" className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Date of Birth
                        </Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          className={errors.dateOfBirth ? 'border-red-500' : ''}
                        />
                        {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
                        {formData.age && <p className="text-sm text-gray-600">Age: {formData.age} years</p>}
                      </div>

                      <div className="space-y-2">
                        <Label>Blood Group</Label>
                        <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)}>
                          <SelectTrigger className={errors.bloodGroup ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select blood group" />
                          </SelectTrigger>
                          <SelectContent>
                            {bloodGroups.map(group => (
                              <SelectItem key={group} value={group}>{group}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.bloodGroup && <p className="text-sm text-red-500">{errors.bloodGroup}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="weight" className="flex items-center">
                          <Weight className="w-4 h-4 mr-2" />
                          Weight (kg)
                        </Label>
                        <Input
                          id="weight"
                          type="number"
                          min="45"
                          value={formData.weight}
                          onChange={(e) => handleInputChange('weight', e.target.value)}
                          className={errors.weight ? 'border-red-500' : ''}
                        />
                        {errors.weight && <p className="text-sm text-red-500">{errors.weight}</p>}
                      </div>
                    </div>

                    {/* Photo Upload */}
                    <div className="space-y-4">
                      <Label className="flex items-center">
                        <Camera className="w-4 h-4 mr-2" />
                        Profile Photo
                      </Label>
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          {photoPreview ? (
                            <img
                              src={photoPreview}
                              alt="Preview"
                              className="w-24 h-24 rounded-full object-cover border-2 border-red-600"
                            />
                          ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 flex items-center justify-center">
                              <Camera className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                            id="photo-upload"
                          />
                          <Label
                            htmlFor="photo-upload"
                            className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition-colors"
                          >
                            <Camera className="w-4 h-4 mr-2" />
                            Choose Photo
                          </Label>
                          <p className="text-xs text-gray-500">
                            Upload a clear photo of yourself (Max 5MB, JPG/PNG)
                          </p>
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
                        <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                          <SelectTrigger className={errors.state ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(locationData).map(state => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label>District</Label>
                        <Select 
                          value={formData.district} 
                          onValueChange={(value) => handleInputChange('district', value)}
                          disabled={!formData.state}
                        >
                          <SelectTrigger className={errors.district ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select district" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableDistricts().map(district => (
                              <SelectItem key={district} value={district}>{district}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.district && <p className="text-sm text-red-500">{errors.district}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label>Town/City</Label>
                        <Select 
                          value={formData.town} 
                          onValueChange={(value) => handleInputChange('town', value)}
                          disabled={!formData.district}
                        >
                          <SelectTrigger className={errors.town ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select town" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableTowns().map(town => (
                              <SelectItem key={town} value={town}>{town}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.town && <p className="text-sm text-red-500">{errors.town}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Complete Address
                      </Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Enter your complete address"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Medical Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Medical Information</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="lastDonation">Last Blood Donation (Optional)</Label>
                        <Input
                          id="lastDonation"
                          type="date"
                          value={formData.lastDonation}
                          onChange={(e) => handleInputChange('lastDonation', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medicalConditions">Medical Conditions (Optional)</Label>
                      <Textarea
                        id="medicalConditions"
                        value={formData.medicalConditions}
                        onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                        placeholder="List any medical conditions or medications (optional)"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Consent */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => handleInputChange('consent', checked)}
                      />
                      <Label htmlFor="consent" className="text-sm">
                        I agree to the terms and conditions and consent to be contacted for blood donation requests. 
                        I understand that I can update my availability status at any time.
                      </Label>
                    </div>
                    {errors.consent && <p className="text-sm text-red-500">{errors.consent}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={loading}
                  >
                    {loading ? 'Registering...' : 'Register as Donor'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BecomeDonor;