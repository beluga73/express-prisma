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
  signUpFormSchema,
  type SignUpFormValues,
} from "@/schemas/auth.schema";

const SignUp = observer(() => {
  const { authStore } = useStores();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = async ({ name, email, password }: SignUpFormValues) => {
    await authStore.signUp({ name, email, password });

    const error = authStore.signUpState.error;
    if (!error) {
      navigate("/");
      return;
    }

    if (error.code === "EMAIL_ALREADY_EXISTS") {
      setError("email", { type: "server", message: error.message });
      return;
    }

    if (error.code === "INVALID_REQUEST" && "errors" in error) {
      for (const fieldError of error.errors) {
        const field = fieldError.path?.[0];
        if (field === "name" || field === "email" || field === "password") {
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
              Create an account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign up to start organizing your tasks.
            </Typography>
          </Box>

          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <TextField
              label="Name"
              autoComplete="name"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register("name")}
            />
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
              autoComplete="new-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
            />
            <TextField
              label="Confirm password"
              type="password"
              autoComplete="new-password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              loading={authStore.signUpState.loading}
            >
              Sign up
            </Button>
          </Stack>

          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <Link component={RouterLink} to="/sign-in">
              Sign in
            </Link>
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
});

export default SignUp;
