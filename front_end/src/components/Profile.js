import React, { useState } from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';

import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Box
} from '@mui/material';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Jagdeep',
    email: 'JagdeepKaur@gmail.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically send the updated user data to your server
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset the form to the original user data
    setIsEditing(false);
  };

  return (
    <div>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
                <Typography variant="h4" gutterBottom>
                User Profile
                </Typography>
                <Box component="form" noValidate autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        InputProps={{
                        readOnly: !isEditing
                        }}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        InputProps={{
                        readOnly: !isEditing
                        }}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        InputProps={{
                        readOnly: !isEditing
                        }}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                        InputProps={{
                        readOnly: !isEditing
                        }}
                        variant="outlined"
                    />
                    </Grid>
                </Grid>
                <Box mt={3} display="flex" justifyContent="space-between">
                    {isEditing ? (
                    <>
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        >
                        Save
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleCancel}>
                        Cancel
                        </Button>
                    </>
                    ) : (
                    <Button variant="contained" color="primary" onClick={handleEdit}>
                        Edit
                    </Button>
                    )}
                </Box>
                </Box>
            </Paper>
        </Container>
    </div>
  );
};

export default Profile;
