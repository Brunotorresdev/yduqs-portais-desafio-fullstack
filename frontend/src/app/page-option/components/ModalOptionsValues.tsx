'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { PurchaseOptionsFooter } from './PurchaseOptionsFooter';
import { Close } from '@mui/icons-material';

interface ModalOptionsValuesProps {
  hasValue: boolean;
  installments?: { parcels: number; installment: number; total: number }[];
  formik: any;
}

export function ModalOptionsValues({
  hasValue,
  installments = [],
  formik,
}: ModalOptionsValuesProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleAdvance = () => {
    setIsNavigating(true);
    const selectedOption = installments.find(
      opt => opt.parcels === Number(formik.values.selectedParcel)
    );

    const selectedOptionConverted = selectedOption ? JSON.stringify(selectedOption) : '';

    const query = new URLSearchParams({
      cardOptionId: formik.values.cardOptionId,
      selectedParcel: selectedOptionConverted,
    }).toString();

    router.push(`/purchase?${query}`);
  };

  const handleClose = () => {
    formik.setFieldValue('open', false);
  };

  return (
    <Dialog open={formik.values.open} onClose={() => handleClose()} maxWidth='sm' fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <DialogTitle
          sx={{
            fontFamily: '"Montserrat", "Roboto", sans-serif',
            fontSize: isMobile ? 24 : 32,
            fontWeight: 500,
            lineHeight: '120%',
            color: '#121212',
            padding: isMobile ? '16px 20px' : '16px 24px',
          }}
        >
          Mais detalhes
        </DialogTitle>
        <Box sx={{ padding: '0 16px 0 25px' }}>
          <Close onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Box>
      </Box>
      <Divider color='#E0E0E0' />
      <DialogContent
        sx={{
          paddingTop: isMobile ? '16px' : '24px 0 16px 0',

          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#c1c1c1',
            borderRadius: '8px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#a0a0a0',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f0f0f0',
          },
        }}
      >
        {hasValue ? (
          <>
            <Typography sx={{ mb: 2 }}>Qual dessas opções de parcelas você prefere?</Typography>

            <Box
              sx={{
                border: '1px solid #144BC8',
                borderRadius: 2,
                overflow: 'hidden',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 1,
                  bgcolor: '#144BC8',
                  color: '#FFF',
                }}
              >
                <Typography fontSize={'16px'} fontWeight={400}>
                  Parcelas
                </Typography>
                <Typography fontSize={'16px'} fontWeight={400} mr={isMobile ? '16px' : '58px'}>
                  Total
                </Typography>
              </Box>

              <RadioGroup
                name='selectedParcel'
                value={formik.values.selectedParcel}
                onChange={formik.handleChange}
              >
                {installments.map(opt => (
                  <Box
                    key={opt.parcels}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      px: 2,
                      py: 1,
                      borderTop: '1px solid #144BC8',
                    }}
                  >
                    <FormControlLabel
                      value={opt.parcels.toString()}
                      control={
                        <Radio
                          sx={{
                            color: '#000',
                            '&.Mui-checked': {
                              color: '#000',
                            },
                          }}
                        />
                      }
                      label={`${opt.parcels}x R$ ${opt.installment.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                      })}`}
                    />
                    <Typography>
                      R$ {opt.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </Typography>
                  </Box>
                ))}
              </RadioGroup>
            </Box>
            <PurchaseOptionsFooter />

            <Button
              variant='contained'
              onClick={handleAdvance}
              disabled={isNavigating}
              sx={{
                backgroundColor: '#FF3D5B',
                color: '#FFF',
                borderRadius: '12px',
                textTransform: 'none',
                width: '100%',
                fontWeight: 500,
                fontSize: 16,
                py: 1.2,
                '&:hover': { backgroundColor: '#E73350' },
                mt: 2,
                fontFamily: '"Inter", "Roboto", sans-serif',
                position: 'relative',
              }}
            >
              {isNavigating ? (
                <>
                  <CircularProgress
                    size={24}
                    sx={{
                      color: '#FFF',
                      position: 'absolute',
                      left: '50%',
                      marginLeft: '-12px',
                    }}
                  />
                  <span style={{ visibility: 'hidden' }}>Avançar</span>
                </>
              ) : (
                'Avançar'
              )}
            </Button>
          </>
        ) : (
          <>
            <Typography sx={{ mb: 2 }}>
              Inscreva-se para saber tudo sobre os valores e garantir a sua vaga!
            </Typography>
            <PurchaseOptionsFooter />

            <Button
              variant='contained'
              onClick={handleAdvance}
              disabled={isNavigating}
              sx={{
                backgroundColor: '#FF3D5B',
                color: '#FFF',
                borderRadius: '12px',
                textTransform: 'none',
                width: '100%',
                fontWeight: 'bold',
                fontSize: 16,
                py: 1.2,
                '&:hover': { backgroundColor: '#E73350' },
                mt: 2,
                position: 'relative',
              }}
            >
              {isNavigating ? (
                <>
                  <CircularProgress
                    size={24}
                    sx={{
                      color: '#FFF',
                      position: 'absolute',
                      left: '50%',
                      marginLeft: '-12px',
                    }}
                  />
                  <span style={{ visibility: 'hidden' }}>Avançar</span>
                </>
              ) : (
                'Avançar'
              )}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
