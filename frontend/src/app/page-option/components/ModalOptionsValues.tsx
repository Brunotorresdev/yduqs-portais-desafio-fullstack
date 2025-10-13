'use client';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
} from '@mui/material';
import { PurchaseOptionsFooter } from './PurchaseOptionsFooter';

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

  const handleAdvance = () => {
    const selectedOption = installments.find(
      (opt) => opt.parcels === Number(formik.values.selectedParcel)
    );

    const selectedOptionConverted = selectedOption ? JSON.stringify(selectedOption) : '';

    const query = new URLSearchParams({
      cardOptionId: formik.values.cardOptionId,
      selectedParcel: selectedOptionConverted,
    }).toString();

    router.push(`/purchase?${query}`);
  };

  return (
    <Dialog
      open={formik.values.open}
      onClose={() => formik.setFieldValue('open', false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ fontWeight: 'bold' }}>Mais detalhes</DialogTitle>
      <Divider color="#E0E0E0" />
      <DialogContent>
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
                <Typography>Parcelas</Typography>
                <Typography>Total</Typography>
              </Box>

              <RadioGroup
                name="selectedParcel"
                value={formik.values.selectedParcel}
                onChange={formik.handleChange}
              >
                {installments.map((opt) => (
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
                      control={<Radio />}
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
              variant="contained"
              onClick={handleAdvance}
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
              }}
            >
              Avançar
            </Button>
          </>
        ) : (
          <>
            <Typography sx={{ mb: 2 }}>
              Inscreva-se para saber tudo sobre os valores e garantir a sua vaga!
            </Typography>
            <PurchaseOptionsFooter />

            <Button
              variant="contained"
              onClick={handleAdvance}
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
              }}
            >
              Avançar
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
