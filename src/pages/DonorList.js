import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../hooks/use-toast';
import { Search, MapPin, Phone, Mail, Flag, User, Users, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function DonorList() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    country: '',
    state: '',
    district: '',
    town: '',
    bloodGroup: ''
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  const locationData = {
    India: {
      'Andhra Pradesh': {
        'Guntur': ['Narasaraopet', 'Guntur City', 'Tenali', 'Bapatla'],
        'Krishna': ['Vijayawada', 'Machilipatnam', 'Gudivada'],
        'Visakhapatnam': ['Visakhapatnam', 'Anakapalli', 'Narsipatnam']
      },
      'Telangana': {
        'Hyderabad': ['Hyderabad', 'Secunderabad', 'Cyberabad'],
        'Warangal': ['Warangal', 'Kazipet', 'Parkal']
      }
    }
  };

  useEffect(() => {
    // Fetch donors from backend API
    const fetchDonors = async () => {
      try {
        const res = await fetch('https://blood-drop-3uh2.vercel.app/api/donors');
        if (!res.ok) throw new Error('Failed to fetch donors');
        const data = await res.json();
        // Map backend donor shape to frontend expected shape
        const mapped = data.map(d => ({
          id: d.id.toString(),
          name: d.fullName || 'Unknown',
          email: d.email || '',
          phone: d.phoneNumber || '',
          dateOfBirth: d.dateOfBirth || '',
          age: d.dateOfBirth ? new Date().getFullYear() - new Date(d.dateOfBirth).getFullYear() : '',
          bloodGroup: d.bloodGroup || '',
          weight: d.weightKg || '',
          photo: d.profilePhoto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
          isActive: true,
          town: d.city || '',
          district: d.district || '',
          state: d.state || '',
          country: 'India'
        }));
        setDonors(mapped);
        setFilteredDonors(mapped);
      } catch (err) {
        console.error(err);
        // If backend fetch fails, fall back only to locally saved donors (no built-in mock data)
        const savedDonors = JSON.parse(localStorage.getItem('blood-awareness-donors') || '[]');
        setDonors(savedDonors);
        setFilteredDonors(savedDonors);
      }
    };

    fetchDonors();
  }, []);

  useEffect(() => {
    filterDonors();
  }, [searchTerm, filters, donors]);

  const filterDonors = () => {
    let filtered = donors.filter(donor => {
      const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          donor.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCountry = !filters.country || donor.country === filters.country;
      const matchesState = !filters.state || donor.state === filters.state;
      const matchesDistrict = !filters.district || donor.district === filters.district;
      const matchesTown = !filters.town || donor.town === filters.town;
      const matchesBloodGroup = !filters.bloodGroup || donor.bloodGroup === filters.bloodGroup;

      return matchesSearch && matchesCountry && matchesState && 
             matchesDistrict && matchesTown && matchesBloodGroup;
    });

    setFilteredDonors(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      
      // Reset dependent filters
      if (key === 'country') {
        newFilters.state = '';
        newFilters.district = '';
        newFilters.town = '';
      } else if (key === 'state') {
        newFilters.district = '';
        newFilters.town = '';
      } else if (key === 'district') {
        newFilters.town = '';
      }
      
      return newFilters;
    });
  };

  const handleReport = (donorId) => {
    toast({
      title: 'Report Submitted',
      description: 'Thank you for reporting this profile. We will review it shortly.'
    });
    
    // Store report in localStorage
    const reports = JSON.parse(localStorage.getItem('blood-awareness-reports') || '[]');
    reports.push({
      donorId,
      reportedAt: new Date().toISOString(),
      status: 'pending'
    });
    localStorage.setItem('blood-awareness-reports', JSON.stringify(reports));
  };
  // Note: availability toggle removed — admin-managed via dashboard.

  const getAvailableStates = () => {
    if (!filters.country) return [];
    return Object.keys(locationData[filters.country] || {});
  };

  const getAvailableDistricts = () => {
    if (!filters.country || !filters.state) return [];
    return Object.keys(locationData[filters.country][filters.state] || {});
  };

  const getAvailableTowns = () => {
    if (!filters.country || !filters.state || !filters.district) return [];
    return locationData[filters.country][filters.state][filters.district] || [];
  };

  return (
    <div className="content-section py-8 page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Blood Donors</h1>
        <p className="text-gray-600">Find blood donors in your area and connect with them for emergency needs.</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Country Filter */}
          <Select value={filters.country} onValueChange={(value) => handleFilterChange('country', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(locationData).map(country => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* State Filter */}
          <Select 
            value={filters.state} 
            onValueChange={(value) => handleFilterChange('state', value)}
            disabled={!filters.country}
          >
            <SelectTrigger>
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              {getAvailableStates().map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* District Filter */}
          <Select 
            value={filters.district} 
            onValueChange={(value) => handleFilterChange('district', value)}
            disabled={!filters.state}
          >
            <SelectTrigger>
              <SelectValue placeholder="District" />
            </SelectTrigger>
            <SelectContent>
              {getAvailableDistricts().map(district => (
                <SelectItem key={district} value={district}>{district}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Blood Group Filter */}
          <Select value={filters.bloodGroup} onValueChange={(value) => handleFilterChange('bloodGroup', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Blood Group" />
            </SelectTrigger>
            <SelectContent>
              {bloodGroups.map(group => (
                <SelectItem key={group} value={group}>{group}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {filteredDonors.length} of {donors.length} donors
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setFilters({ country: '', state: '', district: '', town: '', bloodGroup: '' });
            }}
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Donors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDonors.map(donor => (
          <Card key={donor.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={donor.photo}
                    alt={donor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{donor.name}</h3>
                    <p className="text-sm text-gray-600">Age: {donor.age}</p>
                  </div>
                </div>
                <Badge 
                  variant={donor.isActive ? 'default' : 'secondary'}
                  className={donor.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}
                >
                  {donor.isActive ? 'Available' : 'Inactive'}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Blood Group:</span>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    {donor.bloodGroup}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <MapPin className="w-3 h-3" />
                  <span>{donor.town}, {donor.district}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setSelectedDonor(donor);
                    setShowProfile(true);
                  }}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Profile
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    if (!donor.phone) {
                      toast({ title: 'Phone not available', description: 'This donor has not provided a phone number.' });
                      return;
                    }
                    // initiate phone call
                    window.location.href = `tel:${donor.phone}`;
                  }}
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Call Donor
                </Button>
                {user?.isAdmin && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={async () => {
                      if (!confirm('Delete this donor? This action is irreversible.')) return;
                      try {
                        const res = await fetch(`https://blood-drop-3uh2.vercel.app/api/admin/donors/${donor.id}`, {
                          method: 'DELETE',
                          headers: { 'Authorization': `Bearer ${user.token}` }
                        });
                        if (!res.ok) throw new Error('Failed to delete donor');
                        toast({ title: 'Donor Deleted', description: 'Donor removed successfully.' });
                        setDonors(prev => prev.filter(d => d.id !== donor.id));
                        setFilteredDonors(prev => prev.filter(d => d.id !== donor.id));
                      } catch (err) {
                        toast({ title: 'Delete Failed', description: err.message, variant: 'destructive' });
                      }
                    }}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDonors.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No donors found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or filters to find more donors.
          </p>
          <Button variant="outline" onClick={() => {
            setSearchTerm('');
            setFilters({ country: '', state: '', district: '', town: '', bloodGroup: '' });
          }}>
            Clear all filters
          </Button>
        </div>
      )}

      {/* Donor Profile Modal */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Donor Profile</DialogTitle>
          </DialogHeader>
          
          {selectedDonor && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedDonor.photo}
                  alt={selectedDonor.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold">{selectedDonor.name}</h3>
                  <p className="text-gray-600">Age: {selectedDonor.age}</p>
                  <Badge 
                    variant="outline" 
                    className="mt-2 bg-red-50 text-red-700 border-red-200"
                  >
                    {selectedDonor.bloodGroup}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{selectedDonor.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{selectedDonor.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Location</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>{selectedDonor.town}</p>
                    <p>{selectedDonor.district}</p>
                    <p>{selectedDonor.state}</p>
                    <p>{selectedDonor.country}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${selectedDonor.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className="text-sm">
                    {selectedDonor.isActive ? 'Available for donation' : 'Currently unavailable'}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleReport(selectedDonor.id)}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Flag className="w-4 h-4 mr-1" />
                  Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DonorList;