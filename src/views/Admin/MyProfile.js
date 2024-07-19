import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Avatar, IconButton, TextField, Button, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const MyProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch('http://134.209.145.149:9999/api/profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ uid: 1 })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }

                const data = await response.json();
                setProfileData(data);
                setEditedProfile(data); // Initialize editedProfile with fetched data
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveChanges = async () => {
        console.log('Saving changes:', editedProfile);
        // Add your API call to save changes here
        setIsEditing(false);
    };

    if (loading) {
        return (
            <Container style={{ textAlign: 'center', padding: '50px 0' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom align="center">
                Profile Details
            </Typography>
            {profileData && (
                <Paper elevation={3} style={{ padding: 20 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4}>
                            <Avatar alt="Profile Picture" src={profileData.avatarUrl} style={{ width: 100, height: 100 }} />
                            {isEditing && (
                                <IconButton onClick={handleEditToggle} style={{ position: 'absolute', top: 10, right: 10 }}>
                                    <EditIcon />
                                </IconButton>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                label="First Name"
                                name="first_name"
                                value={editedProfile.first_name || ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                label="Last Name"
                                name="last_name"
                                value={editedProfile.last_name || ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                label="Email"
                                name="email"
                                value={editedProfile.email || ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                label="Phone"
                                name="phone"
                                value={editedProfile.phone || ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                label="User Type"
                                name="user_type"
                                value={editedProfile.user_type || ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                            <Grid container spacing={2} justifyContent="flex-end" style={{ marginTop: 16 }}>
                                {!isEditing && (
                                    <Grid item>
                                        <Button variant="outlined" onClick={handleEditToggle} color="primary">
                                            Edit
                                        </Button>
                                    </Grid>
                                )}
                                {isEditing && (
                                    <Grid item>
                                        <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                                            Save Changes
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </Container>
    );
};

export default MyProfile;
