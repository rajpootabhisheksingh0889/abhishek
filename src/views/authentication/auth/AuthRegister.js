import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import 'react-toastify/dist/ReactToastify.css';

const AuthRegister = ({ title, subtitle, subtext }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const validateForm = () => {
        let valid = true;
        const errors = {};

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is not valid';
            valid = false;
        }

        if (!formData.password.trim()) {
            errors.password = 'Password is required';
            valid = false;
        } else if (!/(?=.*[A-Za-z])(?=.*\W).{6,}/.test(formData.password)) {
            errors.password = 'Password must contain at least one alphabet, one special character, and be at least 6 characters long';
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        handleRegister();
    };

    const handleRegister = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://134.209.145.149:9999/api/register', formData);
            console.log('Registration successful:', response.data);

            // Show success toast notification
            toast.success('Registration successful! Redirecting to login...', {
                autoClose: 3000, // Toast will close after 3 seconds
            });

            // Redirect after 3 seconds
            setTimeout(() => {
                navigate('/auth/login');
            }, 3000);
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleApiError = (error) => {
        if (error.response) {
            const apiErrors = error.response.data.errors;
            const errorMessage = apiErrors.length > 0 ? apiErrors[0].message : 'Please try again.';
            toast.error(`Error: ${errorMessage}`);
        } else if (error.request) {
            toast.error('No response from the server. Please try again.');
        } else {
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <>
            <ToastContainer />
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    maxWidth: '800px',
                    mx: 'auto',
                    p: 2,
                    borderRadius: 4,
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#ffffff',
                    '& > :not(style)': { mb: 3 },
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px">
                            Email Address
                        </Typography>
                        <CustomTextField
                            id="email"
                            variant="outlined"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px">
                            Password
                        </Typography>
                        <CustomTextField
                            id="password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!formErrors.password}
                            helperText={formErrors.password}
                            autoComplete="new-password"
                        />
                    </Grid>
                </Grid>
                <LoadingButton
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    loading={loading}
                    name="signUp"
                >
                    Sign Up
                </LoadingButton>
            </Box>

            {subtitle}
        </>
    );
};

export default AuthRegister;
