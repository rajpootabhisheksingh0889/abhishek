import React, { useState } from 'react';
import { Box, Typography, Grid, Modal } from '@mui/material';
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
        otp: '',
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
        otp: '',
    });

    const [otpSent, setOtpSent] = useState(false);
    const [openModal, setOpenModal] = useState(false);
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
        if (otpSent) {
            if (!formData.password.trim()) {
                errors.password = 'Password is required';
                valid = false;
            } else if (!/(?=.*[A-Za-z])(?=.*\W).{6,}/.test(formData.password)) {
                errors.password = 'Password must contain at least one alphabet, one special character, and be at least 6 characters long';
                valid = false;
            }
            if (!formData.otp.trim()) {
                errors.otp = 'OTP is required';
                valid = false;
            }
        }

        setFormErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (!otpSent) {
            handleSendOtp();
        } else {
            setLoading(true);
            try {
                const response = await axios.post('http://134.209.145.149:9999/api/register', formData);
                console.log('Registration successful:', response.data);
                navigate('/auth/login');
            } catch (error) {
                if (error.response) {
                    const apiErrors = error.response.data.errors;
                    if (apiErrors && apiErrors.length > 0) {
                        const errorMessage = apiErrors[0].message || 'An error occurred. Please try again.';
                        toast.error(errorMessage);
                    } else {
                        toast.error('An error occurred. Please try again.');
                    }
                } else if (error.request) {
                    toast.error('No response from server. Please try again later.');
                } else {
                    toast.error('An error occurred. Please try again.');
                }
            } finally {
                setLoading(false);
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

        setLoading(true);
        try {
            await axios.post('http://134.209.145.149:9999/api/otp', { email: formData.email });
            toast.success('OTP sent to your email');
            setOtpSent(true);
            setOpenModal(true);
        } catch (error) {
            if (error.response) {
                // Extract the specific error message from the API response
                const apiErrors = error.response.data.errors;
                const errorMessage = apiErrors.length > 0 ? apiErrors[0].message : 'Please try again.';
                toast.error(`Failed to send OTP: ${errorMessage}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
                toast.error('No response from the server. Please try again.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
                toast.error(`Error: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        setOpenModal(false);
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
                </Grid>
                <LoadingButton
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    loading={loading}
                >
                    Sign Up
                </LoadingButton>
            </Box>

            <Modal
                open={openModal}
                onClose={handleModalClose}
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
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="otp-modal-title" variant="h6" component="h2">
                        Enter OTP and Password
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 2 }}
                    >
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
                        <LoadingButton
                            color="primary"
                            variant="contained"
                            size="large"
                            fullWidth
                            type="submit"
                            loading={loading}
                            sx={{ mt: 2 }}
                        >
                            Confirm Registration
                        </LoadingButton>
                    </Box>
                </Box>
            </Modal>
            {subtitle}
        </>
    );
};

export default AuthRegister;
