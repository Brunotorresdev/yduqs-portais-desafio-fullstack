'use client';

import { Banner } from '@/components/layout/Banner';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import {
  Box,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  useTheme,
  useMediaQuery,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { ContainerWrapper } from '@/components/layout/ContainerWrapper';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSearchParams } from 'next/navigation';
import { useCreatePurchase } from './hooks/useCreatePurchase';
import { FormInput } from '@/components/forms/FormInput';
import { useState } from 'react';

const validationSchema = Yup.object({
  fullName: Yup.string().required('Por favor, informe seu nome completo'),
  cpf: Yup.string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'O CPF deve estar no formato 000.000.000-00')
    .required('Por favor, informe seu CPF'),
  birthDate: Yup.string()
    .required('Por favor, informe sua data de nascimento')
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'A data deve estar no formato dd/mm/aaaa')
    .test('valid-date', 'Data inválida', function (value) {
      if (!value) return false;

      const [day, month, year] = value.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year)
        return false;

      const today = new Date();
      if (date > today) return false;

      const minDate = new Date();
      minDate.setFullYear(today.getFullYear() - 120);
      if (date < minDate) return false;

      return true;
    })
    .test('age-validation', 'Você deve ter pelo menos 16 anos', function (value) {
      if (!value) return false;
      const [day, month, year] = value.split('/').map(Number);
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 16;
    }),
  email: Yup.string()
    .email('Por favor, informe um e-mail válido')
    .required('Por favor, informe seu e-mail'),
  phone: Yup.string()
    .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'O celular deve estar no formato (00) 00000-0000')
    .required('Por favor, informe seu celular'),
  graduationYear: Yup.string()
    .required('Por favor, informe o ano de conclusão do ensino médio')
    .matches(/^\d{4}$/, 'O ano deve conter 4 dígitos')
    .test('valid-year', 'Ano inválido', function (value) {
      if (!value) return false;
      const year = parseInt(value);
      const currentYear = new Date().getFullYear();
      return year >= 1950 && year <= currentYear;
    }),
  acceptTerms: Yup.boolean().oneOf([true], 'É necessário aceitar os termos para prosseguir'),
  acceptWhatsApp: Yup.boolean(),
});

interface PurchasePayload {
  course_option_id?: string | null;
  client: {
    name: string;
    identifier: string;
    birth_date: string;
    email: string;
    phone: string;
    high_school_completion_year: number;
  };
  accepted_terms: boolean;
  accepted_whatsapp_updates: boolean;
  total_installments?: number;
  installment_value?: number;
  total_value?: number;
}

