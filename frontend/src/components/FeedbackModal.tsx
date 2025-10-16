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
import { Check, Error } from '@mui/icons-material';

interface FeedbackModalProps {
  open: boolean;
  title: string;
  message: string;
  type: 'success' | 'error';
  buttonText?: string;
  onClose: () => void;
}

export function FeedbackModal({
  open,
  title,
  message,
  type,
  buttonText = 'Continuar',
  onClose,
}: FeedbackModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const iconColor = type === 'success' ? '#4CAF50' : '#F44336';
  const Icon = type === 'success' ? Check : Error;

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          padding: '24px',
        },
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
              backgroundColor: iconColor,
              borderRadius: '50%',
              width: 64,
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <Icon sx={{ color: '#FFF', fontSize: 40 }} />
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
            {title}
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
            {message}
          </Typography>

          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              backgroundColor: type === 'success' ? '#FF3D5B' : '#666',
              color: '#FFF',
              borderRadius: '12px',
              textTransform: 'none',
              px: 4,
              py: 1.5,
              fontWeight: 500,
              fontSize: isMobile ? '14px' : '16px',
              '&:hover': {
                backgroundColor: type === 'success' ? '#E73350' : '#555',
              },
            }}
          >
            {buttonText}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
