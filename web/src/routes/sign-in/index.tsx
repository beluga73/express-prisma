import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink, useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import {
  Box,
  Button,
  Card,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useStores } from "@/stores/StoresContext";
import {
  signInFormSchema,
  type SignInFormValues,
} from "@/schemas/auth.schema";

const SignIn = observer(() => {
  const { authStore } = useStores();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = async ({ email, password }: SignInFormValues) => {
    await authStore.signIn({ email, password });

    const error = authStore.signInState.error;
    if (!error) {
      navigate("/");
      return;
    }

    if (error.code === "INVALID_CREDENTIALS") {
      setError("password", { type: "server", message: error.message });
      return;
    }

    if (error.code === "INVALID_REQUEST" && "errors" in error) {
      for (const fieldError of error.errors) {
        const field = fieldError.path?.[0];
        if (field === "email" || field === "password") {
          setError(field, { type: "server", message: fieldError.message });
        }
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        px: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 400, p: 4 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Welcome back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to access your boards.
            </Typography>
          </Box>

          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <TextField
              label="Email"
              type="email"
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />
            <TextField
              label="Password"
              type="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              loading={authStore.signInState.loading}
            >
              Sign in
            </Button>
          </Stack>

          <Typography variant="body2" align="center">
            Don't have an account?{" "}
            <Link component={RouterLink} to="/sign-up">
              Sign up
            </Link>
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
});

export default SignIn;
