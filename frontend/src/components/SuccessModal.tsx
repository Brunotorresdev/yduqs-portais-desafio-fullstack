'use client';

import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Check } from '@mui/icons-material';

interface SuccessModalProps {
  open: boolean;
  userName: string;
  onClose: () => void;
}

export function SuccessModal({ open, userName, onClose }: SuccessModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog 
      open={open} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          padding: '24px',
        }
      }}
    >
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            py: 3,
          }}
        >
          <Box
            sx={{
              backgroundColor: '#4CAF50',
              borderRadius: '50%',
              width: 64,
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <Check sx={{ color: '#FFF', fontSize: 40 }} />
          </Box>

          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontFamily: '"Montserrat", "Roboto", sans-serif',
              fontWeight: 600,
              mb: 2,
              color: '#121212',
            }}
          >
            Inscrição realizada com sucesso!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              maxWidth: '80%',
              color: '#666',
              fontSize: isMobile ? '14px' : '16px',
            }}
          >
            Obrigado {userName}! Seu interesse é muito importante para nós.
            Em breve entraremos em contato para dar continuidade ao seu processo de matrícula.
          </Typography>

          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              backgroundColor: '#FF3D5B',
              color: '#FFF',
              borderRadius: '12px',
              textTransform: 'none',
              px: 4,
              py: 1.5,
              fontWeight: 500,
              fontSize: isMobile ? '14px' : '16px',
              '&:hover': {
                backgroundColor: '#E73350',
              },
            }}
          >
            Continuar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}