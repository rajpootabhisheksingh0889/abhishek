import React, { useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import 'react-toastify/dist/ReactToastify.css';

const AuthRegister = ({ title, subtitle, subtext }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        otp: '',
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
        otp: '',
    });

    const [otpSent, setOtpSent] = useState(false);
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
        if (otpSent && !formData.otp.trim()) {
            errors.otp = 'OTP is required';
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

        try {
            const response = await axios.post('http://134.209.145.149:9999/api/register', formData);
            console.log('Registration successful:', response.data);
            navigate('/auth/login');
        } catch (error) {
            if (error.response) {
                const apiErrors = error.response.data.errors;
                if (apiErrors && apiErrors.length > 0) {
                    const errorMessage = apiErrors[0].message || 'An error occurred. Please try again.';
                    console.log("errorMessage", errorMessage)
                    toast.error(errorMessage);
                } else {
                    toast.error('An error occurred. Please try again.');
                }
            } else if (error.request) {
                toast.error('No response from server. Please try again later.');
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    const handleSendOtp = async () => {
        if (!formData.email.trim()) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Email is required to send OTP',
            }));
            return;
        }

        try {
            await axios.post('http://134.209.145.149:9999/api/otp', { email: formData.email });
            toast.success('OTP sent to your email');
            setOtpSent(true);
        } catch (error) {
            toast.error('Failed to send OTP. Please try again.');
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
                    <Grid item xs={12} sm={12}>
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
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={handleSendOtp}
                            sx={{ mt: 1, float: 'right' }}
                            disabled={otpSent}
                        >
                            Send OTP
                        </Button>

                    </Grid>
                    {otpSent && (
                        <Grid item xs={12} sm={12}>
                            <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="otp" mb="5px">
                                OTP
                            </Typography>
                            <CustomTextField
                                id="otp"
                                variant="outlined"
                                fullWidth
                                value={formData.otp}
                                onChange={handleChange}
                                error={!!formErrors.otp}
                                helperText={formErrors.otp}
                            />
                        </Grid>
                    )}
                    <Grid item xs={12} sm={12}>
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
                <Button color="primary" variant="contained" size="large" fullWidth type="submit" disabled={!otpSent}>
                    Sign Up
                </Button>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthRegister;
