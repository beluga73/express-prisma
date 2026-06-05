import { TaskCard } from "../TaskCard";
import { Paper, Box, Chip, Typography, Stack } from "@mui/material";

type Task = {
  id: number;
  title: string;
  position: number;
  columnId: number;
};

type Props = {
  id: number;
  title: string;
  position: number;
  tasks: Task[];
};

export const Column = ({ title, tasks }: Props) => {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        padding: 2,
        width: 300,
        minHeight: 400,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {title}
        </Typography>
        <Chip label={tasks.length} size="small" />
      </Box>
      <Stack spacing={1}>
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </Stack>
    </Paper>
  );
};
