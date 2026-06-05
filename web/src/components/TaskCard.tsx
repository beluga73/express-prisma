import { Card, Typography } from "@mui/material";

type Props = {
  id: number;
  title: string;
  position: number;
  columnId: number;
};

export const TaskCard = ({ title }: Props) => {
  return (
    <Card
      sx={{
        cursor: "grab",
        transition: "border-color 0.2s, box-shadow 0.2s",
        "&:hover": {
          boxShadow: 1,
        },
        "&:active": {
          cursor: "grabbing",
        },
      }}
    >
      <Typography variant="body2">{title}</Typography>
    </Card>
  );
};
