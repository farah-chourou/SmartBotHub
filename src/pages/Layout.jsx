import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

const Layout = () => {
  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#333", color: "white" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {"</> "} SmartBotHub
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          <Button color="inherit" component={Link} to="/ChatTOPDF">
            ChatToPDF
          </Button>
          <Button color="inherit" component={Link} to="/ScriptTranslator">
            TranslateScript
          </Button>
        </Toolbar>
      </AppBar>

      <div sx={{ marginTop: 2, maxWidth: false }}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
