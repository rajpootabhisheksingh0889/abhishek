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
    Rating
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { styled } from '@mui/system';
import 'react-toastify/dist/ReactToastify.css';

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
        postal_code: '',
        address_line_1: '',
        city: '',
        description: '',
        dob: '',
        language: '',
        age: '',
        // image: '',
        // gallery: []
    });
    const [imageFile, setImageFile] = useState(null);
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const galleryInputRef = useRef(null);

    const currentDate = new Date();
    const maxDate = new Date(
        currentDate.getFullYear() - 18,
        currentDate.getMonth(),
        currentDate.getDate()
    ).toISOString().split('T')[0];

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
                const response = await axios.get(`http://134.209.145.149:9999/api/user-info?user_id=${uid}`);
                if (response.data) {
                    const profileData = response.data;

                    // Handle null or undefined values
                    setProfile(profileData);
                    setFormValues({
                        first_name: profileData.first_name || '',
                        last_name: profileData.last_name || '',
                        email: profileData.email || '',
                        phone: profileData.phone || '',
                        gender: profileData.gender || '',
                        postal_code: profileData.postal_code || '',
                        address_line_1: profileData.address_line_1 || '',
                        city: profileData.city || '',
                        description: profileData.description || '',
                        dob: profileData.dob || '',
                        language: profileData.language || '',
                        age: profileData.dob ? calculateAge(profileData.dob) : '',
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

        if (name === 'phone' && value.length > 10) {
            return;
        }

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
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormValues((prevValues) => ({
                    ...prevValues,
                    image: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setGalleryFiles(files);
            const newGallery = [...formValues.gallery];
            files.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newGallery.push(reader.result);
                    setFormValues((prevValues) => ({
                        ...prevValues,
                        gallery: newGallery,
                    }));
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleSave = async () => {
        try {
            const uid = localStorage.getItem('uid');
            if (!uid) {
                throw new Error('User ID not found');
            }

            const formData = {
                uid: uid,
                first_name: formValues.first_name,
                last_name: formValues.last_name,
                email: formValues.email,
                phone: formValues.phone,
                gender: formValues.gender,
                postal_code: formValues.postal_code,
                address_line_1: formValues.address_line_1,
                city: formValues.city,
                age: formValues.age,
                dob: formValues.dob,
                language: formValues.language,
                description: formValues.description,
                // image: formValues.image, // Send image URL
                // gallery: formValues.gallery.map(image => image), // Ensure gallery is an array of URLs
            };

            const response = await axios.put(`http://134.209.145.149:9999/api/users/${uid}`, formData);

            if (response.data) {
                setProfile(formValues);
                setEditMode(false);
                toast.success('Profile updated successfully!');
                setTimeout(() => {
                    navigate('/profile');
                }, 3000);
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
                                src={formValues.image || "/path/to/avatar.jpg"}
                                sx={{
                                    width: 120,
                                    height: 120,
                                    bgcolor: 'primary.main',
                                    fontSize: 50,
                                    marginBottom: 2,
                                    cursor: editMode ? 'pointer' : 'default',
                                }}
                                onClick={editMode ? () => fileInputRef.current.click() : null}
                            >
                                {profile.first_name ? profile.first_name.charAt(0) : 'U'}
                            </Avatar>
                            {/* <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                                disabled={!editMode}
                            /> */}
                        </Grid>
                        <Grid container spacing={2} alignItems="center" direction="column">
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant="body1">
                                    <strong>Rating:</strong>
                                </Typography>
                                <Rating value={4} readOnly />
                            </Grid>
                        </Grid>
                        {editMode ? (
                            <>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            name="first_name"
                                            label="First Name"
                                            value={formValues.first_name}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.first_name}
                                            helperText={errors.first_name}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            name="last_name"
                                            label="Last Name"
                                            value={formValues.last_name}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.last_name}
                                            helperText={errors.last_name}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            name="email"
                                            label="Email"
                                            value={formValues.email}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.email}
                                            helperText={errors.email}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            name="phone"
                                            label="Phone"
                                            value={formValues.phone}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.phone}
                                            helperText={errors.phone}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            name="gender"
                                            label="Gender"
                                            value={formValues.gender}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.gender}
                                            helperText={errors.gender}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            name="postal_code"
                                            label="Postal code"
                                            value={formValues.postal_code}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.postal_code}
                                            helperText={errors.postal_code}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            name="address_line_1"
                                            label="Address1"
                                            value={formValues.address_line_1}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.address_line_1}
                                            helperText={errors.address_line_1}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            name="city"
                                            label="City"
                                            value={formValues.city}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.city}
                                            helperText={errors.city}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            name="dob"
                                            label="Date of Birth"
                                            type="date"
                                            value={formValues.dob}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                max: maxDate,
                                            }}
                                            error={!!errors.dob}
                                            helperText={errors.dob}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            name="language"
                                            label="Language"
                                            value={formValues.language}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.language}
                                            helperText={errors.language}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            name="description"
                                            label="Description"
                                            value={formValues.description}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.description}
                                            helperText={errors.description}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            name="age"
                                            label="Age"
                                            value={formValues.age}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.age}
                                            helperText={errors.age}
                                            disabled
                                        />
                                    </Grid>
                                </Grid>
                                {/* <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography>Gallery</Typography>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            ref={galleryInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleGalleryChange}
                                            disabled={!editMode}
                                        />
                                        <Button
                                            variant="outlined"
                                            onClick={() => galleryInputRef.current.click()}
                                            disabled={!editMode}
                                        >
                                            Upload Gallery Images
                                        </Button>
                                        <Grid container spacing={2}>
                                            {formValues.gallery.map((image, index) => (
                                                <Grid item key={index}>
                                                    <img
                                                        src={image}
                                                        alt={`gallery ${index}`}
                                                        style={{ width: 100, height: 100 }}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </Grid> */}
                                <Grid item xs={12} style={{ textAlign: 'center' }}>
                                    <Button variant="contained" color="primary" onClick={handleSave}>
                                        Save
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => setEditMode(false)}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                            <strong>First Name:</strong> {profile.first_name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                            <strong>Last Name:</strong> {profile.last_name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                            <strong>Email:</strong> {profile.email}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                            <strong>Phone:</strong> {profile.phone}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                            <strong>Gender:</strong> {profile.gender}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                                <strong>Zipcode:</strong> {profile.postal_code}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                                <strong>Address:</strong> {profile.address_line1}
                                        </Typography>
                                    </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Typography variant="body1">
                                                <strong>Address 2:</strong> {profile.address_line2}
                                            </Typography>
                                        </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                                <strong>City:</strong> {profile.city}
                                        </Typography>
                                    </Grid>
                                   
                                </Grid>
                                <Grid item container spacing={2}>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Typography variant="body1">
                                                <strong>Date of Birth:</strong> {profile.dob}
                                            </Typography>
                                        </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                            <strong>Age:</strong> {profile.age}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                            <strong>Language:</strong> {profile.language}
                                        </Typography>
                                    </Grid>
                                   
                                    </Grid>
                                    <Grid item container spacing={2}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="body1">
                                        <strong>Description:</strong> {profile.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                               
                                <Box display="flex" justifyContent="center" mt={2}>
                                    <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>
                                        Edit
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Grid>
                </CardContent>
            </AnimatedCard>
        </Container>
    );
};

export default MyProfile;




