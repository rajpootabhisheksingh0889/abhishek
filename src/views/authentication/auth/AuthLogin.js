import React, { useState } from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox,
    CircularProgress
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });
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
        // setLoading(true);
       

        if (!validateForm()) {
            return;
        }

        

        try {
            const response = await axios.post('http://134.209.145.149:9999/api/login', formData);
            const { user_type, accessToken, id } = response.data;
            localStorage.setItem('user_type', user_type);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('uid', id);

            if (user_type === 'AD') {
                navigate('/dashboard');
            } else if (user_type === 'CU') {
                navigate('/dashboard');
            } else if (user_type === 'AG') {
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.response) {
                // Extract and display the error message from the response
                const apiErrors = error.response.data.errors;
                if (apiErrors && apiErrors.length > 0) {
                    const errorMessage = apiErrors[0].message || 'An error occurred. Please try again.';
                    console.log("errorMessage", errorMessage)
                    toast.error(errorMessage);
                } else {
                    toast.error('An error occurred. Please try again.');
                }
            } else if (error.request) {
                // The request was made but no response was received
                toast.error('No response from server. Please try again later.');
            } else {
                // Something happened in setting up the request that triggered an Error
                toast.error('An error occurred. Please try again.');
            }
        } finally {
            // setLoading(false);
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
                            type="text"
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
                            component={Link}
                            to="/forgot-password"
                            fontWeight="500"
                            sx={{
                                textDecoration: 'none',
                                color: 'primary.main',
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

            <ToastContainer />
        </>
    );
};

export default AuthLogin;
