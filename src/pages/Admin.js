import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { Trash, User, Mail, Phone, Flag } from 'lucide-react';

function Admin() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [contacts, setContacts] = useState([]);
  const [donors, setDonors] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('donors');

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        // contacts (public)
        const cRes = await fetch('https://blood-drop-3uh2.vercel.app/api/contacts');
        const cData = cRes.ok ? await cRes.json() : [];

        // donors (admin protected)
        let dData = [];
        let sData = [];
        try {
          const dRes = await fetch('https://blood-drop-3uh2.vercel.app/api/admin/donors', {
            headers: { Authorization: `Bearer ${user?.token}` }
          });
          if (dRes.ok) dData = await dRes.json();
          // subscribers (admin protected)
          try {
            const sRes = await fetch('https://blood-drop-3uh2.vercel.app/api/admin/subscribers', {
              headers: { Authorization: `Bearer ${user?.token}` }
            });
            if (sRes.ok) sData = await sRes.json();
          } catch (err) {
            console.error('Failed to fetch subscribers', err);
          }
        } catch (err) {
          console.error('Failed to fetch admin donors', err);
        }

        setContacts(cData || []);
        setDonors(dData.map(d => ({
          ...d,
          id: d.id.toString()
        })) || []);
        setSubscribers(sData || []);
      } catch (err) {
        console.error(err);
        toast({ title: 'Failed to load admin data', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [user]);

  // Fetch subscribers on demand (when subscribers tab is active)
  useEffect(() => {
    if (activeTab !== 'subscribers') return;
    const fetchSubscribers = async () => {
      try {
        const res = await fetch('https://blood-drop-3uh2.vercel.app/api/admin/subscribers', {
          headers: { Authorization: `Bearer ${user?.token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch subscribers');
        const data = await res.json();
        setSubscribers(data || []);
      } catch (err) {
        console.error('Failed to fetch subscribers', err);
        toast({ title: 'Failed to load subscribers', variant: 'destructive' });
      }
    };

    fetchSubscribers();
  }, [activeTab, user, toast]);

  const deleteDonor = async (id) => {
    if (!confirm('Delete this donor?')) return;
    try {
      const res = await fetch(`https://blood-drop-3uh2.vercel.app/api/admin/donors/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      if (!res.ok) throw new Error('Failed to delete donor');
      setDonors(prev => prev.filter(d => d.id !== id));
      toast({ title: 'Donor deleted' });
    } catch (err) {
      toast({ title: 'Delete failed', description: err.message, variant: 'destructive' });
    }
  };


  return (
    <div className="content-section py-8 page-container">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle className="flex items-center"><Flag className="w-4 h-4 mr-2" />Management</CardTitle>
            <div>
              {/* Desktop / tablet buttons */}
              <div className="hidden md:flex space-x-2">
                <button
                  className={`px-3 py-1 rounded-md ${activeTab === 'donors' ? 'bg-red-600 text-white' : 'bg-transparent text-gray-700 border border-gray-200'}`}
                  onClick={() => setActiveTab('donors')}
                  aria-pressed={activeTab === 'donors'}
                >
                  Donors
                </button>
                <button
                  className={`px-3 py-1 rounded-md ${activeTab === 'contacts' ? 'bg-red-600 text-white' : 'bg-transparent text-gray-700 border border-gray-200'}`}
                  onClick={() => setActiveTab('contacts')}
                  aria-pressed={activeTab === 'contacts'}
                >
                  Contacted Users
                </button>
                <button
                  className={`px-3 py-1 rounded-md ${activeTab === 'subscribers' ? 'bg-red-600 text-white' : 'bg-transparent text-gray-700 border border-gray-200'}`}
                  onClick={() => setActiveTab('subscribers')}
                  aria-pressed={activeTab === 'subscribers'}
                >
                  Subscribers
                </button>
              </div>

              {/* Mobile dropdown */}
              <div className="md:hidden">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                  className="border border-gray-200 rounded-md px-3 py-1 text-sm"
                  aria-label="Select admin tab"
                >
                  <option value="donors">Donors</option>
                  <option value="contacts">Contacted Users</option>
                  <option value="subscribers">Subscribers</option>
                </select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading && <p>Loading...</p>}

          {/* Donors Table */}
          {activeTab === 'donors' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!loading && donors.length === 0 && (
                    <tr><td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">No donors found.</td></tr>
                  )}
                  {donors.map(d => (
                    <tr key={d.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{d.fullName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{d.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{d.phoneNumber || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{d.bloodGroup || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{[d.city, d.district, d.state].filter(Boolean).join(', ')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button size="sm" variant="destructive" onClick={() => deleteDonor(d.id)}>
                          <Trash className="w-4 h-4 mr-1" />Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Contacts Table */}
          {activeTab === 'contacts' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted At</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!loading && contacts.length === 0 && (
                    <tr><td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">No contact submissions.</td></tr>
                  )}
                  {contacts.map(c => (
                    <tr key={c.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{c.fullName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.phoneNumber || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xl truncate">{c.message}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Subscribers Table */}
          {activeTab === 'subscribers' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribed At</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!loading && subscribers.length === 0 && (
                    <tr><td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">No subscribers found.</td></tr>
                  )}
                  {subscribers.map((s, idx) => (
                    <tr key={s.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{idx + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{s.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Admin;
