'use client';

import React, { useState, useEffect } from 'react';
import { searchProfiles } from '@/app/actions/profiles';
import Link from 'next/link';
import {
  Container,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Paper,
  InputAdornment,
  Box,
  CircularProgress,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

interface Profile {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  profile: {
    avatarUrl: string | null;
  } | null;
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load initial profiles
  useEffect(() => {
    loadProfiles('');
  }, []);

  const loadProfiles = async (value: string) => {
    setIsLoading(true);
    try {
      const results = await searchProfiles(value);
      setProfiles(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    loadProfiles(value);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          textAlign: 'center',
          background: 'linear-gradient(90deg, #a800d9, #82289c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Hľadať používateľov
      </Typography>

      <Paper
        elevation={2}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
        }}
      >
        <TextField
          fullWidth
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Zadajte meno používateľa..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
      </Paper>

      {isLoading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {!searchTerm && (
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: 'text.secondary',
              }}
            >
              Najnovší používatelia
            </Typography>
          )}
          
          <List sx={{ 
            width: '100%', 
            bgcolor: 'background.paper', 
            borderRadius: 2,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
          }}>
            {profiles.map((profile, index) => (
              <React.Fragment key={profile.id}>
                <ListItem
                  component={Link}
                  href={`/profil/${profile.id}`}
                  sx={{
                    py: 2,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: 'action.hover',
                      transform: 'translateX(8px)',
                    },
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={profile.profile?.avatarUrl || profile.image || undefined}
                      sx={{
                        bgcolor: 'primary.main',
                        width: 50,
                        height: 50,
                      }}
                    >
                      {!profile.profile?.avatarUrl && !profile.image ? <PersonIcon /> : null}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight={600}>
                        {profile.name || 'Neznámy používateľ'}
                      </Typography>
                    }
                    secondary={profile.email}
                    sx={{ ml: 1 }}
                  />
                </ListItem>
                {index < profiles.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
            {searchTerm && profiles.length === 0 && (
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
                py={4}
              >
                Nenašli sa žiadni používatelia
              </Typography>
            )}
          </List>
        </>
      )}
    </Container>
  );
} 