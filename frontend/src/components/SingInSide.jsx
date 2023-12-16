import React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { Copyright } from './CopyRight'
import { useNavigate } from 'react-router-dom';

export default function SignInSide() {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Extract form data from the event
        const data = new FormData(event.currentTarget);

        try {
            const response = await fetch('https://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.get('email'),
                    password: data.get('password'),
                }),
                credentials: 'include', // include credentials in the request
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const result = await response.json();
            const { token, userId } = result;

            // Save token and userId to local storage
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);

            // Redirect to '/home'
            navigate('/home');

        } catch (error) {
            console.error('Error during authentication:', error.message);
        }
    }

    return (
        <Grid
            container
            component="main"
            sx={{
                height: '0vh',
                width: '60%',
                justifyContent: 'center',
                mt: 15,
                mb: 5,
                mr: 15,
                ml: 40,
            }}
        >
            <CssBaseline />
            <Grid
                item
                xs={0}
                sm={4}
                md={7}
                sx={{
                    backgroundImage:
                        'url(https://pics.craiyon.com/2023-09-14/6bb75488481c43bfb4590dfbcf35c96d.webp)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light'
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '15px',
                }}
            ></Grid>
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                        bgcolor: '#9A1665',
                        color: 'black',
                        padding: '0',
                        boxShadow: '2px 4px 10px rgba(2, 4, 6, 0.1)',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 1, margin: 4 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                bgcolor: 'black',
                                color: 'white',
                                width: '50%',
                                marginLeft: '25%',
                                '&:hover': {
                                    bgcolor: 'pink',
                                },
                            }}
                        >
                            Se connecter
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Mot de passe oublié?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {
                                        "Vous n'avez pas encore de compte? Créez un compte"
                                    }
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}
