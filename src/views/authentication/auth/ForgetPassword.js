import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Container, CircularProgress, Avatar } from '@mui/material';
import { toast } from 'react-toastify';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const ForgetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { data1 } = useParams();
    const secretKey = 'itsmehere';
    const [decryptedData, setDecryptedData] = useState(null);

    useEffect(() => {
        try {
            // Function to decrypt data
            const decryptData = (data1, key) => {
                const bytes = CryptoJS.AES.decrypt(data1, key);
                return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            };

            // Decrypt the data
            const decodedData = decryptData(decodeURIComponent(data1), secretKey);
            console.log(decodedData[0].email, "decrypted data is ===>>>");
            setDecryptedData(decodedData);
        } catch (error) {
            console.error('Decryption error:', error);
            toast.error('Invalid or corrupted reset link.');
        }
    }, [data1]);

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (newPassword !== confirmPassword) {
            setLoading(false);
            toast.error('Passwords do not match');
            return;
        }

        try {
            // Replace with your API call
            const response = await fetch('http://134.209.145.149:9999/api/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword, email: decryptedData[0].email}), // Include decrypted data in the request
            });

            const result = await response.json();
            setLoading(false);

            if (response.ok) {
                toast.success('Password reset successfully');
            } else {
                toast.error(result.message || 'Something went wrong');
            }
        } catch (error) {
            setLoading(false);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 3,
                    backgroundColor: '#f7f7f7',
                    borderRadius: 2,
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                {decryptedData ? (
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm New Password"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Reset Password'}
                        </Button>
                    </Box>
                ) : (
                    <Typography variant="body1" color="error">
                        Invalid or corrupted reset link.
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default ForgetPassword;