export default function RegistrationForm() {
  const searchParams = useSearchParams();
  const cardOptionId = searchParams.get('cardOptionId');
  const selectedParcel = searchParams.get('selectedParcel');
  const parcelData = selectedParcel ? JSON.parse(selectedParcel) : null;

  const createPurchase = useCreatePurchase();
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleCloseToast = () => setToast({ ...toast, open: false });

  const handleSubmit = async (values: any) => {
    const convertBrazilianDateToISO = (dateString: string) => {
      const [day, month, year] = dateString.split('/');
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toISOString();
    };

    const payload: PurchasePayload = {
      course_option_id: cardOptionId,
      client: {
        name: values.fullName,
        identifier: values.cpf.replace(/\D/g, ''),
        birth_date: convertBrazilianDateToISO(values.birthDate),
        email: values.email,
        phone: values.phone.replace(/\D/g, ''),
        high_school_completion_year: Number(values.graduationYear),
      },
      accepted_terms: values.acceptTerms,
      accepted_whatsapp_updates: values.acceptWhatsApp,
      total_installments: parcelData?.parcels,
      installment_value: parcelData?.installment,
      total_value: parcelData?.total,
    };

    try {
      setLoading(true);
      await createPurchase.mutateAsync(payload);

      setToast({
        open: true,
        message: 'Inscrição enviada com sucesso!',
        severity: 'success',
      });
    } catch (error: any) {
      console.error('Erro ao criar compra:', error);
      let errorMessage = 'Ocorreu um erro inesperado ao enviar os dados. Tente novamente.';

      if (error?.response?.data?.message) {
        if (Array.isArray(error.response.data.message)) {
          errorMessage = error.response.data.message.join('\n');
        } else {
          errorMessage = error.response.data.message;
        }
      } else if (error?.response?.status === 400) {
        if (!cardOptionId) {
          errorMessage = 'Por favor, selecione um curso para prosseguir com a inscrição.';
        } else {
          errorMessage = 'Alguns campos estão inválidos. Por favor, verifique os dados informados.';
        }
      } else if (error?.response?.status === 404) {
        errorMessage = 'Opção de curso não encontrada. Por favor, selecione outra opção.';
      } else if (error?.response?.status === 500) {
        errorMessage = 'Erro interno do servidor. Por favor, tente novamente mais tarde.';
      }

      setToast({
        open: true,
        message: errorMessage,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9)
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const formatDate = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Header />
      <Banner title='Queremos saber um pouco mais sobre você' />
      <ContainerWrapper>
        <Box
          sx={{
            my: 4,
            marginTop: 0,
            padding: isMobile ? '0 16px' : 0,
            maxWidth: '660px',
            p: '0 10px',
          }}
        >
          <Formik
            initialValues={{
              fullName: '',
              cpf: '',
              birthDate: '',
              email: '',
              phone: '',
              graduationYear: '',
              acceptTerms: false,
              acceptWhatsApp: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form>
                <FormInput
                  name='fullName'
                  placeholder='Nome completo'
                  helperText='Preencha seu nome completo, sem abreviações, igual ao seu documento de identificação.'
                />

                <FormInput name='cpf' placeholder='CPF' maxLength={14} formatValue={formatCPF} />
                <FormInput
                  name='birthDate'
                  placeholder='Data de nascimento'
                  maxLength={10}
                  formatValue={formatDate}
                />
                <FormInput name='email' placeholder='E-mail' type='email' />
                <FormInput
                  name='phone'
                  placeholder='Celular para contato'
                  maxLength={15}
                  formatValue={formatPhone}
                />
                <FormInput
                  name='graduationYear'
                  placeholder='Ano de conclusão do ensino ...'
                  maxLength={4}
                />

                <Box mb={3}>
                  <FormControlLabel
                    sx={{
                      alignItems: 'flex-start',
                      '.MuiFormControlLabel-label': { marginTop: '-2px' },
                      '.MuiButtonBase-root': { p: '0 9px 0 8px' },
                    }}
                    control={
                      <Field
                        as={Checkbox}
                        name='acceptTerms'
                        color='primary'
                        sx={{
                          color: '#000',
                          '&.Mui-checked': { color: '#000' },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant='body2'
                        sx={{
                          fontFamily: '"Inter", "Roboto", sans-serif',
                          fontSize: '16px',
                          lineHeight: '133%',
                          fontWeight: 500,
                        }}
                      >
                        Li e concordo com os termos do edital, bem como com o tratamento dos meus
                        dados para fins de prospecção dos serviços educacionais prestados pela
                        Estácio e demais instituições de ensino do mesmo Grupo Econômico, de acordo
                        com a nossa política de privacidade.
                      </Typography>
                    }
                  />
                  <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '3px' }}>
                    <ErrorMessage name='acceptTerms' component='div' />
                  </div>
                </Box>

                <Box mb={4}>
                  <FormControlLabel
                    sx={{
                      alignItems: 'flex-start',
                      '.MuiFormControlLabel-label': { marginTop: '-2px' },
                      '.MuiButtonBase-root': { p: '0 9px 0 8px' },
                    }}
                    control={
                      <Field
                        as={Checkbox}
                        name='acceptWhatsApp'
                        color='primary'
                        sx={{
                          color: '#000',
                          '&.Mui-checked': { color: '#000' },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant='body2'
                        sx={{
                          fontFamily: '"Inter", "Roboto", sans-serif',
                          fontSize: '16px',
                          lineHeight: '133%',
                          fontWeight: 500,
                        }}
                      >
                        Aceito receber atualizações sobre minha inscrição pelo WhatsApp.
                      </Typography>
                    }
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    disabled={isSubmitting || createPurchase.isPending || !isValid || !dirty}
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
                    {createPurchase.isPending ? 'Enviando...' : 'Avançar'}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </ContainerWrapper>

      <div style={{ backgroundColor: '#002F9D', marginTop: '56px' }}>
        <Footer />
      </div>

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>

      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}
