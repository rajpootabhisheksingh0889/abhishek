import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

const AuthRegister = ({ title, subtitle, subtext }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9999/api/register', formData);
            console.log('Registration successful:', response.data);
            navigate('/auth/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('Registration failed:', error);
            // Handle error (e.g., show a notification or error message)
        }
    };

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Box component="form" onSubmit={handleSubmit}>
                <Stack mb={3}>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="first_name" mb="5px">
                        First Name
                    </Typography>
                    <CustomTextField id="first_name" variant="outlined" fullWidth value={formData.first_name} onChange={handleChange} />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="last_name" mb="5px" mt="25px">
                        Last Name
                    </Typography>
                    <CustomTextField id="last_name" variant="outlined" fullWidth value={formData.last_name} onChange={handleChange} />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px" mt="25px">
                        Email Address
                    </Typography>
                    <CustomTextField id="email" variant="outlined" fullWidth value={formData.email} onChange={handleChange} />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px" mt="25px">
                        Password
                    </Typography>
                    <CustomTextField id="password" variant="outlined" fullWidth value={formData.password} onChange={handleChange} />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="phone" mb="5px" mt="25px">
                        Phone
                    </Typography>
                    <CustomTextField id="phone" variant="outlined" fullWidth value={formData.phone} onChange={handleChange} />
                </Stack>
                <Button color="primary" variant="contained" size="large" fullWidth type="submit">
                    Sign Up
                </Button>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthRegister;
