
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import {
  Box, Paper, Typography, Button, Tabs, Tab, TextField, Divider, Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';

const RootBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  height: '100vh',
  width: '100vw',
  background: 'linear-gradient(120deg, #e3f6fc 0%, #eafaf1 100%)',
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  overflow: 'hidden',
}));

const TabLayout = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100vw',
  height: '100vh',
  borderRadius: 0,
  boxShadow: 'none',
  overflow: 'hidden',
  background: 'rgba(255,255,255,0.97)',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
  },
}));

const TabsBox = styled(Box)(({ theme }) => ({
  minWidth: 220,
  width: 220,
  background: 'rgba(245,245,245,0.95)',
  borderRight: `1px solid ${theme.palette.divider}`,
  height: '100%',
  [theme.breakpoints.down('md')]: {
    borderRight: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
    minWidth: 0,
    width: '100vw',
    height: 'auto',
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(4, 5),
  height: '100%',
  overflowY: 'auto',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3, 2),
    height: 'calc(100vh - 56px)',
  },
}));


const AccountPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);

  // Redirect to login if not logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (!u) navigate('/login', { replace: true });
    });
    if (!auth.currentUser) navigate('/login', { replace: true });
    return () => unsubscribe();
  }, [navigate]);
  const [tab, setTab] = useState(0);
  
  // User bookings state
  const [userBookings, setUserBookings] = useState([]);

  // Fetch user bookings from Firestore
  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'bookings'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setUserBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return () => unsubscribe();
    }
  }, [user]);

  // Editable fields state
  const [firstName, setFirstName] = useState(user?.displayName?.split(' ')[0] || '');
  const [lastName, setLastName] = useState(user?.displayName?.split(' ')[1] || '');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  const handleTabChange = (e, newValue) => setTab(newValue);

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      // Update displayName
      if (auth.currentUser) {
        await auth.currentUser.updateProfile({
          displayName: `${firstName} ${lastName}`
        });
        // Optionally update email
        if (email !== user.email) {
          await auth.currentUser.updateEmail(email);
        }
        // Optionally update password
        if (password) {
          await auth.currentUser.updatePassword(password);
        }
      }
      setSuccess('Account updated successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f39c12';
      case 'confirmed': return '#27ae60';
      case 'cancelled': return '#e74c3c';
      case 'completed': return '#8e44ad';
      default: return '#95a5a6';
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <RootBox>
      <TabLayout elevation={6}>
        <TabsBox>
          <Tabs
            orientation="vertical"
            value={tab}
            onChange={handleTabChange}
            variant="scrollable"
            sx={{ minWidth: 180 }}
          >
            <Tab label="Account Details" />
            <Tab label="Bookings" />
            {/* Future: <Tab label="Preferences" /> */}
          </Tabs>
        </TabsBox>
        <ContentBox>
          {tab === 0 && (
            <form onSubmit={handleSave} style={{ maxWidth: 400 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
                Account Details
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <TextField
                label="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Company"
                value={company}
                onChange={e => setCompany(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Phone Number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="New Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                fullWidth
                sx={{ mb: 2 }}
                autoComplete="new-password"
              />
              {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
              {success && <Typography color="secondary" sx={{ mb: 2 }}>{success}</Typography>}
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button type="submit" variant="contained" color="primary" disabled={saving} sx={{ borderRadius: 3, fontWeight: 700 }}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleLogout} sx={{ borderRadius: 3, fontWeight: 700 }}>
                  Logout
                </Button>
              </Box>
            </form>
          )}
          {tab === 1 && (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
                My Bookings
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              {userBookings.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
                    No bookings found
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                    You haven't made any bookings yet. Start exploring our amazing travel packages!
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary"
                    sx={{ borderRadius: 3, fontWeight: 700 }}
                    onClick={() => navigate('/tours')}
                  >
                    Browse Tours
                  </Button>
                </Box>
              ) : (
                <Box sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
                    <thead>
                      <tr style={{ background: '#f5f5f5' }}>
                        <th style={{ padding: '12px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left', fontWeight: 600 }}>Package</th>
                        <th style={{ padding: '12px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left', fontWeight: 600 }}>Date</th>
                        <th style={{ padding: '12px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left', fontWeight: 600 }}>Persons</th>
                        <th style={{ padding: '12px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left', fontWeight: 600 }}>Status</th>
                        <th style={{ padding: '12px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left', fontWeight: 600 }}>Submitted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userBookings.map(booking => (
                        <tr key={booking.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                          <td style={{ padding: '12px 8px' }}>
                            <div style={{ fontWeight: 500 }}>{booking.package}</div>
                            {booking.message && (
                              <div style={{ fontSize: '0.85rem', color: '#666', marginTop: 4 }}>
                                Note: {booking.message}
                              </div>
                            )}
                          </td>
                          <td style={{ padding: '12px 8px' }}>{booking.date}</td>
                          <td style={{ padding: '12px 8px' }}>{booking.persons}</td>
                          <td style={{ padding: '12px 8px' }}>
                            <Chip 
                              label={booking.status} 
                              size="small"
                              sx={{ 
                                backgroundColor: getStatusColor(booking.status),
                                color: '#fff',
                                fontWeight: 600,
                                textTransform: 'capitalize'
                              }}
                            />
                          </td>
                          <td style={{ padding: '12px 8px', fontSize: '0.85rem', color: '#666' }}>
                            {formatDate(booking.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              )}
            </Box>
          )}
        </ContentBox>
      </TabLayout>
    </RootBox>
  );
};

export default AccountPage;
