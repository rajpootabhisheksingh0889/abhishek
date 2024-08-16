import React, { useState } from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({ email: '', password: '' });
    const [openForgotPassword, setOpenForgotPassword] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [forgotPasswordErrors, setForgotPasswordErrors] = useState({ email: '' });
    const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleForgotPasswordChange = (e) => {
        const { value } = e.target;
        setForgotPasswordEmail(value);
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
        }

        setFormErrors(errors);
        return valid;
    };

    const validateForgotPasswordForm = () => {
        let valid = true;
        const errors = {};

        if (!forgotPasswordEmail.trim()) {
            errors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(forgotPasswordEmail)) {
            errors.email = 'Email is not valid';
            valid = false;
        }

        setForgotPasswordErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://134.209.145.149:9999/api/login', formData);
            const { token, user } = response.data;

            localStorage.setItem('accessToken', token);
            localStorage.setItem('uid', user.id);
            localStorage.setItem('email', user.email);
            localStorage.setItem('role_id', user.role_id);

            if (user.role_id === 1) {
                navigate('/dashboard');
            } else {
                toast.error('Unauthorized access');
            }
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
    };


    const handleForgotPasswordSubmit = async () => {
        if (!validateForgotPasswordForm()) {
            return;
        }

        setForgotPasswordLoading(true);
        try {
            await axios.post('http://134.209.145.149:9999/api/resetLink', { email: forgotPasswordEmail });
            toast.success('Password reset link sent to your email');
            setOpenForgotPassword(false);
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
            setForgotPasswordLoading(false);
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

            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='email' mb="5px">
                            Email
                        </Typography>
                        <CustomTextField
                            id="email"
                            variant="outlined"
                            fullWidth
                            value={formData.email}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                            autoComplete="email"
                            onChange={handleChange}
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='password' mb="5px">
                            Password
                        </Typography>
                        <CustomTextField
                            id="password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={formData.password}
                            onChange={handleChange}
                            error={!!formErrors.password}
                            helperText={formErrors.password}
                            autoComplete="new-password"
                        />
                    </Box>
                    <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Remember this Device"
                            />
                        </FormGroup>
                        <Typography
                            component="button"
                            onClick={() => setOpenForgotPassword(true)}
                            fontWeight="500"
                            sx={{
                                textDecoration: 'none',
                                color: 'primary.main',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                            }}
                        >
                            Forgot Password?
                        </Typography>
                    </Stack>
                    <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Sign In'}
                    </Button>
                </Stack>
            </form>

            {subtitle}

            <Dialog
                open={openForgotPassword}
                onClose={() => setOpenForgotPassword(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3, p: 2 },
                }}
            >
                <DialogTitle>
                    Forgot Password
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpenForgotPassword(false)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='forgotPasswordEmail' mb="5px">
                            Email
                        </Typography>
                        <CustomTextField
                            id="forgotPasswordEmail"
                            variant="outlined"
                            fullWidth
                            value={forgotPasswordEmail}
                            error={!!forgotPasswordErrors.email}
                            helperText={forgotPasswordErrors.email}
                            autoComplete="email"
                            onChange={handleForgotPasswordChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenForgotPassword(false)}>Cancel</Button>
                    <Button onClick={handleForgotPasswordSubmit} color="primary" disabled={forgotPasswordLoading}>
                        {forgotPasswordLoading ? <CircularProgress size={24} /> : 'Send Reset Link'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AuthLogin;
