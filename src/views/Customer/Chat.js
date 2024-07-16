import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper, List, ListItem, ListItemText, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSendMessage = () => {
        if (input.trim() !== '') {
            setMessages([...messages, { text: input, sender: 'You' }]);
            setInput('');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Chat
            </Typography>
            <Paper sx={{ flex: 1, overflow: 'auto', marginBottom: 2 }}>
                <List>
                    {messages.map((message, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={message.sender} secondary={message.text} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <Box sx={{ display: 'flex' }}>
                <TextField
                    variant="outlined"
                    placeholder="Type a message"
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <IconButton color="primary" onClick={handleSendMessage}>
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Chat;
