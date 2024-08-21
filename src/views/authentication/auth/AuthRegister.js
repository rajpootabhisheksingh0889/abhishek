import React, { useState } from 'react';
import { Box, Typography, Grid, Modal, Button, TextField } from '@mui/material';
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
        first_name: '',
        last_name: '',
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
    });

    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [userId, setUserId] = useState(null);
    const [otpModalOpen, setOtpModalOpen] = useState(false);
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

        if (!formData.first_name.trim()) {
            errors.first_name = 'First Name is required';
            valid = false;
        }

        if (!formData.last_name.trim()) {
            errors.last_name = 'Last Name is required';
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
            const response = await axios.post('http://134.209.145.149:9999/api/register', {
                ...formData,
                role_id: 4, // Default role_id set to 4
            });

            console.log('Registration successful:', response.data);
            setUserId(response.data.uid);

            toast.success('Registration successful! Please verify the OTP sent to your email.', {
                autoClose: 3000,
            });

            setOtpModalOpen(true); // Open OTP Modal

        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleApiError = (error) => {
        if (error.response) {
            const apiErrors = error.response.data.message;
            const errorMessage = apiErrors.length > 0 ? apiErrors?.message : 'Please try again.';
            toast.error(`Error: ${errorMessage}`);
        } else if (error.request) {
            toast.error('No response from the server. Please try again.');
        } else {
            toast.error(`Error: ${error.message}`);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post('http://134.209.145.149:9999/api/verify-otp', {
                user_id: userId,
                otp_code: otp,
            });

            toast.success('OTP verified successfully! Redirecting to login...', {
                autoClose: 3000,
            });

            setTimeout(() => {
                navigate('/auth/login');
            }, 3000);

        } catch (error) {
            toast.error('OTP verification failed. Please try again.');
        }
    };

    const OtpModal = ({ open, onClose, onVerify, otp, setOtp }) => {
        return (
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="otp-modal-title"
                aria-describedby="otp-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography id="otp-modal-title" variant="h6" component="h2">
                        Enter OTP
                    </Typography>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="6-digit OTP"
                        variant="outlined"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button variant="contained" onClick={onVerify}>
                            Verify
                        </Button>
                        <Button variant="outlined" onClick={onClose}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        );
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
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="first_name" mb="5px">
                            First Name
                        </Typography>
                        <CustomTextField
                            id="first_name"
                            variant="outlined"
                            fullWidth
                            value={formData.first_name}
                            onChange={handleChange}
                            error={!!formErrors.first_name}
                            helperText={formErrors.first_name}
                            autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="last_name" mb="5px">
                            Last Name
                        </Typography>
                        <CustomTextField
                            id="last_name"
                            variant="outlined"
                            fullWidth
                            value={formData.last_name}
                            onChange={handleChange}
                            error={!!formErrors.last_name}
                            helperText={formErrors.last_name}
                            autoComplete="family-name"
                        />
                    </Grid>
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

            <OtpModal
                open={otpModalOpen}
                onClose={() => setOtpModalOpen(false)}
                onVerify={handleVerifyOtp}
                otp={otp}
                setOtp={setOtp}
            />

            {subtitle}
        </>
    );
};

export default AuthRegister;
