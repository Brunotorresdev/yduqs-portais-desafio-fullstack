'use client';

import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export function NoCardOptionSelected() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        gap: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" component="h1">
        Nenhum curso selecionado
      </Typography>
      <Typography variant="body1">
        Por favor, selecione um curso antes de prosseguir com a inscrição.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => router.push('/page-option')}>
        Voltar para seleção de cursos
      </Button>
    </Box>
  );
}
