'use client';
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
} from '@mui/material';
import { PurchaseOptionsFooter } from './PurchaseOptionsFooter';
import { useState } from 'react';

export function ModalOptionsValues({
  open,
  setOpen,
  hasValue,
  installments,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  hasValue: boolean;
  cashValue?: number;
  installments?: any;
}) {
  const [selectedParcel, setSelectedParcel] = useState<string>('');

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold' }}>Mais detalhes</DialogTitle>
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
                value={selectedParcel}
                onChange={(e) => setSelectedParcel(e.target.value)}
              >
                {installments.map((opt: any) => (
                  <Box
                    key={opt.parcels}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      px: 2,
                      py: 1,
                      borderTop: '1px solid #E0E0E0',
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
          </>
        ) : (
          <Typography sx={{ mb: 2 }}>
            Inscreva-se para saber tudo sobre os valores e garantir a sua vaga!
          </Typography>
        )}

        <PurchaseOptionsFooter />

        <Button
          variant="contained"
          onClick={() => {
            const selectedOption = installments.find(
              (opt: any) => opt.parcels === Number(selectedParcel)
            );
            console.log('Parcelas escolhidas:', selectedOption);
            setOpen(false);
          }}
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
          }}
        >
          Avançar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
