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
        padding: 2,
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        textAlign="center"
        sx={{
          fontFamily: '"Inter", "Roboto", sans-serif',
          fontWeight: 600,
        }}
      >
        Nenhuma opção de curso selecionada
      </Typography>

      <Typography
        textAlign="center"
        sx={{
          color: '#666',
          fontSize: '1rem',
          maxWidth: '80%',
        }}
      >
        Por favor, selecione uma opção de curso antes de prosseguir com a matrícula.
      </Typography>

      <Button
        variant="contained"
        onClick={() => router.push('/page-option')}
        sx={{
          backgroundColor: '#FF3D5B',
          color: '#FFF',
          borderRadius: '12px',
          textTransform: 'none',
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 500,
          '&:hover': {
            backgroundColor: '#E73350',
          },
          fontFamily: '"Inter", "Roboto", sans-serif',
        }}
      >
        Voltar para seleção de cursos
      </Button>
    </Box>
  );
}
