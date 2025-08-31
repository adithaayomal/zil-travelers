
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
  query,
  orderBy,
  deleteDoc,
  Timestamp,
  addDoc,
  setDoc
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import {
  Box, Paper, Typography, Button, Tabs, Tab, TextField, Divider, Chip, IconButton, MenuItem, CircularProgress, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Delete as DeleteIcon, Edit as EditIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon, Email as EmailIcon } from '@mui/icons-material';

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
  
  // Bookings state from Firestore
  const [bookings, setBookings] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMsg, setBookingMsg] = useState('');
  const [emailDialog, setEmailDialog] = useState({ open: false, booking: null });
  const [emailSubject, setEmailSubject] = useState('');
  const [customEmailMessage, setCustomEmailMessage] = useState('');
  
  // Packages state from Firestore
  const [packages, setPackages] = useState([]);
  const [packageMsg, setPackageMsg] = useState('');
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [expandedPackages, setExpandedPackages] = useState({});
  const [newPackage, setNewPackage] = useState({
    name: ''
  });

  // Users state from Firestore
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [userMsg, setUserMsg] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');

  // Fetch bookings from Firestore on mount and listen for real-time updates
  useEffect(() => {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Fetch packages from Firestore on mount and listen for real-time updates
  useEffect(() => {
    const q = query(collection(db, 'packages'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPackages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Fetch users from Firestore on mount and listen for real-time updates
  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Fetch email templates from Firestore
  useEffect(() => {
    const fetchEmailTemplates = async () => {
      try {
        const templatesSnapshot = await getDocs(collection(db, 'emailTemplates'));
        const templates = {};
        templatesSnapshot.docs.forEach(doc => {
          if (doc.id === 'settings') {
            // Handle email settings
            setDefaultFromEmail(doc.data().defaultFromEmail || 'noreply@ziltravelers.com');
          } else {
            templates[doc.id] = doc.data();
          }
        });
        
        // Set default templates if none exist
        const defaultTemplates = {
          pending: {
            subject: 'Booking Confirmation - Pending Review',
            body: 'Dear {customerName},\n\nThank you for booking {packageName} with Zil Travelers. Your booking is currently pending review and we will get back to you shortly.\n\nBooking Details:\n- Package: {packageName}\n- Date: {bookingDate}\n- Persons: {persons}\n\nBest regards,\nZil Travelers Team'
          },
          'waiting for payment': {
            subject: 'Payment Required - {packageName}',
            body: 'Dear {customerName},\n\nYour booking for {packageName} has been confirmed! Please proceed with the payment to secure your reservation.\n\nBooking Details:\n- Package: {packageName}\n- Date: {bookingDate}\n- Persons: {persons}\n- Amount: ${amount}\n\nPlease contact us for payment instructions.\n\nBest regards,\nZil Travelers Team'
          },
          'successfully booked': {
            subject: 'Booking Confirmed - {packageName}',
            body: 'Dear {customerName},\n\nCongratulations! Your booking for {packageName} has been successfully confirmed.\n\nBooking Details:\n- Package: {packageName}\n- Date: {bookingDate}\n- Persons: {persons}\n- Status: Confirmed\n\nWe look forward to providing you with an amazing experience!\n\nBest regards,\nZil Travelers Team'
          },
          completed: {
            subject: 'Thank You - {packageName} Completed',
            body: 'Dear {customerName},\n\nThank you for choosing Zil Travelers for your {packageName} experience. We hope you had an amazing time!\n\nWe would love to hear about your experience. Please consider leaving us a review.\n\nLooking forward to serving you again in the future.\n\nBest regards,\nZil Travelers Team'
          }
        };
        
        setEmailTemplates({ ...defaultTemplates, ...templates });
      } catch (error) {
        console.error('Error fetching email templates:', error);
        setEmailMessage('Error loading email templates');
      }
    };
    
    fetchEmailTemplates();
  }, []);

  // Booking management handlers
  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      setBookingLoading(true);
      const bookingRef = doc(db, 'bookings', bookingId);
      await updateDoc(bookingRef, {
        status: newStatus,
        updatedAt: Timestamp.now()
      });
      setBookingMsg(`Booking status updated to ${newStatus}!`);
    } catch (err) {
      setBookingMsg('Error updating booking: ' + err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteDoc(doc(db, 'bookings', bookingId));
        setBookingMsg('Booking deleted successfully!');
      } catch (err) {
        setBookingMsg('Error deleting booking: ' + err.message);
      }
    }
  };

  const handleOpenEmailDialog = (booking) => {
    setEmailDialog({ open: true, booking });
    setEmailSubject(`Regarding your booking - ${booking.package}`);
    setCustomEmailMessage('');
  };

  const handleCloseEmailDialog = () => {
    setEmailDialog({ open: false, booking: null });
    setEmailSubject('');
    setCustomEmailMessage('');
  };

  const handleSendCustomEmail = async () => {
    try {
      setBookingLoading(true);
      // Add email to a collection that can be processed by a backend service
      await addDoc(collection(db, 'emailQueue'), {
        to: emailDialog.booking.email,
        subject: emailSubject,
        message: customEmailMessage,
        bookingId: emailDialog.booking.id,
        sentBy: user?.email,
        createdAt: Timestamp.now(),
        status: 'pending'
      });
      setBookingMsg('Email queued successfully!');
      handleCloseEmailDialog();
    } catch (err) {
      setBookingMsg('Error sending email: ' + err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f39c12';
      case 'waiting for payment': return '#e67e22';
      case 'successfully booked': return '#27ae60';
      case 'confirmed': return '#27ae60';
      case 'cancelled': return '#e74c3c';
      case 'completed': return '#8e44ad';
      default: return '#95a5a6';
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    // Handle Firestore Timestamp
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString();
    }
    
    // Handle ISO string dates
    if (typeof timestamp === 'string') {
      return new Date(timestamp).toLocaleDateString();
    }
    
    // Handle regular Date objects or milliseconds
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
  };

  const togglePackageExpansion = (packageId) => {
    setExpandedPackages(prev => ({
      ...prev,
      [packageId]: !prev[packageId]
    }));
  };

  const getPackageBookings = (packageName) => {
    return bookings.filter(booking => 
      booking.package && booking.package.toLowerCase() === packageName.toLowerCase() &&
      booking.status === 'confirmed'
    );
  };

  // Add new package functionality
  const handleNewPackageChange = (e) => {
    setNewPackage({ ...newPackage, [e.target.name]: e.target.value });
  };

  const handleAddPackage = async (e) => {
    e.preventDefault();
    try {
      if (!newPackage.name.trim()) {
        setPackageMsg('Please enter a package name');
        return;
      }

      await addDoc(collection(db, 'packages'), {
        name: newPackage.name.trim(),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });

      setNewPackage({ name: '' });
      setShowAddPackage(false);
      setPackageMsg('Package added successfully!');
      setTimeout(() => setPackageMsg(''), 3000);
    } catch (err) {
      setPackageMsg('Error adding package: ' + err.message);
    }
  };

  const handleDeletePackage = async (packageId, packageName) => {
    if (window.confirm(`Are you sure you want to delete "${packageName}"? This action cannot be undone.`)) {
      try {
        await deleteDoc(doc(db, 'packages', packageId));
        setPackageMsg('Package deleted successfully!');
        setTimeout(() => setPackageMsg(''), 3000);
      } catch (err) {
        setPackageMsg('Error deleting package: ' + err.message);
      }
    }
  };

  // User management handlers
  const handleUpdateUserRole = async (userId, newRole, isAdmin) => {
    try {
      setUserLoading(true);
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        role: newRole,
        isAdmin: isAdmin,
        updatedAt: Timestamp.now()
      });
      setUserMsg(`User role updated successfully!`);
      setTimeout(() => setUserMsg(''), 3000);
    } catch (err) {
      setUserMsg('Error updating user role: ' + err.message);
      setTimeout(() => setUserMsg(''), 3000);
    } finally {
      setUserLoading(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete "${userName}"? This action cannot be undone.`)) {
      try {
        setUserLoading(true);
        await deleteDoc(doc(db, 'users', userId));
        setUserMsg('User deleted successfully!');
        setTimeout(() => setUserMsg(''), 3000);
      } catch (err) {
        setUserMsg('Error deleting user: ' + err.message);
        setTimeout(() => setUserMsg(''), 3000);
      } finally {
        setUserLoading(false);
      }
    }
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

  // Email template state
  const [emailTemplates, setEmailTemplates] = useState({
    pending: { subject: '', body: '' },
    'waiting for payment': { subject: '', body: '' },
    'successfully booked': { subject: '', body: '' },
    completed: { subject: '', body: '' }
  });
  const [emailSaving, setEmailSaving] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [defaultFromEmail, setDefaultFromEmail] = useState('noreply@ziltravelers.com');
  const [expandedCards, setExpandedCards] = useState({});

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

  // Email template handlers
  const handleEmailTemplateChange = (status, field, value) => {
    setEmailTemplates(prev => ({
      ...prev,
      [status]: {
        ...prev[status],
        [field]: value
      }
    }));
  };

  const toggleCardExpansion = (status) => {
    setExpandedCards(prev => ({
      ...prev,
      [status]: !prev[status]
    }));
  };

  const toggleAllCards = () => {
    const allExpanded = Object.values(expandedCards).every(expanded => expanded);
    const newState = {};
    Object.keys(emailTemplates).forEach(status => {
      newState[status] = !allExpanded;
    });
    setExpandedCards(newState);
  };

  const handleSaveEmailTemplate = async (status) => {
    try {
      setEmailSaving(true);
      const templateRef = doc(db, 'emailTemplates', status);
      await setDoc(templateRef, emailTemplates[status]);
      setEmailMessage(`${status} template saved successfully!`);
      setTimeout(() => setEmailMessage(''), 3000);
    } catch (error) {
      console.error('Error saving email template:', error);
      setEmailMessage('Error saving template: ' + error.message);
    } finally {
      setEmailSaving(false);
    }
  };

  const handleSaveEmailSettings = async () => {
    try {
      setEmailSaving(true);
      const settingsRef = doc(db, 'emailTemplates', 'settings');
      await setDoc(settingsRef, { defaultFromEmail }, { merge: true });
      setEmailMessage('Email settings saved successfully!');
      setTimeout(() => setEmailMessage(''), 3000);
    } catch (error) {
      console.error('Error saving email settings:', error);
      setEmailMessage('Error saving settings: ' + error.message);
    } finally {
      setEmailSaving(false);
    }
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
              Admin Panel
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(32, 87, 167, 0.7)', 
                mt: 0.5,
                fontSize: { xs: '0.75rem', md: '0.8rem' }
              }}
            >
              Welcome, {user?.displayName || 'Admin'}
            </Typography>
          </Box>
          <Tabs
            orientation="vertical"
            value={tab}
            onChange={handleTabChange}
            sx={{ 
              minWidth: '100%',
              '& .MuiTabs-flexContainer': {
                alignItems: 'stretch'
              }
            }}
          >
            <Tab 
              label="Manage Bookings" 
              sx={{ 
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontSize: { xs: '0.8rem', md: '0.875rem' }
              }} 
            />
            <Tab 
              label="Manage Packages" 
              sx={{ 
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontSize: { xs: '0.8rem', md: '0.875rem' }
              }} 
            />
            <Tab 
              label="Manage Users" 
              sx={{ 
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontSize: { xs: '0.8rem', md: '0.875rem' }
              }} 
            />
            <Tab 
              label="Manage Email" 
              sx={{ 
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontSize: { xs: '0.8rem', md: '0.875rem' }
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
                Manage Bookings
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
                View and manage customer bookings
              </Typography>
              <Divider sx={{ mb: 3, backgroundColor: 'rgba(52, 152, 219, 0.1)' }} />
              
              {bookingMsg && (
                <Typography 
                  color={bookingMsg.includes('Error') ? 'error' : 'secondary'} 
                  sx={{ 
                    mb: 2, 
                    p: 1.5, 
                    borderRadius: 1, 
                    backgroundColor: bookingMsg.includes('Error') ? 'rgba(244, 67, 54, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                    fontSize: { xs: '0.8rem', md: '0.875rem' }
                  }}
                >
                  {bookingMsg}
                </Typography>
              )}
              
              {bookings.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center', py: 3, color: 'text.secondary', fontSize: { xs: '0.85rem', md: '0.9rem' } }}>
                  No bookings found.
                </Typography>
              ) : (
                <Box sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700, backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
                    <thead>
                      <tr style={{ background: 'rgba(52, 152, 219, 0.05)' }}>
                        <th style={{ padding: '10px 8px', borderBottom: '1px solid rgba(52, 152, 219, 0.1)', textAlign: 'left', fontWeight: 600, color: '#2057a7', fontSize: '0.8rem' }}>Customer</th>
                        <th style={{ padding: '10px 8px', borderBottom: '1px solid rgba(52, 152, 219, 0.1)', textAlign: 'left', fontWeight: 600, color: '#2057a7', fontSize: '0.8rem' }}>Package</th>
                        <th style={{ padding: '10px 8px', borderBottom: '1px solid rgba(52, 152, 219, 0.1)', textAlign: 'left', fontWeight: 600, color: '#2057a7', fontSize: '0.8rem' }}>Date</th>
                        <th style={{ padding: '10px 8px', borderBottom: '1px solid rgba(52, 152, 219, 0.1)', textAlign: 'left', fontWeight: 600, color: '#2057a7', fontSize: '0.8rem' }}>Persons</th>
                        <th style={{ padding: '10px 8px', borderBottom: '1px solid rgba(52, 152, 219, 0.1)', textAlign: 'left', fontWeight: 600, color: '#2057a7', fontSize: '0.8rem' }}>Status</th>
                        <th style={{ padding: '10px 8px', borderBottom: '1px solid rgba(52, 152, 219, 0.1)', textAlign: 'left', fontWeight: 600, color: '#2057a7', fontSize: '0.8rem' }}>Created</th>
                        <th style={{ padding: '10px 8px', borderBottom: '1px solid rgba(52, 152, 219, 0.1)', textAlign: 'left', fontWeight: 600, color: '#2057a7', fontSize: '0.8rem' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(booking => (
                        <tr key={booking.id} style={{ borderBottom: '1px solid rgba(52, 152, 219, 0.1)', ':hover': { backgroundColor: 'rgba(52, 152, 219, 0.02)' } }}>
                          <td style={{ padding: '10px 8px' }}>
                            <div>
                              <div style={{ fontWeight: 500, fontSize: '0.85rem' }}>{booking.name}</div>
                              <div style={{ fontSize: '0.75rem', color: '#666' }}>{booking.email}</div>
                              {booking.phone && <div style={{ fontSize: '0.75rem', color: '#666' }}>{booking.phone}</div>}
                            </div>
                          </td>
                          <td style={{ padding: '10px 8px', fontSize: '0.8rem' }}>{booking.package}</td>
                          <td style={{ padding: '10px 8px', fontSize: '0.8rem' }}>{booking.date}</td>
                          <td style={{ padding: '10px 8px', fontSize: '0.8rem' }}>{booking.persons}</td>
                          <td style={{ padding: '10px 8px' }}>
                            <Chip 
                              label={booking.status} 
                              size="small"
                              sx={{ 
                                backgroundColor: getStatusColor(booking.status),
                                color: '#fff',
                                fontWeight: 500,
                                textTransform: 'capitalize',
                                fontSize: '0.7rem',
                                height: 22
                              }}
                            />
                          </td>
                          <td style={{ padding: '10px 8px', fontSize: '0.75rem', color: '#666' }}>
                            {formatDate(booking.createdAt)}
                          </td>
                          <td style={{ padding: '10px 8px' }}>
                            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                              <FormControl size="small" sx={{ minWidth: 100 }}>
                                <Select
                                  value={booking.status}
                                  onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value)}
                                  disabled={bookingLoading}
                                  sx={{ fontSize: '0.7rem', height: 28 }}
                                >
                                  <MenuItem value="pending">Pending</MenuItem>
                                  <MenuItem value="confirmed">Confirmed</MenuItem>
                                  <MenuItem value="completed">Completed</MenuItem>
                                  <MenuItem value="cancelled">Cancelled</MenuItem>
                                </Select>
                              </FormControl>
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => handleOpenEmailDialog(booking)}
                                sx={{ p: 0.5 }}
                                title="Send email"
                              >
                                <EmailIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteBooking(booking.id)}
                                sx={{ p: 0.5 }}
                                title="Delete booking"
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              )}
            </Box>
          )}

          {false && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mr: 2 }}>
                  Manage Admin Users
                </Typography>
                <span style={{ background: '#bb2727ff', color: '#fff', borderRadius: 12, padding: '2px 10px', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, marginLeft: 4 }}>Super Admin</span>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              {/* Admin User Form */}
              <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                  {editingUser ? 'Edit Admin User' : 'Add New Admin User'}
                </Typography>
                <form onSubmit={handleUserFormSubmit}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2, mb: 2 }}>
                    <TextField
                      label="Full Name *"
                      name="name"
                      value={userForm.name}
                      onChange={handleUserFormChange}
                      fullWidth
                      required
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      label="Email Address *"
                      name="email"
                      value={userForm.email}
                      onChange={handleUserFormChange}
                      type="email"
                      fullWidth
                      required
                      sx={{ mb: 2 }}
                    />
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 2 }}>
                    <TextField
                      select
                      label="Role"
                      name="role"
                      value={userForm.role}
                      onChange={handleUserFormChange}
                      fullWidth
                      sx={{ mb: 2 }}
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="super_admin">Super Admin</MenuItem>
                      <MenuItem value="moderator">Moderator</MenuItem>
                    </TextField>
                    {!editingUser && (
                      <TextField
                        label="Password *"
                        name="password"
                        value={userForm.password}
                        onChange={handleUserFormChange}
                        type="password"
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                        helperText="Minimum 6 characters"
                      />
                    )}
                  </Box>
                  
                  {userFormError && (
                    <Typography 
                      color="error" 
                      sx={{ 
                        mb: 2, 
                        p: 2, 
                        borderRadius: 1, 
                        backgroundColor: 'rgba(244, 67, 54, 0.1)' 
                      }}
                    >
                      {userFormError}
                    </Typography>
                  )}
                  
                  {userFormSuccess && (
                    <Typography 
                      color="secondary" 
                      sx={{ 
                        mb: 2, 
                        p: 2, 
                        borderRadius: 1, 
                        backgroundColor: 'rgba(76, 175, 80, 0.1)' 
                      }}
                    >
                      {userFormSuccess}
                    </Typography>
                  )}
                  
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="primary" 
                      disabled={userLoading}
                      sx={{ borderRadius: 3, fontWeight: 700 }}
                    >
                      {userLoading ? 'Processing...' : (editingUser ? 'Update Admin' : 'Add Admin')}
                    </Button>
                    {editingUser && (
                      <Button 
                        variant="outlined" 
                        color="secondary" 
                        onClick={handleCancelEdit} 
                        disabled={userLoading}
                        sx={{ borderRadius: 3, fontWeight: 700 }}
                      >
                        Cancel
                      </Button>
                    )}
                  </Box>
                </form>
              </Paper>

              {/* Admin Users List */}
              {adminUsers.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                  No admin users found. Add your first admin user to get started!
                </Typography>
              ) : (
                <Box sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                    <thead>
                      <tr style={{ background: '#f5f5f5' }}>
                        <th style={{ padding: '12px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left', fontWeight: 600 }}>Admin Details</th>
                        <th style={{ padding: '12px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left', fontWeight: 600 }}>Role & Status</th>
                        <th style={{ padding: '12px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left', fontWeight: 600 }}>Created</th>
                        <th style={{ padding: '12px 8px', borderBottom: '1px solid #e0e0e0', textAlign: 'left', fontWeight: 600 }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminUsers.map(adminUser => (
                        <tr key={adminUser.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                          <td style={{ padding: '12px 8px' }}>
                            <div>
                              <div style={{ fontWeight: 500, fontSize: '1rem' }}>{adminUser.name}</div>
                              <div style={{ fontSize: '0.85rem', color: '#666' }}>{adminUser.email}</div>
                            </div>
                          </td>
                          <td style={{ padding: '12px 8px' }}>
                            <div>
                              <Chip 
                                label={adminUser.role || 'admin'} 
                                size="small"
                                sx={{ 
                                  backgroundColor: adminUser.role === 'super_admin' ? '#e74c3c' : '#3498db',
                                  color: '#fff',
                                  fontWeight: 600,
                                  textTransform: 'capitalize',
                                  mb: 1
                                }}
                              />
                              <br />
                              <Chip 
                                label={adminUser.status || 'active'} 
                                size="small"
                                sx={{ 
                                  backgroundColor: adminUser.status === 'active' ? '#27ae60' : '#95a5a6',
                                  color: '#fff',
                                  fontWeight: 600,
                                  textTransform: 'capitalize'
                                }}
                              />
                            </div>
                          </td>
                          <td style={{ padding: '12px 8px', fontSize: '0.85rem', color: '#666' }}>
                            {formatDate(adminUser.createdAt)}
                          </td>
                          <td style={{ padding: '12px 8px' }}>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                              <Button
                                size="small"
                                variant="outlined"
                                color="primary"
                                disabled={userLoading}
                                onClick={() => handleEditUser(adminUser)}
                                sx={{ borderRadius: 2, fontWeight: 600, minWidth: 50, fontSize: '0.75rem' }}
                              >
                                Edit
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                color={adminUser.status === 'active' ? 'warning' : 'success'}
                                disabled={userLoading}
                                onClick={() => handleToggleUserStatus(adminUser.id, adminUser.status)}
                                sx={{ borderRadius: 2, fontWeight: 600, minWidth: 70, fontSize: '0.75rem' }}
                              >
                                {adminUser.status === 'active' ? 'Deactivate' : 'Activate'}
                              </Button>
                              <IconButton
                                size="small"
                                color="error"
                                disabled={userLoading}
                                onClick={() => handleDeleteUser(adminUser.id, adminUser.name)}
                                sx={{ p: 0.5 }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              )}
            </Box>
          )}
          {tab === 1 && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
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
                    Manage Packages
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
                      mb: 0,
                      fontSize: { xs: '0.85rem', md: '0.9rem' }
                    }}
                  >
                    Create and manage tour packages
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => setShowAddPackage(!showAddPackage)}
                  sx={{ 
                    borderRadius: 2, 
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    fontSize: { xs: '0.8rem', md: '0.875rem' },
                    background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #2057a7 0%, #3498db 100%)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 6px 20px rgba(52, 152, 219, 0.3)',
                    }
                  }}
                >
                  {showAddPackage ? 'Cancel' : 'Add New Package'}
                </Button>
              </Box>
              <Divider sx={{ mb: 3, backgroundColor: 'rgba(52, 152, 219, 0.1)' }} />
              
              {packageMsg && (
                <Typography 
                  color={packageMsg.includes('Error') ? 'error' : 'secondary'} 
                  sx={{ 
                    mb: 2, 
                    p: 1.5, 
                    borderRadius: 1, 
                    backgroundColor: packageMsg.includes('Error') ? 'rgba(244, 67, 54, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                    fontSize: { xs: '0.8rem', md: '0.875rem' }
                  }}
                >
                  {packageMsg}
                </Typography>
              )}

              {/* Add New Package Form */}
              {showAddPackage && (
                <Paper elevation={2} sx={{ p: 2.5, mb: 3, borderRadius: 2, background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.02) 0%, rgba(32, 87, 167, 0.05) 100%)', border: '1px solid rgba(52, 152, 219, 0.1)' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2057a7', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                    Add New Package
                  </Typography>
                  <form onSubmit={handleAddPackage}>
                    <TextField
                      label="Package Name"
                      name="name"
                      placeholder="Enter package name"
                      value={newPackage.name}
                      onChange={handleNewPackageChange}
                      fullWidth
                      size="small"
                      required
                      sx={{ 
                        mb: 2,
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
                    <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        size="small"
                        sx={{ 
                          borderRadius: 2, 
                          fontWeight: 600,
                          px: 3,
                          py: 1,
                          fontSize: { xs: '0.8rem', md: '0.875rem' },
                          background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #2057a7 0%, #3498db 100%)',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 6px 20px rgba(52, 152, 219, 0.3)',
                          }
                        }}
                      >
                        Add Package
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="secondary" 
                        size="small"
                        onClick={() => {
                          setShowAddPackage(false);
                          setNewPackage({ name: '' });
                        }}
                        sx={{ 
                          borderRadius: 2, 
                          fontWeight: 600,
                          px: 3,
                          py: 1,
                          fontSize: { xs: '0.8rem', md: '0.875rem' }
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </form>
                </Paper>
              )}

              {/* Packages List */}
              {packages.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center', py: 3, color: 'text.secondary', fontSize: { xs: '0.85rem', md: '0.9rem' } }}>
                  No packages found. Add your first package to get started!
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {packages.map(pkg => {
                    const packageBookings = getPackageBookings(pkg.name);
                    const isExpanded = expandedPackages[pkg.id];
                    
                    return (
                      <Paper key={pkg.id} elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 'none' , background: 'transparent' }}>
                        {/* Package Header */}
                        <Box 
                          sx={{ 
                            p: 2.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            '&:hover': { backgroundColor: 'rgba(52, 152, 219, 0.02)' }
                          }}
                          onClick={() => togglePackageExpansion(pkg.id)}
                        >
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                              <Typography variant="h6" sx={{ fontWeight: 600, color: '#2057a7', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                                {pkg.name}
                              </Typography>
                              <Chip
                                label={`${packageBookings.length} Booked`}
                                size="small"
                                sx={{
                                  backgroundColor: packageBookings.length > 0 ? '#27ae60' : '#95a5a6',
                                  color: '#fff',
                                  fontWeight: 500,
                                  fontSize: '0.7rem',
                                  height: 22
                                }}
                              />
                            </Box>
                            {pkg.category && (
                              <Chip 
                                label={pkg.category} 
                                size="small" 
                                sx={{ backgroundColor: 'rgba(52, 152, 219, 0.1)', color: '#3498db', fontSize: '0.7rem', height: 20 }}
                              />
                            )}
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeletePackage(pkg.id, pkg.name);
                              }}
                              sx={{ p: 0.5 }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                                {isExpanded ? 'Collapse' : 'Expand'}
                              </Typography>
                              {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                            </Box>
                          </Box>
                        </Box>
                        
                        {/* Package Content - Booked Dates with Customer Details */}
                        {isExpanded && (
                          <Box sx={{ px: 2.5, pb: 2.5, borderTop: '1px solid rgba(52, 152, 219, 0.1)' }}>
                            
                            
                            {packageBookings.length === 0 ? (
                              <Typography variant="body2" sx={{ color: 'text.secondary', py: 2, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                                No confirmed bookings found for this package.
                              </Typography>
                            ) : (
                              <Box sx={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500, backgroundColor: 'white', borderRadius: '6px', overflow: 'hidden' }}>
                                  <thead>
                                    <tr style={{ background: 'rgba(52, 152, 219, 0.05)' }}>
                                      <th style={{ padding: '10px 8px', borderBottom: '1px solid rgba(52, 152, 219, 0.1)', textAlign: 'left', fontWeight: 600, color: '#2057a7', fontSize: '0.8rem' }}>
                                        Customer Details
                                      </th>
                                      <th style={{ padding: '10px 8px', borderBottom: '1px solid rgba(52, 152, 219, 0.1)', textAlign: 'left', fontWeight: 600, color: '#2057a7', fontSize: '0.8rem' }}>
                                        Travel Date
                                      </th>
                                      <th style={{ padding: '10px 8px', borderBottom: '1px solid rgba(52, 152, 219, 0.1)', textAlign: 'left', fontWeight: 600, color: '#2057a7', fontSize: '0.8rem' }}>
                                        Persons
                                      </th>
                                      <th style={{ padding: '10px 8px', borderBottom: '1px solid rgba(52, 152, 219, 0.1)', textAlign: 'left', fontWeight: 600, color: '#2057a7', fontSize: '0.8rem' }}>
                                        Booked On
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {packageBookings.map(booking => (
                                      <tr key={booking.id} style={{ borderBottom: '1px solid rgba(52, 152, 219, 0.1)' }}>
                                        <td style={{ padding: '10px 8px' }}>
                                          <div>
                                            <div style={{ fontWeight: 500, fontSize: '0.8rem' }}>{booking.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#666' }}>{booking.email}</div>
                                            {booking.phone && (
                                              <div style={{ fontSize: '0.75rem', color: '#666' }}>{booking.phone}</div>
                                            )}
                                          </div>
                                        </td>
                                        <td style={{ padding: '10px 8px', fontWeight: 500, fontSize: '0.8rem' }}>
                                          {booking.date}
                                        </td>
                                        <td style={{ padding: '10px 8px', fontSize: '0.8rem' }}>
                                          {booking.persons}
                                        </td>
                                        <td style={{ padding: '10px 8px', fontSize: '0.75rem', color: '#666' }}>
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
                      </Paper>
                    );
                  })}
                </Box>
              )}
            </Box>
          )}

          {tab === 2 && (
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
                Manage Users
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
                Manage user accounts and permissions
              </Typography>
              <Divider sx={{ mb: 3, backgroundColor: 'rgba(52, 152, 219, 0.1)' }} />
              
              {userMsg && (
                <Typography 
                  color={userMsg.includes('Error') ? 'error' : 'secondary'} 
                  sx={{ 
                    mb: 2, 
                    p: 1.5, 
                    borderRadius: 1, 
                    backgroundColor: userMsg.includes('Error') ? 'rgba(244, 67, 54, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                    fontSize: { xs: '0.8rem', md: '0.875rem' }
                  }}
                >
                  {userMsg}
                </Typography>
              )}
              
              {/* Search Input */}
              <Box sx={{ mb: 2.5 }}>
                <TextField
                  label="Search Users"
                  variant="outlined"
                  size="small"
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  placeholder="Search by name or email..."
                  sx={{ 
                    width: { xs: '100%', sm: '280px' },
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
              
              {users.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center', py: 3, color: 'text.secondary', fontSize: { xs: '0.85rem', md: '0.9rem' } }}>
                  No users found.
                </Typography>
              ) : (
                <Box sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700, backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
                    <thead>
                      <tr style={{ background: 'rgba(52, 152, 219, 0.05)' }}>
                        <th style={{ padding: '10px 8px', borderBottom: '1px solid rgba(52, 152, 219, 0.1)', textAlign: 'left', fontWeight: 600, color: '#2057a7', fontSize: '0.8rem' }}>User Details</th>
                        <th style={{ padding: '10px 8px', borderBottom: '1px solid rgba(52, 152, 219, 0.1)', textAlign: 'left', fontWeight: 600, color: '#2057a7', fontSize: '0.8rem' }}>Current Role</th>
                        <th style={{ padding: '10px 8px', borderBottom: '1px solid rgba(52, 152, 219, 0.1)', textAlign: 'left', fontWeight: 600, color: '#2057a7', fontSize: '0.8rem' }}>Admin Status</th>
                        <th style={{ padding: '10px 8px', borderBottom: '1px solid rgba(52, 152, 219, 0.1)', textAlign: 'left', fontWeight: 600, color: '#2057a7', fontSize: '0.8rem' }}>Last Login</th>
                        <th style={{ padding: '10px 8px', borderBottom: '1px solid rgba(52, 152, 219, 0.1)', textAlign: 'left', fontWeight: 600, color: '#2057a7', fontSize: '0.8rem' }}>Created</th>
                        <th style={{ padding: '10px 8px', borderBottom: '1px solid rgba(52, 152, 219, 0.1)', textAlign: 'left', fontWeight: 600, color: '#2057a7', fontSize: '0.8rem' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        .filter(userData => {
                          if (!userSearchTerm) return true;
                          const searchLower = userSearchTerm.toLowerCase();
                          const name = userData.displayName || 
                                     (userData.firstName && userData.lastName ? `${userData.firstName} ${userData.lastName}` : '') ||
                                     userData.name || '';
                          const email = userData.email || '';
                          return name.toLowerCase().includes(searchLower) || 
                                 email.toLowerCase().includes(searchLower);
                        })
                        .map(userData => (
                        <tr key={userData.id} style={{ borderBottom: '1px solid rgba(52, 152, 219, 0.1)' }}>
                          <td style={{ padding: '10px 8px' }}>
                            <div>
                              <div style={{ fontWeight: 500, fontSize: '0.8rem' }}>
                                {userData.displayName || 
                                 (userData.firstName && userData.lastName ? `${userData.firstName} ${userData.lastName}` : '') ||
                                 userData.name || 
                                 'No name'}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#666' }}>{userData.email}</div>
                              {userData.provider && (
                                <div style={{ fontSize: '0.7rem', color: '#999', textTransform: 'capitalize' }}>
                                  via {userData.provider}
                                </div>
                              )}
                            </div>
                          </td>
                          <td style={{ padding: '10px 8px' }}>
                            <Chip 
                              label={userData.role || 'user'} 
                              size="small"
                              sx={{ 
                                backgroundColor: userData.isAdmin ? '#e74c3c' : '#3498db',
                                color: '#fff',
                                fontWeight: 500,
                                textTransform: 'capitalize',
                                fontSize: '0.7rem',
                                height: 22
                              }}
                            />
                          </td>
                          <td style={{ padding: '10px 8px' }}>
                            <TextField
                              select
                              size="small"
                              value={userData.isAdmin ? 'admin' : 'user'}
                              onChange={(e) => {
                                const isAdmin = e.target.value === 'admin';
                                const role = isAdmin ? 'admin' : 'user';
                                handleUpdateUserRole(userData.id, role, isAdmin);
                              }}
                              disabled={userLoading}
                              sx={{ 
                                minWidth: 80,
                                '& .MuiOutlinedInput-root': {
                                  fontSize: '0.75rem',
                                  height: 32
                                }
                              }}
                            >
                              <MenuItem value="user" sx={{ fontSize: '0.75rem' }}>User</MenuItem>
                              <MenuItem value="admin" sx={{ fontSize: '0.75rem' }}>Admin</MenuItem>
                            </TextField>
                          </td>
                          <td style={{ padding: '10px 8px', fontSize: '0.75rem', color: '#666' }}>
                            {userData.lastLogin ? formatDate(userData.lastLogin) : 'Never'}
                          </td>
                          <td style={{ padding: '10px 8px', fontSize: '0.75rem', color: '#666' }}>
                            {formatDate(userData.createdAt)}
                          </td>
                          <td style={{ padding: '10px 8px' }}>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => {
                                const userName = userData.displayName || 
                                               (userData.firstName && userData.lastName ? `${userData.firstName} ${userData.lastName}` : '') ||
                                               userData.name || 
                                               userData.email;
                                handleDeleteUser(userData.id, userName);
                              }}
                              disabled={userLoading}
                              sx={{ p: 0.5 }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </td>
                        </tr>
                        ))}
                    </tbody>
                  </table>
                </Box>
              )}
            </Box>
          )}

          {tab === 3 && (
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
                Manage Email Templates
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
                Configure automated email templates
              </Typography>
              <Divider sx={{ mb: 3, backgroundColor: 'rgba(52, 152, 219, 0.1)' }} />
              
              {/* Default Email Configuration */}
              <Paper elevation={2} sx={{ p: 2.5, mb: 3, backgroundColor: 'transparent', border: 'none', borderRadius: 0 ,boxShadow:'none'}}>
                <Typography variant="h6" gutterBottom sx={{ color: '#2057a7', fontWeight: 600, fontSize: '1.1rem' }}>
                   Email Configuration
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <TextField
                    label="Default From Email Address"
                    value={defaultFromEmail}
                    onChange={(e) => setDefaultFromEmail(e.target.value)}
                    placeholder="noreply@ziltravelers.com"
                    type="email"
                    variant="outlined"
                    size="small"
                    helperText="This email address will be used as the sender for all automated booking status emails"
                    sx={{ 
                      flex: 1, 
                      minWidth: 250,
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
                  <Button
                    variant="contained"
                    onClick={handleSaveEmailSettings}
                    disabled={emailSaving}
                    size="small"
                    startIcon={emailSaving ? <CircularProgress size={14} /> : null}
                    sx={{ 
                      height: '36px',
                      minWidth: '100px',
                      alignSelf: { xs: 'stretch', sm: 'flex-start' },
                      mt: { xs: 0, sm: 0.5 },
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #2057a7 0%, #3498db 100%)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 6px 20px rgba(52, 152, 219, 0.3)',
                      }
                    }}
                  >
                    Save Settings
                  </Button>
                </Box>
              </Paper>

              {/* Email Templates Table */}
              <Box sx={{ backgroundColor: '#fff', borderRadius: 2, overflow: 'hidden', border: '1px solid rgba(52, 152, 219, 0.1)' }}>
                <Box sx={{ p: 2, backgroundColor: 'rgba(52, 152, 219, 0.05)', borderBottom: '1px solid rgba(52, 152, 219, 0.1)' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2057a7', fontSize: '1.1rem' }}>
                    Email Templates by Status
                  </Typography>
                </Box>
                <Box sx={{ overflow: 'auto' }}>
                  {Object.entries(emailTemplates).map(([status, template]) => (
                    <Box 
                      key={status} 
                      sx={{ 
                        p: 3, 
                        borderBottom: '1px solid rgba(52, 152, 219, 0.1)',
                        '&:last-child': { borderBottom: 'none' },
                        '&:hover': { backgroundColor: 'rgba(52, 152, 219, 0.02)' }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#2057a7', textTransform: 'capitalize', fontSize: '1rem' }}>
                          {status} Email Template
                        </Typography>
                        <Chip 
                          label={status} 
                          size="small"
                          sx={{ 
                            backgroundColor: getStatusColor(status),
                            color: '#fff',
                            fontWeight: 500,
                            textTransform: 'capitalize',
                            fontSize: '0.7rem',
                            height: 22
                          }}
                        />
                      </Box>
                      
                      <Box sx={{ display: 'grid', gap: 2 }}>
                        <TextField
                          label="Email Subject"
                          fullWidth
                          size="small"
                          value={template.subject}
                          onChange={(e) => handleEmailTemplateChange(status, 'subject', e.target.value)}
                          placeholder={`Enter email subject for ${status} status`}
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
                          label="Email Body"
                          fullWidth
                          multiline
                          rows={4}
                          size="small"
                          value={template.body}
                          onChange={(e) => handleEmailTemplateChange(status, 'body', e.target.value)}
                          placeholder={`Enter email body for ${status} status`}
                          helperText="Available placeholders: {customerName}, {packageName}, {bookingDate}, {persons}, {amount}"
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
                        
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleSaveEmailTemplate(status)}
                            disabled={emailSaving}
                            sx={{ 
                              borderRadius: 2, 
                              fontWeight: 600, 
                              minWidth: 100,
                              px: 3,
                              py: 1,
                              fontSize: '0.8rem',
                              background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #2057a7 0%, #3498db 100%)',
                                transform: 'translateY(-1px)',
                                boxShadow: '0 6px 20px rgba(52, 152, 219, 0.3)',
                              }
                            }}
                          >
                            {emailSaving ? 'Saving...' : 'Save Template'}
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
              
              <Paper elevation={1} sx={{ p: 2.5, mt: 3, backgroundColor: 'rgba(52, 152, 219, 0.02)', border: '1px solid rgba(52, 152, 219, 0.1)', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2057a7', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                  Email Template Variables
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary', fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                  You can use the following variables in your email templates:
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}><strong>{'{'}customerName{'}'}</strong> - Customer's full name</Typography>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}><strong>{'{'}packageName{'}'}</strong> - Name of the booked package</Typography>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}><strong>{'{'}bookingDate{'}'}</strong> - Date of the booking</Typography>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}><strong>{'{'}persons{'}'}</strong> - Number of persons</Typography>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}><strong>{'{'}amount{'}'}</strong> - Total booking amount</Typography>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}><strong>{'{'}status{'}'}</strong> - Current booking status</Typography>
                </Box>
              </Paper>
            </Box>
          )}
        </ContentBox>
      </TabLayout>

      {/* Email Dialog */}
      <Dialog open={emailDialog.open} onClose={handleCloseEmailDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600, color: '#2057a7' }}>
          Send Custom Email
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
              Sending to: {emailDialog.booking?.name} ({emailDialog.booking?.email})
            </Typography>
            <TextField
              fullWidth
              label="Subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              sx={{ mb: 2 }}
              size="small"
            />
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={6}
              value={customEmailMessage}
              onChange={(e) => setCustomEmailMessage(e.target.value)}
              placeholder="Type your custom message here..."
              size="small"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseEmailDialog} size="small">
            Cancel
          </Button>
          <Button 
            onClick={handleSendCustomEmail}
            variant="contained"
            disabled={!emailSubject || !customEmailMessage || bookingLoading}
            size="small"
            sx={{ 
              fontWeight: 600,
              background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #2057a7 0%, #1e4d72 100%)',
              }
            }}
          >
            {bookingLoading ? <CircularProgress size={16} color="inherit" /> : 'Send Email'}
          </Button>
        </DialogActions>
      </Dialog>
    </RootBox>
  );
};

export default AdminPage;
