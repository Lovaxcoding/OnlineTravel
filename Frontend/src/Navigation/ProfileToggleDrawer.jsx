import React from 'react';
import { Drawer, Box, Avatar, Typography, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const ProfileToggleDrawer = ({ open, toggle, user }) => {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={toggle}
            sx={{
                width: open ? (user.role === 'USER' ? '40%' : '20%') : 0,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: open ? (user.role === 'USER' ? '40%' : '20%') : 0,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Box sx={{ padding: 2 }}>
                <Avatar alt={user.username} src={user.avatar || '/default-avatar.png'} sx={{ width: 100, height: 100, marginBottom: 2 }} />
                <Typography variant="h6">{user.username}</Typography>
                <Typography variant="body2" color="textSecondary">{user.email}</Typography>
                <Divider sx={{ marginY: 2 }} />

                <Link to={`/profile/${user.id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" fullWidth sx={{ marginBottom: 1 }}>Voir Profil</Button>
                </Link>
                <Button variant="outlined" fullWidth onClick={toggle}>Fermer</Button>
            </Box>
        </Drawer>
    );
};

export default ProfileToggleDrawer ;
