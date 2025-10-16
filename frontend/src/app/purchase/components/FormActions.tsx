'use client';

import { Box, Button } from '@mui/material';

interface FormActionsProps {
  isSubmitting: boolean;
  isPending: boolean;
  isValid: boolean;
  isDirty: boolean;
}

export function FormActions({ isSubmitting, isPending, isValid, isDirty }: FormActionsProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting || isPending || !isValid || !isDirty}
        sx={{
          padding: '16px 24px',
          fontSize: '16px',
          fontWeight: 500,
          backgroundColor: '#002F9D',
          '&:hover': { backgroundColor: '#002080' },
          width: '110px',
          height: '48px',
          fontFamily: '"Inter", "Roboto", sans-serif',
        }}
      >
        {isPending ? 'Enviando...' : 'Avançar'}
      </Button>
    </Box>
  );
}
