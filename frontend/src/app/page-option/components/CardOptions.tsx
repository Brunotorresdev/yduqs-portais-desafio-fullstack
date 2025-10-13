import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ModalOptionsValues } from './ModalOptionsValues';
import { Formik } from 'formik';

interface Tour {
  id: string;
  name: string;
}

interface CardOptionsProps {
  item: {
    id: string;
    name: string;
    value?: number;
    cash_value?: number;
    city: string;
    street: string;
    street_number: string;
    street_neighborhood: string;
    tourns: Tour[];
    installments?: { parcels: number; installment: number; total: number }[];
  };
}

export default function CardOptions({ item }: CardOptionsProps) {
  // const [open, setOpen] = useState(false);
  const hasValue = typeof item.cash_value === 'number' && !isNaN(item.cash_value);
  const tournName = item.tourns?.[0]?.name || '';
  const installments = hasValue ? item.installments || [] : [];

  return (
    <Formik
      initialValues={{ cardOptionId: '', selectedParcel: '', open: false }}
      onSubmit={(values) => console.log('Form values:', values)}
    >
      {(formik) => (
        <>
          <Box
            sx={{
              width: 320,
              border: '1px solid #144BC8',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            }}
          >
            <Box sx={{ backgroundColor: '#001F66', color: '#FFF', p: 2 }}>
              <Typography fontWeight="bold">{tournName}</Typography>
            </Box>

            <Box sx={{ backgroundColor: '#144BC8', color: '#FFF', p: 2 }}>
              {hasValue ? (
                <>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Typography sx={{ textDecoration: 'line-through', fontSize: 14, opacity: 0.8 }}>
                      De R$ {item.value?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </Typography>
                    <Typography sx={{ fontSize: 14, opacity: 0.8 }}>por até</Typography>
                  </Box>

                  <Typography variant="h4" fontWeight="bold">
                    18x R${' '}
                    {installments
                      .find((i) => i.parcels === 18)
                      ?.installment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Typography>

                  <Typography sx={{ mb: 2 }}>
                    à vista R${' '}
                    {item.cash_value!.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Typography>
                </>
              ) : (
                <Typography sx={{ fontSize: 14, opacity: 0.8 }}>
                  Inscreva-se para saber tudo sobre os valores e garantir a sua vaga!
                </Typography>
              )}

              <Button
                variant="contained"
                onClick={() => {
                  formik.setFieldValue('open', true);
                  formik.setFieldValue('cardOptionId', item.id);
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
                  mt: 2,
                  '&:hover': { backgroundColor: '#E73350' },
                }}
              >
                Avançar
              </Button>
            </Box>

            <Box sx={{ p: 2, backgroundColor: '#FFF' }}>
              <Typography fontWeight="bold">
                {item.city} - {item.street_neighborhood}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.street}, Nº {item.street_number} - {item.street_neighborhood} - {item.city}
              </Typography>
            </Box>
          </Box>

          <ModalOptionsValues hasValue={hasValue} installments={installments} formik={formik} />
        </>
      )}
    </Formik>
  );
}
