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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
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
        }

        setFormErrors(errors);
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

            // Navigate based on the role_id
            switch (user.role_id) {
                case 1:
                    navigate('/dashboard');
                    break;
                case 2:
                    navigate('/dashboard');
                    break;
                case 3:
                    navigate('/dashboard');
                    break;
                case 4:
                    navigate('/dashboard');
                    break;
                default:
                    Swal.fire({
                        icon: 'error',
                        title: 'Unauthorized Access',
                        text: 'You do not have permission to access this page.',
                    });
                    break;
            }
        } catch (error) {
            let errorMessage = 'An error occurred. Please try again.';
            if (error.response) {
                const apiErrors = error.response.data.errors;
                if (apiErrors) {
                    // If apiErrors is an array of error objects
                    if (Array.isArray(apiErrors)) {
                        errorMessage = apiErrors.map(err => err.message).join(' ') || errorMessage;
                    } else if (typeof apiErrors === 'object') {
                        errorMessage = Object.values(apiErrors).join(' ') || errorMessage;
                    } else {
                        errorMessage = 'An error occurred. Please try again.';
                    }
                } else {
                    errorMessage = error.response.data.message || errorMessage;
                }
            } else if (error.request) {
                errorMessage = 'No response from server. Please try again later.';
            }
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {title && (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            )}

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
                            onClick={() => navigate('/auth/forget')}
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
        </>
    );
};

export default AuthLogin;
