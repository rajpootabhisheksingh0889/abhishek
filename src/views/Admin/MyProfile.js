import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Card,
    CardContent,
    Typography,
    Avatar,
    Grid,
    TextField,
    Button,
    Box,
    Divider,
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
const AnimatedCard = styled(Card)`
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
        zipcode: '',
        address: '',
        image: '', // Add image field
    });
    const [imageFile, setImageFile] = useState(null); // State for the image file
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    // Get the current date and calculate the date 18 years ago
    const currentDate = new Date();
    const maxDate = new Date(
        currentDate.getFullYear() - 18,
        currentDate.getMonth(),
        currentDate.getDate()
    ).toISOString().split('T')[0]; // Format as YYYY-MM-DD

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };
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
                        zipcode: profileData.zipcode,
                        address: profileData.address,
                        state: profileData.state,
                        description: profileData.description,
                        dob: profileData.dob,
                        language: profileData.language,
                        age: calculateAge(profileData.dob),
                        image: profileData.image, // Set image field
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

        // Validation for phone number (10 digits only)
        if (name === 'phone' && value.length > 10) {
            return;
        }

        // Validate phone number is numeric and 10 digits long
        if (name === 'phone' && (isNaN(value) || value.length !== 10)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: 'Phone number must be 10 digits long',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }

        // Auto-calculate age if date of birth is changed
        if (name === 'dob') {
            const age = calculateAge(value);
            if (age < 18) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    age: 'Age must be at least 18',
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    age: '',
                }));
            }
            setFormValues((prevValues) => ({
                ...prevValues,
                age,
            }));
        }

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); // Set the selected image file
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormValues((prevValues) => ({
                    ...prevValues,
                    image: reader.result, // Update the image preview
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            const uid = localStorage.getItem('uid');
            if (!uid) {
                throw new Error('User ID not found');
            }

            const formData = new FormData();
            formData.append('uid', uid);
            formData.append('first_name', formValues.first_name);
            formData.append('last_name', formValues.last_name);
            formData.append('email', formValues.email);
            formData.append('phone', formValues.phone);
            formData.append('gender', formValues.gender);
            formData.append('zipcode', formValues.zipcode);
            formData.append('address', formValues.address);
            formData.append('state', formValues.state);
            formData.append('age', formValues.age);
            formData.append('dob', formValues.dob);
            formData.append('language', formValues.language);
            formData.append('description', formValues.description);

            if (imageFile) {
                formData.append('image', imageFile); // Append the image file if it exists
            }

            const response = await axios.put('http://134.209.145.149:9999/api/editProfile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

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
                    <Grid container spacing={4} alignItems="center" direction="column">
                        <Grid item>
                            <Avatar
                                src={formValues.image || "/path/to/avatar.jpg"} // Use formValues.image
                                sx={{
                                    width: 120,
                                    height: 120,
                                    bgcolor: 'primary.main',
                                    fontSize: 50,
                                    marginBottom: 2,
                                    cursor: editMode ? 'pointer' : 'default', // Disable cursor pointer when not in edit mode
                                }}
                                onClick={editMode ? () => fileInputRef.current.click() : null} // Only trigger file input on click if in edit mode
                            >
                                {profile.first_name ? profile.first_name.charAt(0) : 'U'}
                            </Avatar>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                                disabled={!editMode} // Disable file input if not in edit mode
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            {editMode ? (
                                <Box>
                                    <Typography variant="h5" gutterBottom>Edit Profile</Typography>
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
                                                type='text'
                                                value={formValues.phone}
                                                onChange={handleInputChange}
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                                error={!!errors.phone}
                                                helperText={errors.phone}
                                            />
                                        </Grid>
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
                                                type='text'
                                                label="Language Known"
                                                name="language"
                                                value={formValues.language}
                                                onChange={handleInputChange}
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Date Of Birth"
                                                name="dob"
                                                type="date"
                                                value={formValues.dob}
                                                onChange={handleInputChange}
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    max: maxDate, // Set max date to 18 years ago
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Age"
                                                name="age"
                                                type="number"
                                                value={formValues.age}
                                                onChange={handleInputChange}
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                                InputProps={{ readOnly: true }}

                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                type='text'
                                                label="State"
                                                name="State"
                                                value={formValues.state}
                                                onChange={handleInputChange}
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                type='text'
                                                label="Zip Code"
                                                name="zipcode"
                                                value={formValues.zipcode}
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
                                                rows={4}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Description"
                                                name="description"
                                                value={formValues.description}
                                                onChange={handleInputChange}
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                                multiline
                                                rows={6}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSave}
                                            sx={{ marginRight: 2 }}
                                        >
                                            Save
                                        </Button>
                                        <Button variant="outlined" onClick={() => setEditMode(false)}>
                                            Cancel
                                        </Button>
                                    </Box>
                                </Box>
                            ) : (

                                <Box>
                                    <Typography variant="h4" gutterBottom>
                                        {profile.first_name} {profile.last_name}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Email:</strong> {profile.email}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Phone:</strong> {profile.phone}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Gender:</strong> {profile.gender}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Zip Code:</strong> {profile.zipcode}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Address:</strong> {profile.address}
                                    </Typography>
                                    <Divider sx={{ marginY: 2 }} />
                                    <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>
                                        Edit Profile
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
