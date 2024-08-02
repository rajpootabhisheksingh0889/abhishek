import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
    Container,
    // Card,
    CardContent,
    Typography,
    Avatar,
    Grid,
    TextField,
    Button,
    Box,
    Paper,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { styled } from '@mui/system';
import 'react-toastify/dist/ReactToastify.css';

// Define keyframes for animations
const fadeIn = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

// Styled component for the Card
const AnimatedCard = styled(Paper)`
  animation: fadeIn 0.5s ease-in-out;
  ${fadeIn}
`;

const MyProfile = () => {
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formValues, setFormValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        gender: '',
        city: '',
        address: '',
       
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const uid = localStorage.getItem('uid');
                if (!uid) {
                    throw new Error('User ID not found');
                }
                const response = await axios.post('http://134.209.145.149:9999/api/profile', {
                    uid,
                });
                if (response.data.Success) {
                    const profileData = response.data.data[0];
                    setProfile(profileData);
                    setFormValues({
                        first_name: profileData.first_name,
                        last_name: profileData.last_name,
                        email: profileData.email,
                        phone: profileData.phone,
                        gender: profileData.gender,
                        city: profileData.city,
                        address: profileData.address,
                    });
                } else {
                    throw new Error('Failed to fetch profile data');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError('Failed to fetch profile data');
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const uid = localStorage.getItem('uid');
            if (!uid) {
                throw new Error('User ID not found');
            }
            const response = await axios.put('http://134.209.145.149:9999/api/editProfile', {
                uid,
                ...formValues,
            });
            console.log('Response data:', response.data); // Log response data
            if (response.data.success) {
                setProfile(formValues);
                setEditMode(false);
                toast.success('Profile updated successfully!');
                setTimeout(() => {
                    navigate('/profile'); // Navigate after 3 seconds
                }, 3000); // 3000 milliseconds = 3 seconds
            } else {
                throw new Error(response.data.Message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setError(error.message || 'Failed to update profile');
            toast.error(error.message || 'Failed to update profile');
        }
    };

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!profile) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container>
            <ToastContainer />
            <AnimatedCard elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Avatar
                                src="/path/to/avatar.jpg" // Add path to your avatar image
                                sx={{
                                    width: 80,
                                    height: 80,
                                    bgcolor: 'primary.main',
                                    fontSize: 40,
                                }}
                            >
                                {profile.first_name ? profile.first_name.charAt(0) : 'U'}
                            </Avatar>

                        </Grid>
                        <Grid item xs={12} sm={8}>
                            {editMode ? (
                                <Box sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="First Name"
                                                name="first_name"
                                                value={formValues.first_name}
                                                onChange={handleInputChange}
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Last Name"
                                                name="last_name"
                                                value={formValues.last_name}
                                                onChange={handleInputChange}
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Email"
                                                name="email"
                                                value={formValues.email}
                                                onChange={handleInputChange}
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Phone"
                                                name="phone"
                                                value={formValues.phone}
                                                onChange={handleInputChange}
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        {/* <Grid item xs={12}>
                                            <TextField
                                                label="User Type"
                                                name="user_type"
                                                value={formValues.user_type}
                                                onChange={handleInputChange}
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                                InputProps={{ readOnly: true }}  // Make field read-only
                                            />
                                        </Grid> */}

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Gender"
                                                name="gender"
                                                value={formValues.gender}
                                                onChange={handleInputChange}
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="City"
                                                name="city"
                                                value={formValues.city}
                                                onChange={handleInputChange}
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Address"
                                                name="address"
                                                value={formValues.address}
                                                onChange={handleInputChange}
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                                multiline
                                                rows={4} // You can adjust the number of rows as needed
                                            />
                                        </Grid>

                                    </Grid>
                                    <Box sx={{ marginTop: 2 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSave}
                                            sx={{ marginRight: 1 }}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            onClick={() => setEditMode(false)}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </Box>
                            ) : (
                                <Box>
                                    <Typography variant="h5">{`${profile.first_name} ${profile.last_name}`}</Typography>
                                    <Typography variant="body1">{profile.email}</Typography>
                                    <Typography variant="body1">{profile.phone}</Typography>
                                    <Typography variant="body2">
                                        User Type: {profile?.user_type}
                                    </Typography>
                                        <Typography variant="body2">
                                            Gender: {profile?.gender}
                                        </Typography>
                                        <Typography variant="body2">
                                            City: {profile?.city}
                                        </Typography>
                                        <Typography variant="body2">
                                            address: {profile?.address}
                                        </Typography>

                                    <Button
                                        variant="contained"
                                        onClick={() => setEditMode(true)}
                                        sx={{ marginTop: 2 }}
                                    >
                                        Edit
                                    </Button>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </CardContent>
            </AnimatedCard>
        </Container>
    );
};

export default MyProfile;
