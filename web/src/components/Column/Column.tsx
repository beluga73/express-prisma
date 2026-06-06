import { useDroppable } from "@dnd-kit/react";
import { Paper, Box, Chip, Typography, Stack } from "@mui/material";
import { TaskCard } from "../TaskCard";
import type { Column as ColumnType } from "@/types/schema";

type Props = {
  column: ColumnType;
};

export const Column = ({ column }: Props) => {
  const { ref, isDropTarget } = useDroppable({
    id: column.id,
    data: { columnId: column.id },
  });

  return (
    <Paper
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        p: 2,
        width: 300,
        minHeight: 400,
        transition: "background-color 0.15s",
        bgcolor: isDropTarget ? "action.hover" : "background.paper",
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
          {column.title}
        </Typography>
        <Chip label={column.tasks.length} size="small" />
      </Box>
      <Stack spacing={1}>
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Stack>
    </Paper>
  );
};
