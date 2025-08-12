
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import {
  Box, Paper, Typography, Button, Tabs, Tab, TextField, Divider
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

  // Editable fields state
  // Bookings state for current user
  const [bookings, setBookings] = useState([]);

  // Fetch current user's bookings from Firestore
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);
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
            <Tab label=" My Bookings" />
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
              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
                  <thead>
                    <tr style={{ background: '#f5f5f5' }}>
                      <th style={{ padding: '10px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left' }}>Status</th>
                      <th style={{ padding: '10px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left' }}>Package</th>
                      <th style={{ padding: '10px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left' }}>Date</th>
                      <th style={{ padding: '10px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left' }}>Persons</th>
                      <th style={{ padding: '10px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left' }}>Message</th>
                      <th style={{ padding: '10px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left' }}>Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 ? (
                      <tr><td colSpan={6} style={{ textAlign: 'center', padding: '16px' }}>No bookings found.</td></tr>
                    ) : (
                      bookings.map(b => (
                        <tr key={b.id}>
                          <td style={{ padding: '8px', color: b.status === 'Review' ? '#f39c12' : b.status === 'Waiting for Payment' ? '#2980b9' : b.status === 'Successfully Booked' ? '#27ae60' : b.status === 'Booking Rejected' ? '#c0392b' : '#333', fontWeight: 700 }}>{b.status}</td>
                          <td style={{ padding: '8px' }}>{b.package}</td>
                          <td style={{ padding: '8px' }}>{b.date}</td>
                          <td style={{ padding: '8px' }}>{b.persons}</td>
                          <td style={{ padding: '8px' }}>{b.message}</td>
                          <td style={{ padding: '8px' }}>{b.createdAt?.toDate ? b.createdAt.toDate().toLocaleString() : ''}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </Box>
            </Box>
          )}
        </ContentBox>
      </TabLayout>
    </RootBox>
  );
};

export default AccountPage;
