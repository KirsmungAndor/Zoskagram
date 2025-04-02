"use client";

import { useSession } from 'next-auth/react';
import { Box, Container, Grid, Typography, Avatar, Button, Divider, Tab, Tabs } from '@mui/material';
import { useState, useEffect } from 'react';
import GridOnIcon from '@mui/icons-material/GridOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useRouter } from 'next/navigation';
import { fetchPostsByUserId } from '@/app/actions/posts';
import Image from 'next/image';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface ProfileContentProps {
  userId?: string;
}

interface Post {
  id: string;
  imageUrl: string;
  caption: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

interface UserProfile {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  bio?: string;
  postsCount?: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function ProfileContent({ userId }: ProfileContentProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const targetUserId = userId || session?.user?.id;
        if (!targetUserId) {
          console.log('No target user ID found');
          return;
        }

        console.log('Fetching profile for user:', targetUserId);
        const response = await fetch(`/api/users/${targetUserId}`);
        const data = await response.json();
        setUserProfile(data);

        // Fetch user's posts
        const userPosts = await fetchPostsByUserId(targetUserId);
        setPosts(userPosts);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'authenticated' && (session || userId)) {
      fetchUserProfile();
    }
  }, [session, userId, router, status]);

  if (status === 'loading') {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 8, display: 'flex', justifyContent: 'center' }}>
        <Typography>Načítavam...</Typography>
      </Container>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/auth/prihlasenie');
    return null;
  }

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 8, display: 'flex', justifyContent: 'center' }}>
        <Typography>Načítavam profil...</Typography>
      </Container>
    );
  }

  const isOwnProfile = !userId || userId === session?.user?.id;
  const profile = userProfile || { ...session?.user, bio: undefined } as UserProfile;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      {/* Profile Header */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar
            src={profile?.image || undefined}
            alt={profile?.name || "Profile"}
            sx={{ width: 150, height: 150 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" component="h1" sx={{ display: 'inline-block', mr: 2 }}>
              {profile?.name}
            </Typography>
            {isOwnProfile ? (
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{ textTransform: 'none', borderRadius: 2 }}
              >
                Upraviť profil
              </Button>
            ) : (
              <Button
                variant={isFollowing ? "outlined" : "contained"}
                startIcon={isFollowing ? <PersonRemoveIcon /> : <PersonAddIcon />}
                onClick={() => setIsFollowing(!isFollowing)}
                sx={{ textTransform: 'none', borderRadius: 2 }}
              >
                {isFollowing ? 'Prestať sledovať' : 'Sledovať'}
              </Button>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
            <Typography variant="body1" suppressHydrationWarning>
              <strong>{posts.length}</strong> príspevkov
            </Typography>
            <Typography variant="body1" suppressHydrationWarning>
              <strong>0</strong> sledovateľov
            </Typography>
          </Box>
          <Typography variant="body1">
            {profile?.email}
          </Typography>
          {profile?.bio && (
            <Typography variant="body1" sx={{ mt: 1 }}>
              {profile.bio}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Divider sx={{ mb: 2 }} />

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab
            icon={<GridOnIcon />}
            label="PRÍSPEVKY"
            sx={{ textTransform: 'none', fontWeight: 600 }}
          />
          {isOwnProfile && (
            <Tab
              icon={<BookmarkBorderIcon />}
              label="ULOŽENÉ"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            />
          )}
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={1}>
          {posts.map((post) => (
            <Grid item xs={4} key={post.id}>
              <Box
                sx={{
                  aspectRatio: '1',
                  position: 'relative',
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              >
                <Image
                  src={post.imageUrl}
                  alt={post.caption || "Post"}
                  width={300}
                  height={300}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      {isOwnProfile && (
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={1}>
            {/* TODO: Replace with actual saved posts */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={4} key={item}>
                <Box
                  sx={{
                    aspectRatio: '1',
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                >
                  <Typography variant="h4" color="text.secondary">
                    S{item}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      )}
    </Container>
  );
} 