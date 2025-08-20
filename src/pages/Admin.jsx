
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
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


const AdminPage = () => {
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
  // Packages state from Firestore
  const [packages, setPackages] = useState([]);
  const [packageEdit, setPackageEdit] = useState(null);
  const [packageEditDates, setPackageEditDates] = useState({ availableFrom: '', availableTo: '' });
  const [packageMsg, setPackageMsg] = useState('');

  // Fetch packages from Firestore on mount and listen for real-time updates
  useEffect(() => {
    const q = query(collection(db, 'packages'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPackages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleEditPackage = pkg => {
    setPackageEdit(pkg.id);
    setPackageEditDates({ availableFrom: pkg.availableFrom, availableTo: pkg.availableTo });
    setPackageMsg('');
  };
  const handlePackageDateChange = e => {
    setPackageEditDates({ ...packageEditDates, [e.target.name]: e.target.value });
  };
  const handleSavePackageDates = async (id) => {
    try {
      const pkgRef = doc(db, 'packages', id);
      await updateDoc(pkgRef, {
        availableFrom: packageEditDates.availableFrom,
        availableTo: packageEditDates.availableTo
      });
      setPackageEdit(null);
      setPackageMsg('Dates updated!');
    } catch (err) {
      setPackageMsg('Error updating package: ' + err.message);
    }
  };
  const handleCancelPackageEdit = () => {
    setPackageEdit(null);
    setPackageMsg('');
  };
  // Admin users state (mock, replace with real API in future)
  const [adminUsers, setAdminUsers] = useState([
    { id: 1, email: 'admin1@example.com', name: 'Admin One' },
    { id: 2, email: 'admin2@example.com', name: 'Admin Two' },
  ]);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({ name: '', email: '', password: '' });
  const [userFormError, setUserFormError] = useState('');
  const [userFormSuccess, setUserFormSuccess] = useState('');

  // Handlers for admin user management
  const handleUserFormChange = e => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };
  const handleUserFormSubmit = e => {
    e.preventDefault();
    setUserFormError('');
    setUserFormSuccess('');
    if (!userForm.name || !userForm.email || (!editingUser && !userForm.password)) {
      setUserFormError('All fields are required.');
      return;
    }
    if (editingUser) {
      setAdminUsers(adminUsers.map(u => u.id === editingUser.id ? { ...u, name: userForm.name, email: userForm.email } : u));
      setUserFormSuccess('Admin updated.');
    } else {
      setAdminUsers([...adminUsers, { id: Date.now(), name: userForm.name, email: userForm.email }]);
      setUserFormSuccess('Admin added.');
    }
    setUserForm({ name: '', email: '', password: '' });
    setEditingUser(null);
  };
  const handleEditUser = user => {
    setEditingUser(user);
    setUserForm({ name: user.name, email: user.email, password: '' });
    setUserFormError('');
    setUserFormSuccess('');
  };
  const handleDeleteUser = userId => {
    setAdminUsers(adminUsers.filter(u => u.id !== userId));
    setUserFormSuccess('Admin deleted.');
    setEditingUser(null);
    setUserForm({ name: '', email: '', password: '' });
  };
  const handleCancelEdit = () => {
    setEditingUser(null);
    setUserForm({ name: '', email: '', password: '' });
    setUserFormError('');
    setUserFormSuccess('');
  };

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
            style={{textAlign: 'left'}}
          >
            
            <Tab label="Manage Bookings" />
            <Tab label="Manage Admins" />
            <Tab label="Manage Packages" />
            <Tab label="Manage Users" />
            {/* Future: <Tab label="Preferences" /> */}
          </Tabs>
          {/* No tab content here; all tab content is in ContentBox below */}
        </TabsBox>
        <ContentBox>
          
          {tab === 0 && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mr: 2 }}>
                  Bookings Details
                </Typography>
                <span style={{ background: '#bb2727ff', color: '#fff', borderRadius: 12, padding: '2px 10px', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, marginLeft: 4 }}>Admin</span>
              </Box>
              <Divider sx={{ mb: 3 }} />
              {/* Mock booking data table */}
              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
                  <thead>
                    <tr style={{ background: '#f5f5f5' }}>
                      <th style={{ padding: '10px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left' }}>Status</th>
                      <th style={{ padding: '10px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left' }}>Package</th>
                      <th style={{ padding: '10px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left' }}>Date</th>
                      <th style={{ padding: '10px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left' }}>Persons</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Example rows, replace with real data */}
                    <tr>
                      <td style={{ padding: '8px', color: '#f39c12', fontWeight: 600 }}>Review</td>
                      <td style={{ padding: '8px' }}>Colombo City Tour</td>
                      <td style={{ padding: '8px' }}>2025-08-10 to 2025-08-12</td>
                      <td style={{ padding: '8px' }}>2 Adults, 1 Child</td>
                    </tr>
                  </tbody>
                </table>
              </Box>
            </Box>
          )}

          {tab === 1 && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mr: 2 }}>
                  Add / Manage Admin Users
                </Typography>
                <span style={{ background: '#bb2727ff', color: '#fff', borderRadius: 12, padding: '2px 10px', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, marginLeft: 4 }}>Admin</span>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <form onSubmit={handleUserFormSubmit} style={{ maxWidth: 400, marginBottom: 24 }}>
                <TextField
                  label="Name"
                  name="name"
                  value={userForm.name}
                  onChange={handleUserFormChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={userForm.email}
                  onChange={handleUserFormChange}
                  type="email"
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
                {!editingUser && (
                  <TextField
                    label="Password"
                    name="password"
                    value={userForm.password}
                    onChange={handleUserFormChange}
                    type="password"
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                  />
                )}
                {userFormError && <Typography color="error" sx={{ mb: 2 }}>{userFormError}</Typography>}
                {userFormSuccess && <Typography color="secondary" sx={{ mb: 2 }}>{userFormSuccess}</Typography>}
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 3, fontWeight: 700 }}>
                    {editingUser ? 'Update Admin' : 'Add Admin'}
                  </Button>
                  {editingUser && (
                    <Button variant="outlined" color="secondary" onClick={handleCancelEdit} sx={{ borderRadius: 3, fontWeight: 700 }}>
                      Cancel
                    </Button>
                  )}
                </Box>
              </form>
              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 400 }}>
                  <thead>
                    <tr style={{ background: '#f5f5f5' }}>
                      <th style={{ padding: '10px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left' }}>Name</th>
                      <th style={{ padding: '10px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left' }}>Email</th>
                      <th style={{ padding: '10px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminUsers.map(user => (
                      <tr key={user.id}>
                        <td style={{ padding: '8px' }}>{user.name}</td>
                        <td style={{ padding: '8px' }}>{user.email}</td>
                        <td style={{ padding: '8px' }}>
                          <Button size="small" variant="outlined" color="primary" sx={{ mr: 1, borderRadius: 2, fontWeight: 700, minWidth: 0, px: 1 }} onClick={() => handleEditUser(user)}>
                            Edit
                          </Button>
                          <Button size="small" variant="outlined" color="error" sx={{ borderRadius: 2, fontWeight: 700, minWidth: 0, px: 1 }} onClick={() => handleDeleteUser(user.id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>
          )}
          {tab === 2 && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mr: 2 }}>
                  Manage Packages
                </Typography>
                <span style={{ background: '#bb2727ff', color: '#fff', borderRadius: 12, padding: '2px 10px', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, marginLeft: 4 }}>Admin</span>
              </Box>
              <Divider sx={{ mb: 3 }} />
              {packageMsg && <Typography color="secondary" sx={{ mb: 2 }}>{packageMsg}</Typography>}
              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
                  <thead>
                    <tr style={{ background: '#f5f5f5' }}>
                      <th style={{ padding: '10px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left' }}>Package</th>
                      <th style={{ padding: '10px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left' }}>Available From</th>
                      <th style={{ padding: '10px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left' }}>Available To</th>
                      <th style={{ padding: '10px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.map(pkg => (
                      <tr key={pkg.id}>
                        <td style={{ padding: '8px' }}>{pkg.name}</td>
                        {packageEdit === pkg.id ? (
                          <>
                            <td style={{ padding: '8px' }}>
                              <input
                                type="date"
                                name="availableFrom"
                                value={packageEditDates.availableFrom}
                                onChange={handlePackageDateChange}
                                style={{ padding: '6px', fontSize: 14 }}
                              />
                            </td>
                            <td style={{ padding: '8px' }}>
                              <input
                                type="date"
                                name="availableTo"
                                value={packageEditDates.availableTo}
                                onChange={handlePackageDateChange}
                                style={{ padding: '6px', fontSize: 14 }}
                              />
                            </td>
                            <td style={{ padding: '8px' }}>
                              <Button size="small" variant="contained" color="primary" sx={{ mr: 1, borderRadius: 2, fontWeight: 700, minWidth: 0, px: 1 }} onClick={() => handleSavePackageDates(pkg.id)}>
                                Save
                              </Button>
                              <Button size="small" variant="outlined" color="secondary" sx={{ borderRadius: 2, fontWeight: 700, minWidth: 0, px: 1 }} onClick={handleCancelPackageEdit}>
                                Cancel
                              </Button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td style={{ padding: '8px' }}>{pkg.availableFrom}</td>
                            <td style={{ padding: '8px' }}>{pkg.availableTo}</td>
                            <td style={{ padding: '8px' }}>
                              <Button size="small" variant="outlined" color="primary" sx={{ borderRadius: 2, fontWeight: 700, minWidth: 0, px: 1 }} onClick={() => handleEditPackage(pkg)}>
                                Edit
                              </Button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
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

export default AdminPage;
