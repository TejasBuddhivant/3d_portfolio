"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { navItems } from "@portfolio/config";
import {
  closeMobileNav,
  openMobileNav,
  useAppDispatch,
  useAppSelector,
} from "@portfolio/store";
import { useActiveSection, useScrollToSection } from "@portfolio/hooks";
import { glassTints } from "@portfolio/ui";

const DRAWER_WIDTH = 280;

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const activeSection = useAppSelector((state) => state.ui.activeSection);
  const mobileNavOpen = useAppSelector((state) => state.ui.mobileNavOpen);
  const scrollToSection = useScrollToSection();
  const [scrolled, setScrolled] = useState(false);

  // Keep the navbar indicator in sync with the section in view.
  useActiveSection(navItems.map((item) => item.sectionId));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (
    event: React.MouseEvent<HTMLElement>,
    sectionId: string,
  ) => {
    dispatch(closeMobileNav());
    if (pathname === "/") {
      // Same page: smooth-scroll without a router round-trip.
      event.preventDefault();
      scrollToSection(sectionId);
    }
    // Other pages: let the Link navigate to /#sectionId.
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        backgroundColor: scrolled ? "rgba(0, 0, 0, 0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: "1px solid",
        borderColor: scrolled ? glassTints.border : "transparent",
        transition:
          "background-color 250ms ease, border-color 250ms ease, backdrop-filter 250ms ease",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
          {/* Brand */}
          <Link
            href="/#home"
            aria-label="Go to homepage"
            style={{ textDecoration: "none" }}
            onClick={(event) => handleNavigate(event, "home")}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                aria-hidden
                sx={{
                  width: 38,
                  height: 38,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: glassTints.borderHover,
                  backgroundColor: glassTints.soft,
                  color: "primary.main",
                  fontWeight: 800,
                  fontSize: 14,
                  letterSpacing: "0.05em",
                }}
              >
                TEJ
              </Box>
              <Typography
                variant="subtitle1"
                sx={{ color: "text.primary", fontWeight: 700, display: { xs: "none", sm: "block" } }}
              >
                Tej Buddhivant
              </Typography>
            </Stack>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop navigation */}
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ display: { xs: "none", md: "flex" } }}
            component="nav"
            aria-label="Primary"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <Button
                  key={item.sectionId}
                  component={Link}
                  href={`/#${item.sectionId}`}
                  onClick={(event) => handleNavigate(event, item.sectionId)}
                  aria-current={isActive ? "true" : undefined}
                  sx={{
                    position: "relative",
                    px: 2,
                    color: isActive ? "primary.main" : "text.secondary",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: 14,
                      right: 14,
                      bottom: 7,
                      height: 2,
                      borderRadius: 1,
                      backgroundColor: "primary.main",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 200ms ease",
                    },
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "text.primary",
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Stack>

          {/* Mobile menu trigger */}
          <IconButton
            aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-navigation"
            onClick={() =>
              mobileNavOpen
                ? dispatch(closeMobileNav())
                : dispatch(openMobileNav())
            }
            sx={{
              display: { xs: "inline-flex", md: "none" },
              color: "text.primary",
              transition: "transform 180ms ease",
              "&:hover": { transform: "scale(1.08)", backgroundColor: glassTints.soft },
            }}
            size="large"
          >
            {mobileNavOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile navigation */}
      <Drawer
        id="mobile-navigation"
        anchor="right"
        open={mobileNavOpen}
        onClose={() => dispatch(closeMobileNav())}
        slotProps={{
          paper: {
            sx: {
              width: DRAWER_WIDTH,
              backgroundColor: "rgba(31, 21, 12, 0.97)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderLeft: "1px solid",
              borderColor: glassTints.border,
            },
          },
        }}
      >
        <Box sx={{ px: 2, pt: 3 }}>
          <Typography
            variant="overline"
            sx={{ color: "text.secondary", letterSpacing: "0.25em" }}
          >
            Navigation
          </Typography>
        </Box>
        <List component="nav" aria-label="Mobile" sx={{ px: 1.5, pt: 1 }}>
          {navItems.map((item) => {
            const isActive =
              pathname === "/" && activeSection === item.sectionId;
            return (
              <ListItemButton
                key={item.sectionId}
                component="a"
                href={`/#${item.sectionId}`}
                onClick={(event) => handleNavigate(event, item.sectionId)}
                selected={isActive}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  color: "text.primary",
                  "&.Mui-selected": {
                    backgroundColor: glassTints.soft,
                    borderLeft: "3px solid",
                    borderColor: "primary.main",
                  },
                  "&:hover": { backgroundColor: glassTints.soft },
                }}
              >
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
    </AppBar>
  );
}
