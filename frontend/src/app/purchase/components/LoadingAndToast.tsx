'use client';

import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material';

interface ToastState {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}

interface LoadingAndToastProps {
  loading: boolean;
  toast: ToastState;
  onCloseToast: () => void;
}

export function LoadingAndToast({ loading, toast, onCloseToast }: LoadingAndToastProps) {
  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={onCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={onCloseToast} severity={toast.severity} variant="filled" sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}