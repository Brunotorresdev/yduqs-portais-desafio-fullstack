"use client";

import { Header } from "@/components/layout/Header";
import { Button, Typography } from "@mui/material";

export default function PageOption() {
   return (
    <div>
      <Header />
      <Typography variant="h4" gutterBottom>
        MUI + Next.js funcionando!
      </Typography>
      <Button variant="contained" color="primary">
        Clique aqui
      </Button>
    </div>
  );
}
