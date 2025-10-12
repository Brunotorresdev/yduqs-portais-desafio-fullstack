"use client";

import { Button, Typography } from "@mui/material";

export default function PageOption() {
   return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        MUI + Next.js funcionando!
      </Typography>
      <Button variant="contained" color="primary">
        Clique aqui
      </Button>
    </div>
  );
}
