import { useState, type MouseEvent } from "react";
import { observer } from "mobx-react-lite";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useStores } from "@/stores/StoresContext";

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export const Profile = observer(() => {
  const { authStore } = useStores();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    authStore.logout();
  };

  const { user } = authStore;

  return (
    <>
      <IconButton onClick={handleOpen} size="small" sx={{ p: 0.25 }}>
        <Avatar
          sx={{
            width: 38,
            height: 38,
            bgcolor: "primary.main",
            fontSize: "0.95rem",
            fontWeight: 600,
          }}
        >
          {user ? getInitials(user.name) : null}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              mt: 1.5,
              minWidth: 240,
              borderRadius: 2,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
            },
          },
          list: {
            sx: { py: 0 },
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2, py: 1.5 }}>
          <Avatar
            sx={{
              width: 44,
              height: 44,
              bgcolor: "primary.main",
              fontWeight: 600,
            }}
          >
            {user ? getInitials(user.name) : null}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.3 }} noWrap>
              {user?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {user?.email}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ py: 1.25, color: "error.main" }}>
          <ListItemIcon sx={{ color: "inherit" }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
});
