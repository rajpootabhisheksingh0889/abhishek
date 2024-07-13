import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Avatar, IconButton, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const MyProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});

    useEffect(() => {
        // Fetch profile data from API
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
                setEditedProfile(data); // Initialize edited profile state with fetched data
            } catch (error) {
                console.error('Error fetching profile:', error);
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

    const handleSaveChanges = () => {
        // Logic to save edited profile data to API
        console.log('Saving changes:', editedProfile);
        // Example: Send editedProfile data to API for saving
        // Update UI or handle success/error feedback
        setIsEditing(false);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Profile Details
            </Typography>
            {profileData && (
                <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={2}>
                            <Avatar alt="Profile Picture" src={profileData.avatarUrl} style={{ width: 100, height: 100 }} />
                            {isEditing && (
                                <IconButton onClick={handleEditToggle}>
                                    <EditIcon />
                                </IconButton>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                label="First Name"
                                name="first_name"
                                value={editedProfile.first_name || profileData.first_name || ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                label="Last Name"
                                name="last_name"
                                value={editedProfile.last_name || profileData.last_name || ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                label="Email"
                                name="email"
                                value={editedProfile.email || profileData.email || ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                label="Phone"
                                name="phone"
                                value={editedProfile.phone || profileData.phone || ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                label="User Type"
                                name="user_type"
                                value={editedProfile.user_type || profileData.user_type || ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                            {!isEditing && (
                                <Button variant="outlined" onClick={handleEditToggle}>
                                    Edit
                                </Button>
                            )}
                            {isEditing && (
                                <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                                    Save Changes
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </Container>
    );
};

export default MyProfile;
