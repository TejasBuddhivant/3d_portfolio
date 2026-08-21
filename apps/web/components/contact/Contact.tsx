"use client";

import { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SendIcon from "@mui/icons-material/Send";
import { siteConfig } from "@portfolio/config";
import {
  GlassCard,
  GradientButton,
  Reveal,
  SectionTitle,
  glassTints,
} from "@portfolio/ui";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactChannels = [
  {
    icon: EmailOutlinedIcon,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "in/TejasBuddhivant",
    href: "https://www.linkedin.com/in/tejas-buddhivant",
  },
  {
    icon: GitHubIcon,
    label: "GitHub",
    value: "TejasBuddhivant",
    href: "https://github.com/TejasBuddhivant",
  },
  {
    icon: LocationOnOutlinedIcon,
    label: "Location",
    value: siteConfig.location,
  },
] as const;

function validate(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [sent, setSent] = useState(false);

  const handleChange =
    (field: keyof ContactFormValues) =>
      (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValues((previous) => ({ ...previous, [field]: event.target.value }));
        // Clear the field error as soon as the user starts fixing it.
        setErrors((previous) => ({ ...previous, [field]: undefined }));
        setSent(false);
      };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // No backend here — compose the message in the visitor's mail client.
    const subject = encodeURIComponent(`Portfolio contact from ${values.name.trim()}`);
    const body = encodeURIComponent(
      `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`,
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Box
      component="section"
      id="contact"
      aria-label="Contact"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "rgba(31, 21, 12, 0.35)",
      }}
    >
      <Container maxWidth="lg">
        <Reveal>
          <SectionTitle
            overline="Get In Touch"
            title="Let's Build Something Together"
            subtitle="Have a role, project or idea in mind? My inbox is always open."
          />
        </Reveal>

        <Grid container spacing={{ xs: 4, md: 5 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Reveal>
              <Stack spacing={2}>
                {contactChannels.map(({ icon: Icon, label, value, href }) => (
                  <GlassCard
                    key={label}
                    interactive
                    sx={{ p: 2.25 }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      component={href ? "a" : "div"}
                      {...(href
                        ? {
                          href,
                          target: href.startsWith("http") ? "_blank" : undefined,
                          rel: href?.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined,
                        }
                        : {})}
                    >
                      <Box
                        aria-hidden
                        sx={{
                          width: 42,
                          height: 42,
                          display: "grid",
                          placeItems: "center",
                          borderRadius: 2,
                          border: "1px solid",
                          borderColor: glassTints.border,
                          backgroundColor: glassTints.subtle,
                          color: "primary.main",
                          flexShrink: 0,
                        }}
                      >
                        <Icon fontSize="small" />
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary", display: "block" }}
                        >
                          {label}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {value}
                        </Typography>
                      </Box>
                    </Stack>
                  </GlassCard>
                ))}
              </Stack>
            </Reveal>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Reveal delay={120}>
              <GlassCard sx={{ p: { xs: 3, md: 4 } }}>
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2.5}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        id="contact-name"
                        name="name"
                        label="Name"
                        autoComplete="name"
                        fullWidth
                        required
                        value={values.name}
                        onChange={handleChange("name")}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        id="contact-email"
                        name="email"
                        type="email"
                        label="Email"
                        autoComplete="email"
                        fullWidth
                        required
                        value={values.email}
                        onChange={handleChange("email")}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        id="contact-message"
                        name="message"
                        label="Message"
                        multiline
                        rows={5}
                        fullWidth
                        required
                        value={values.message}
                        onChange={handleChange("message")}
                        error={Boolean(errors.message)}
                        helperText={errors.message}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <GradientButton
                        type="submit"
                        variantStyle="solid"
                        endIcon={<SendIcon />}
                        fullWidth
                        aria-label="Send message via your email client"
                      >
                        Send Message
                      </GradientButton>
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          mt: 1.5,
                          textAlign: "center",
                          color: "text.secondary",
                        }}
                      >
                        This form opens your own email client with the message
                        pre-filled — nothing is stored on a server.
                      </Typography>
                    </Grid>
                  </Grid>
                </form>

                {sent ? (
                  <Alert severity="success" sx={{ mt: 3 }}>
                    Your email client should open now. If it didn&apos;t, reach me
                    directly at{" "}
                    <Link href={`mailto:${siteConfig.email}`} sx={{ fontWeight: 600 }}>
                      {siteConfig.email}
                    </Link>
                    .
                  </Alert>
                ) : null}
              </GlassCard>
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
