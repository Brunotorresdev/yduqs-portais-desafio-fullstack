'use client';

import { Banner } from '@/components/layout/Banner';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { ContainerWrapper } from '@/components/layout/ContainerWrapper';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSearchParams } from 'next/navigation';
import { useCreatePurchase } from './hooks/useCreatePurchase'; // 🔥 importa o hook

const validationSchema = Yup.object({
  fullName: Yup.string().required('Nome completo é obrigatório'),
  cpf: Yup.string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato 000.000.000-00')
    .required('CPF é obrigatório'),
  birthDate: Yup.string().required('Data de nascimento é obrigatória'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  phone: Yup.string()
    .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Celular deve estar no formato (00) 00000-0000')
    .required('Celular é obrigatório'),
  graduationYear: Yup.string().required('Ano de conclusão é obrigatório'),
  acceptTerms: Yup.boolean().oneOf([true], 'Você deve aceitar os termos'),
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

  const createPurchase = useCreatePurchase(); // 🔥 usa o hook de post

  const handleSubmit = async (values: any) => {
    console.log("🚀 ~ handleSubmit ~ values:", values)
    const payload: PurchasePayload = {
      course_option_id: cardOptionId,
      client: {
        name: values.fullName,
        identifier: values.cpf.replace(/\D/g, ''), // remove pontos e traço
        birth_date: new Date(values.birthDate).toISOString(),
        email: values.email,
        phone: values.phone.replace(/\D/g, ''), // remove caracteres não numéricos
        high_school_completion_year: Number(values.graduationYear),
      },
      accepted_terms: values.acceptTerms,
      accepted_whatsapp_updates: values.acceptWhatsApp,
      total_installments: parcelData?.parcels,
      installment_value: parcelData?.installment,
      total_value: parcelData?.total,
    };

    console.log('Payload enviado ao backend:', payload);

    try {
      await createPurchase.mutateAsync(payload);
      alert('Compra criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar compra:', error);
      alert('Ocorreu um erro ao enviar os dados.');
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

  return (
    <>
      <Header />
      <Banner title="Queremos saber um pouco mais sobre você" />
      <ContainerWrapper>
        <Box sx={{ my: 4, p: 4 }}>
          {/* ...seu Formik permanece igual, só muda o onSubmit */}
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
            {({ values, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
              <Form>
                <Box mb={3}>
                  <TextField
                    sx={{ '.MuiFormHelperText-root': { color: 'red' } }}
                    fullWidth
                    placeholder="Nome completo"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="fullName" />}
                    error={!!(values.fullName && ErrorMessage)}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Preencha seu nome completo, sem abreviações, igual ao seu documento de
                    identificação. Confira o exemplo.
                  </Typography>
                </Box>

                <Box mb={3}>
                  <TextField
                    sx={{ '.MuiFormHelperText-root': { color: 'red' } }}
                    fullWidth
                    placeholder="CPF"
                    name="cpf"
                    value={values.cpf}
                    onChange={(e) => {
                      const formatted = formatCPF(e.target.value);
                      setFieldValue('cpf', formatted);
                    }}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="cpf" />}
                    error={!!(values.cpf && ErrorMessage)}
                    inputProps={{ maxLength: 14 }}
                  />
                </Box>

                <Box mb={3}>
                  <TextField
                    sx={{ '.MuiFormHelperText-root': { color: 'red' } }}
                    fullWidth
                    placeholder="Data de nascimento"
                    name="birthDate"
                    value={values.birthDate}
                    onChange={(e) => {
                      const formatted = formatDate(e.target.value);
                      setFieldValue('birthDate', formatted);
                    }}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="birthDate" />}
                    error={!!(values.birthDate && ErrorMessage)}
                    inputProps={{ maxLength: 10 }}
                  />
                </Box>

                <Box mb={3}>
                  <TextField
                    sx={{ '.MuiFormHelperText-root': { color: 'red' } }}
                    fullWidth
                    placeholder="E-mail"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="email" />}
                    error={!!(values.email && ErrorMessage)}
                  />
                </Box>

                <Box mb={3}>
                  <TextField
                    sx={{ '.MuiFormHelperText-root': { color: 'red' } }}
                    fullWidth
                    placeholder="Celular para contato"
                    name="phone"
                    value={values.phone}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value);
                      setFieldValue('phone', formatted);
                    }}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="phone" />}
                    error={!!(values.phone && ErrorMessage)}
                    inputProps={{ maxLength: 15 }}
                  />
                </Box>

                <Box mb={3}>
                  <TextField
                    sx={{ '.MuiFormHelperText-root': { color: 'red' } }}
                    fullWidth
                    placeholder="Ano de conclusão do ensino ..."
                    name="graduationYear"
                    value={values.graduationYear}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="graduationYear" />}
                    error={!!(values.graduationYear && ErrorMessage)}
                    inputProps={{ maxLength: 4 }}
                  />
                </Box>

                <Box mb={3}>
                  <FormControlLabel
                    sx={{ '.MuiFormHelperText-root': { color: 'red' } }}
                    control={<Field as={Checkbox} name="acceptTerms" color="primary" />}
                    label={
                      <Typography variant="body2">
                        Li e concordo com os termos do edital, bem como com o tratamento dos meus
                        dados para fins de prospecção dos serviços educacionais prestados pela
                        Estácio e demais instituições de ensino do mesmo Grupo Econômico, de acordo
                        com a nossa política de privacidade.
                      </Typography>
                    }
                  />
                  <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '3px' }}>
                    <ErrorMessage name="acceptTerms" component="div" />
                  </div>
                </Box>

                <Box mb={4}>
                  <FormControlLabel
                    control={<Field as={Checkbox} name="acceptWhatsApp" color="primary" />}
                    label={
                      <Typography variant="body2">
                        Aceito receber atualizações sobre minha inscrição pelo WhatsApp.
                      </Typography>
                    }
                  />
                </Box>

                <Box sx={{ borderTop: 1, borderColor: 'divider', my: 3 }} />

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting || createPurchase.isPending}
                    sx={{
                      px: 6,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      backgroundColor: '#002F9D',
                      '&:hover': { backgroundColor: '#002080' },
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
      <div style={{ backgroundColor: '#002F9D' }}>
        <Footer isDefault />
      </div>
    </>
  );
}
