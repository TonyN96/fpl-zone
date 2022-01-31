import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../config/firebase";
import GoogleIcon from "@mui/icons-material/Google";
import "./authentication.css";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/gameweek-live");
  }, [user, loading, navigate]);

  return (
    <Box
      className="auth-view"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container component="main" maxWidth="sm">
        <Grid container spacing="10" alignItems="center">
          <Grid item>
            <img
              className="football-icon"
              alt="logo"
              src={`${process.env.PUBLIC_URL}/assets/images/football.png`}
            />
          </Grid>
          <Grid item>
            <Typography component="h1" variant="h1" textAlign="center">
              FPL ZONE
            </Typography>
          </Grid>
        </Grid>
        <Box component="div">
          <TextField
            className="text-input"
            margin="normal"
            id="email"
            required
            name="email"
            autoComplete="email"
            placeholder="Email"
            fullWidth
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="text-input"
            margin="normal"
            id="password"
            required
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={() => logInWithEmailAndPassword(email, password)}
            sx={{ mt: 2 }}
            className="action-button"
            color="secondary"
            fullWidth
            variant="contained"
          >
            Login
          </Button>
          <Button
            color="info"
            onClick={signInWithGoogle}
            sx={{ mt: 2 }}
            className="action-button google-login"
            fullWidth
            variant="contained"
          >
            <GoogleIcon sx={{ mr: 2 }} />
            Login with Google
          </Button>
          <MuiLink
            textAlign="center"
            color="black"
            component="a"
            underline="none"
            href="/reset"
            display="block"
            className="auth-link"
          >
            Forgot Password?
          </MuiLink>
          <MuiLink
            textAlign="center"
            color="black"
            component="a"
            underline="none"
            href="/register"
            display="block"
            className="auth-link"
          >
            Don&apos;t have an account? Click to register.
          </MuiLink>
        </Box>
      </Container>
    </Box>
  );
}
