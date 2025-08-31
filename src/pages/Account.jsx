
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
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  display: 'flex',
  flexDirection: 'column',
}));

const TabLayout = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100vw',
  height: '100vh',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const TabsBox = styled(Box)(({ theme }) => ({
  minWidth: 240,
  width: 240,
  height: '100vh',
  background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.05) 0%, rgba(32, 87, 167, 0.08) 100%)',
  borderRight: '1px solid rgba(52, 152, 219, 0.1)',
  '& .MuiTabs-root': {
    height: '100%',
  },
  '& .MuiTab-root': {
    minHeight: 50,
    fontSize: '0.875rem',
    fontWeight: 500,
    alignItems: 'flex-start',
    textAlign: 'left',
    padding: theme.spacing(1.5, 2.5),
    color: 'rgba(32, 87, 167, 0.8)',
    '&.Mui-selected': {
      color: '#2057a7',
      backgroundColor: 'rgba(32, 87, 167, 0.1)',
      fontWeight: 600,
    },
    '&:hover': {
      backgroundColor: 'rgba(52, 152, 219, 0.08)',
    }
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#3498db',
    width: 3,
  },
  [theme.breakpoints.down('md')]: {
    minWidth: '100%',
    width: '100%',
    height: 'auto',
    borderRight: 'none',
    borderBottom: '1px solid rgba(52, 152, 219, 0.1)',
    '& .MuiTabs-root': {
      height: 'auto',
    },
    '& .MuiTab-root': {
      minHeight: 40,
      padding: theme.spacing(1, 1.5),
      fontSize: '0.8rem',
    }
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  flex: 1,
  height: '100vh',
  padding: theme.spacing(3, 4),
  overflowY: 'auto',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2, 1.5),
    height: 'calc(100vh - 160px)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
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
      <TabLayout>
        <TabsBox>
          <Box sx={{ p: 2, textAlign: 'center', borderBottom: '1px solid rgba(52, 152, 219, 0.1)' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                color: '#2057a7',
                fontSize: { xs: '1rem', md: '1.125rem' }
              }}
            >
              My Account
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(32, 87, 167, 0.7)', 
                mt: 0.5,
                fontSize: { xs: '0.75rem', md: '0.8rem' }
              }}
            >
              Welcome, {user?.displayName || 'Traveler'}
            </Typography>
          </Box>
          <Tabs
            orientation="vertical"
            value={tab}
            onChange={handleTabChange}
            variant="scrollable"
            sx={{ 
              minWidth: '100%',
              '& .MuiTabs-flexContainer': {
                alignItems: 'stretch'
              }
            }}
          >
            <Tab 
              label="Account Details" 
              sx={{ 
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontSize: { xs: '0.9rem', md: '1rem' }
                
              }} 
            />
            <Tab 
              label="My Bookings" 
              sx={{ 
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontSize: { xs: '0.9rem', md: '1rem' }
              }} 
            />
          </Tabs>
        </TabsBox>
        <ContentBox>
          {tab === 0 && (
            <Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 1,
                  color: '#2057a7',
                  fontSize: { xs: '1.5rem', md: '1.75rem' }
                }}
              >
                Account Details
              </Typography>
              
              <Box
                sx={{
                  width: '60px',
                  height: '3px',
                  background: 'linear-gradient(135deg, #3498db 0%, #2ecc71 100%)',
                  borderRadius: '2px',
                  mb: 2,
                }}
              />
              
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(32, 87, 167, 0.7)', 
                  mb: 3,
                  fontSize: { xs: '0.85rem', md: '0.9rem' }
                }}
              >
                Manage your personal information and preferences
              </Typography>
              <Divider sx={{ mb: 3, backgroundColor: 'rgba(52, 152, 219, 0.1)' }} />
              
              <Box component="form" onSubmit={handleSave} sx={{ maxWidth: { xs: '100%', md: 450 } }}>
                <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <TextField
                    label="First Name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    fullWidth
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(52, 152, 219, 0.02)',
                        '&:hover': {
                          backgroundColor: 'rgba(52, 152, 219, 0.04)',
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'rgba(52, 152, 219, 0.06)',
                        }
                      }
                    }}
                  />
                  <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    fullWidth
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(52, 152, 219, 0.02)',
                        '&:hover': {
                          backgroundColor: 'rgba(52, 152, 219, 0.04)',
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'rgba(52, 152, 219, 0.06)',
                        }
                      }
                    }}
                  />
                </Box>
                
                <TextField
                  label="Company (Optional)"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  fullWidth
                  size="small"
                  sx={{ 
                    mb: 2.5,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(52, 152, 219, 0.02)',
                      '&:hover': {
                        backgroundColor: 'rgba(52, 152, 219, 0.04)',
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'rgba(52, 152, 219, 0.06)',
                      }
                    }
                  }}
                />
                
                <TextField
                  label="Phone Number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  fullWidth
                  size="small"
                  sx={{ 
                    mb: 2.5,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(52, 152, 219, 0.02)',
                      '&:hover': {
                        backgroundColor: 'rgba(52, 152, 219, 0.04)',
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'rgba(52, 152, 219, 0.06)',
                      }
                    }
                  }}
                />
                
                <TextField
                  label="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  fullWidth
                  size="small"
                  required
                  sx={{ 
                    mb: 2.5,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(52, 152, 219, 0.02)',
                      '&:hover': {
                        backgroundColor: 'rgba(52, 152, 219, 0.04)',
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'rgba(52, 152, 219, 0.06)',
                      }
                    }
                  }}
                />
                
                <TextField
                  label="New Password (leave empty to keep current)"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  fullWidth
                  size="small"
                  sx={{ 
                    mb: 2.5,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(52, 152, 219, 0.02)',
                      '&:hover': {
                        backgroundColor: 'rgba(52, 152, 219, 0.04)',
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'rgba(52, 152, 219, 0.06)',
                      }
                    }
                  }}
                  autoComplete="new-password"
                />
                
                {error && (
                  <Typography 
                    color="error" 
                    sx={{ 
                      mb: 2, 
                      p: 2, 
                      backgroundColor: 'rgba(244, 67, 54, 0.1)',
                      fontSize: { xs: '0.875rem', md: '1rem' }
                    }}
                  >
                    {error}
                  </Typography>
                )}
                
                {success && (
                  <Typography 
                    sx={{ 
                      mb: 2, 
                      p: 2,
                      color: '#27ae60',
                      backgroundColor: 'rgba(39, 174, 96, 0.1)',
                      fontSize: { xs: '0.875rem', md: '1rem' }
                    }}
                  >
                    {success}
                  </Typography>
                )}
                
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1.5, 
                  mt: 3,
                  flexDirection: { xs: 'column', sm: 'row' }
                }}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    size="small"
                    disabled={saving}
                    sx={{ 
                      fontWeight: 600,
                      px: 3,
                      py: 1,
                      background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
                      fontSize: { xs: '0.8rem', md: '0.875rem' },
                      '&:hover': {
                        background: 'linear-gradient(135deg, #2057a7 0%, #3498db 100%)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 6px 20px rgba(52, 152, 219, 0.3)',
                      }
                    }}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error"
                    size="small"
                    onClick={handleLogout} 
                    sx={{ 
                      fontWeight: 600,
                      px: 3,
                      py: 1,
                      fontSize: { xs: '0.8rem', md: '0.875rem' },
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 6px 20px rgba(244, 67, 54, 0.3)',
                      }
                    }}
                  >
                    Logout
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
          
          {tab === 1 && (
            <Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 1,
                  color: '#2057a7',
                  fontSize: { xs: '1.5rem', md: '1.75rem' }
                }}
              >
                My Bookings
              </Typography>
              
              <Box
                sx={{
                  width: '60px',
                  height: '3px',
                  background: 'linear-gradient(135deg, #3498db 0%, #2ecc71 100%)',
                  borderRadius: '2px',
                  mb: 2,
                }}
              />
              
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(32, 87, 167, 0.7)', 
                  mb: 3,
                  fontSize: { xs: '0.85rem', md: '0.9rem' }
                }}
              >
                Track and manage your travel bookings
              </Typography>
              <Divider sx={{ mb: 3, backgroundColor: 'rgba(52, 152, 219, 0.1)' }} />
              
              {userBookings.length === 0 ? (
                <Box sx={{ 
                  textAlign: 'center', 
                  py: { xs: 3, md: 6 },
                  px: 1.5
                }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'rgba(32, 87, 167, 0.8)', 
                      mb: 1.5,
                      fontSize: { xs: '1rem', md: '1.125rem' }
                    }}
                  >
                    No bookings found
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'rgba(32, 87, 167, 0.6)', 
                      mb: 3,
                      fontSize: { xs: '0.85rem', md: '0.9rem' }
                    }}
                  >
                    You haven't made any bookings yet. Start exploring our amazing travel packages!
                  </Typography>
                  <Button 
                    variant="contained" 
                    size="small"
                    onClick={() => navigate('/tours')}
                    sx={{ 
                      fontWeight: 600,
                      px: 3,
                      py: 1,
                      background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
                      fontSize: { xs: '0.8rem', md: '0.875rem' },
                      '&:hover': {
                        background: 'linear-gradient(135deg, #2057a7 0%, #3498db 100%)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 6px 20px rgba(52, 152, 219, 0.3)',
                      }
                    }}
                  >
                    Browse Tours
                  </Button>
                </Box>
              ) : (
                <Box sx={{ 
                  overflowX: 'auto',
                  '& table': {
                    minWidth: { xs: 600, md: 'auto' }
                  }
                }}>
                  <Box component="table" sx={{ 
                    width: '100%', 
                    borderCollapse: 'collapse',
                    backgroundColor: 'white',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                  }}>
                    <Box component="thead">
                      <Box component="tr" sx={{ backgroundColor: 'rgba(52, 152, 219, 0.05)' }}>
                        <Box component="th" sx={{ p: 2, textAlign: 'left', fontWeight: 700, color: '#2057a7', fontSize: { xs: '0.875rem', md: '1rem' } }}>Package</Box>
                        <Box component="th" sx={{ p: 2, textAlign: 'left', fontWeight: 700, color: '#2057a7', fontSize: { xs: '0.875rem', md: '1rem' } }}>Date</Box>
                        <Box component="th" sx={{ p: 2, textAlign: 'left', fontWeight: 700, color: '#2057a7', fontSize: { xs: '0.875rem', md: '1rem' } }}>Travelers</Box>
                        <Box component="th" sx={{ p: 2, textAlign: 'left', fontWeight: 700, color: '#2057a7', fontSize: { xs: '0.875rem', md: '1rem' } }}>Status</Box>
                        <Box component="th" sx={{ p: 2, textAlign: 'left', fontWeight: 700, color: '#2057a7', fontSize: { xs: '0.875rem', md: '1rem' } }}>Submitted</Box>
                      </Box>
                    </Box>
                    <Box component="tbody">
                      {userBookings.map((booking, index) => (
                        <Box 
                          component="tr" 
                          key={booking.id}
                          sx={{ 
                            borderBottom: '1px solid rgba(52, 152, 219, 0.1)',
                            '&:hover': {
                              backgroundColor: 'rgba(52, 152, 219, 0.02)'
                            }
                          }}
                        >
                          <Box component="td" sx={{ p: 2 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', md: '1rem' } }}>
                              {booking.package}
                            </Typography>
                            {booking.message && (
                              <Typography variant="caption" sx={{ color: 'rgba(32, 87, 167, 0.6)', display: 'block', mt: 0.5 }}>
                                Note: {booking.message.substring(0, 50)}{booking.message.length > 50 ? '...' : ''}
                              </Typography>
                            )}
                          </Box>
                          <Box component="td" sx={{ p: 2, fontSize: { xs: '0.875rem', md: '1rem' } }}>{booking.date}</Box>
                          <Box component="td" sx={{ p: 2, fontSize: { xs: '0.875rem', md: '1rem' } }}>{booking.persons}</Box>
                          <Box component="td" sx={{ p: 2 }}>
                            <Chip 
                              label={booking.status} 
                              size="small"
                              sx={{ 
                                backgroundColor: getStatusColor(booking.status),
                                color: '#fff',
                                fontWeight: 600,
                                textTransform: 'capitalize',
                                fontSize: { xs: '0.75rem', md: '0.875rem' }
                              }}
                            />
                          </Box>
                          <Box component="td" sx={{ p: 2, fontSize: { xs: '0.8rem', md: '0.875rem' }, color: 'rgba(32, 87, 167, 0.6)' }}>
                            {formatDate(booking.createdAt)}
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
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
