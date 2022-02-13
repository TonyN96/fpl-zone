import React from "react";
import NavDrawer from "components/nav_drawer/nav_drawer";
import { Box, Container, Typography } from "@mui/material";

interface LayoutProps {
  activeLabel: string;
}

export default function AppLayout(props: React.PropsWithChildren<LayoutProps>): JSX.Element {
  return (
    <Box component="div" sx={{ display: "flex" }}>
      <NavDrawer activeLabel={props.activeLabel} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          maxHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          textAlign="center"
          component="h1"
          variant="h3"
          sx={{ mt: 3, mb: 2, height: "auto" }}
        >
          {props.activeLabel.toUpperCase()}
        </Typography>
        <Container sx={{ flexGrow: "1", mb: 3 }} maxWidth="xl">
          {props.children}
        </Container>
      </Box>
    </Box>
  );
}
