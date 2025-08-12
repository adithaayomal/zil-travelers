import React from 'react';
import { Box, Typography, Container, Divider, Card, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import PublicIcon from '@mui/icons-material/Public';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupsIcon from '@mui/icons-material/Groups';



const AboutPage = () => (
  <Container maxWidth="md" sx={{ py: { xs: 4, md: 10 } }}>
    <Box sx={{ textAlign: 'center', mb: 6 }}>
      <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 2, letterSpacing: 1 }}>
        About Zil Travelers
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Typography variant="body1" sx={{ color: 'text.primary', mb: 2, maxWidth: 600, mx: 'auto' }}>
        Zil Travelers is a newly established travel and tourism service provider in Sri Lanka, committed to offering safe, affordable, and unforgettable travel experiences for international and local tourists.
      </Typography>
      <br /><br />
      <Typography variant="h5" sx={{ color: 'primary.main', mb: 2, fontWeight: 600 }}>
        Executive Summary
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.primary', mb: 2, maxWidth: 1000, mx: 'auto' }}>
        Zil Travelers is a passionate and dedicated travel company based in Sri Lanka, created with the vision of showcasing the natural beauty, cultural heritage, and hospitality of the island at an affordable price.
        <br /><br />
          We specialize in offering customized travel packages, guided tours, and authentic local experiences with a strong focus on safety, quality service, and customer satisfaction.

        <br /><br />    
          As a new business, we are building our brand by combining fresh energy with a deep love for our country. We aim to support Sri Lanka’s tourism industry and provide memorable journeys for all travelers.
      </Typography>

    </Box>

    <Grid container spacing={4} justifyContent="center">
      {/* Vision Statement - full row */}
      <Grid item xs={12}>
        <Card elevation={4} sx={{ borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', p: 1 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' ,backgroundColor: 'transparent'}}>
              
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', ml: 2 }}>
                Vision Statement
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1, textAlign: 'center' }}>
              To be a trusted travel company offering safe and affordable experiences that showcase the true beauty of Sri Lanka.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Mission - title and 4 little cards */}
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mb: 2, textAlign: 'center', letterSpacing: 1 }}>
          Mission Statement
        </Typography>
      </Grid>
      {/* Mission points as cards */}
      <Grid item xs={12} sm={6} md={3}>
        <Card elevation={3} sx={{ borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
          <FavoriteIcon color="secondary" sx={{ fontSize: 36, mb: 1 }} />
          <Typography variant="body1" sx={{ fontWeight: 300, color: 'text.primary', textAlign: 'center' }}>
            Provide budget friendly and secure travel services.
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card elevation={3} sx={{ borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
          <VerifiedUserIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
          <Typography variant="body1" sx={{ fontWeight: 300, color: 'text.primary', textAlign: 'center' }}>
            Deliver personalized and quality experiences.
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card elevation={3} sx={{ borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
          <EmojiNatureIcon color="secondary" sx={{ fontSize: 36, mb: 1 }} />
          <Typography variant="body1" sx={{ fontWeight: 300, color: 'text.primary', textAlign: 'center' }}>
            Promote sustainable and responsible tourism.
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card elevation={3} sx={{ borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
          <GroupsIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
          <Typography variant="body1" sx={{ fontWeight: 300, color: 'text.primary', textAlign: 'center' }}>
            Support local communities and culture.
          </Typography>
        </Card>
      </Grid>
      <br /><br />
      {/* Vision Statement - full row */}
      <Grid item xs={12}>
        <Card elevation={4} sx={{ borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', p: 1 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' ,backgroundColor: 'transparent'}}>
              
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', ml: 2 }}>
                Our Experience
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1, textAlign: 'center' }}>
              Though newly launched, our team is passionate, knowledgeable, and trained to deliver quality service with local expertise and a strong focus on safety and customer satisfaction.
            <br /><br />
            <b>Thank you for choosing Zil Travelers. Let us help you create memories that last a lifetime!</b>.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
    </Grid>

    <Box sx={{ mt: 8, textAlign: 'center' }}>
      <Divider sx={{ mb: 3 }} />
      <Typography variant="subtitle1" sx={{ color: 'primary.dark', fontWeight: 600, fontSize: 18 }}>
        Contact us: <span style={{ color: '#3498db', fontWeight: 700 }}>info@ziltravelers.com</span> | <span style={{ color: '#2ecc71', fontWeight: 700 }}>+94 77 123 4567</span>
      </Typography>
    </Box>
  </Container>
);

export default AboutPage;
