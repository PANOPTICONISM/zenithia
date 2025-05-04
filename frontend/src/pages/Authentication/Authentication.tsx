import LoginIcon from "@mui/icons-material/Login";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
  useMediaQuery
} from "@mui/material";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { postLoginUser, signupUser } from "../../api/authentication";
import { darkBlue, grey, highlight, white } from "../../App";
import { useUserData } from "../../contexts/UserProvider";
import { Logo } from "../../icons/logo";

const emailRegExp = new RegExp(
  `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$`
);

const Authentication = () => {
  const mobileBreakpoint = useMediaQuery("(max-width:600px)");
  const tabletBreakpoint = useMediaQuery("(max-width:900px)");

  const [isLoading, setIsLoading] = React.useState(false);
  const [isEmailError, setIsEmailError] = React.useState<string | undefined>(
    undefined
  );

  const [username, setUsername] = React.useState<string | undefined>(undefined);
  const [password, setPassword] = React.useState<string | undefined>(undefined);
  const [isSignup, setIsSignup] = React.useState(false);

  const [, setUser] = useUserData();

  const recaptchaRef = React.useRef<ReCAPTCHA>(null);
  const handleSubmit = React.useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      setIsLoading(true);

      const recaptchaToken = await recaptchaRef.current?.executeAsync();
      recaptchaRef.current?.reset();

      if (!emailRegExp.test(username || "")) {
        setIsEmailError("Your email is not valid.");
        setIsLoading(false);
        return;
      }

      if (!username || !password || !recaptchaToken) {
        setIsLoading(false);
        return;
      }

      const loginUser = async ({
        isAllowedToLogIn
      }: {
        isAllowedToLogIn: boolean;
      }) => {
        await postLoginUser({
          username,
          password,
          isAllowedToLogIn,
          recaptchaToken
        })
          .then((data) => {
            setUser({
              id: data.id,
              username: data.email.split("@")[0],
              token: data.token
            });
            setIsLoading(false);
          })
          .catch((error) => {
            toast.error(String(error));
            setIsLoading(false);
          });
      };

      if (!isSignup) {
        return loginUser({ isAllowedToLogIn: false });
      }

      return signupUser({
        username,
        password,
        recaptchaToken
      })
        .then(() => {
          toast.success("Your account has been created.");
          loginUser({ isAllowedToLogIn: true });
        })
        .catch((error) => {
          toast.error(String(error));
          setIsLoading(false);
        });
    },
    [username, password, isSignup, setUser]
  );

  return (
    <Stack
      sx={{
        height: tabletBreakpoint ? "auto" : "100vh",
        background: darkBlue,
        padding: mobileBreakpoint ? 0 : "50px"
      }}
      justifyContent="center"
      alignItems="center">
      <Grid
        container
        sx={{
          height: tabletBreakpoint ? "auto" : "80%",
          width: tabletBreakpoint ? "auto" : "80%"
        }}>
        <Grid
          size={{
            xs: 12,
            md: 6
          }}
          sx={{
            background: highlight,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "50px 0"
          }}>
          <Logo color={white} background={highlight} width={180} height={180} />
          <Typography variant="h1" color={grey} fontWeight={300}>
            Zenithia
          </Typography>
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 6
          }}
          sx={{
            backgroundImage: "url(/background-image.png)",
            backgroundRepeat: "no-repeat",
            backgroundColor: highlight,
            backgroundSize: "contain",
            backgroundPosition: "center"
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0, 87, 145, 0.8)",
              width: "100%",
              height: tabletBreakpoint ? "auto" : "100%",
              padding: tabletBreakpoint ? "50px 0" : "0"
            }}>
            <Typography
              variant="h2"
              color={white}
              fontWeight={700}
              fontFamily="'DM Sans', sans-serif">
              {isSignup ? "Sign up" : "Login"}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, color: white, padding: "0 60px" }}>
              <TextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                error={isEmailError !== undefined}
                helperText={isEmailError}
                autoComplete="email"
                onChange={(e) => setUsername(e.target.value)}
                sx={{ input: { color: white } }}
                InputLabelProps={{
                  style: { color: white }
                }}
              />
              <TextField
                margin="normal"
                variant="filled"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                sx={{ input: { color: white }, margin: "8px 0" }}
                InputLabelProps={{
                  style: { color: white }
                }}
              />
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || ""}
                size="invisible"
                style={{ margin: "10px 0" }}
              />
              <Button
                disabled={isLoading || !username || !password}
                type="submit"
                fullWidth
                variant="contained"
                startIcon={
                  isLoading ? (
                    <CircularProgress color="info" size={20} />
                  ) : (
                    <LoginIcon />
                  )
                }
                sx={{
                  background: darkBlue,
                  "&.Mui-disabled": {
                    background: "#474747"
                  }
                }}>
                {isSignup ? "Create account" : "Login"}
              </Button>
              <Grid container justifyContent="end" marginTop="6px">
                {isSignup ? (
                  <Grid>
                    {"Have an account already? "}
                    <Link
                      onClick={() => setIsSignup(false)}
                      variant="body2"
                      sx={{
                        cursor: "pointer",
                        color: white,
                        textDecoration: "underline"
                      }}>
                      {"Login."}
                    </Link>
                  </Grid>
                ) : (
                  <Grid>
                    {"Don't have an account? "}
                    <Link
                      onClick={() => setIsSignup(true)}
                      variant="body2"
                      sx={{
                        cursor: "pointer",
                        color: white,
                        textDecoration: "underline"
                      }}>
                      {"Sign up."}
                    </Link>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Authentication;
