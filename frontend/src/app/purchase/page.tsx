'use client';

import { Banner } from '@/components/layout/Banner';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { NoCardOptionSelected } from '@/components/NoCardOptionSelected';
import { useCourse } from '@/contexts/CourseContext';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { FormFields } from './components/FormFields';
import { FormActions } from './components/FormActions';

import { TermsSection } from './components/TermsSection';
import { FeedbackModal } from '@/components/FeedbackModal';
import { ContainerWrapper } from '@/components/layout/ContainerWrapper';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useCreatePurchase } from './hooks/useCreatePurchase';
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

interface ApiError {
  response?: {
    data?: {
      message?: string | string[];
    };
    status?: number;
  };
}

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
  const { selectedCourseId, selectedInstallment } = useCourse();
  const createPurchase = useCreatePurchase();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [feedbackModal, setFeedbackModal] = useState<{
    open: boolean;
    title: string;
    message: string;
    type: 'success' | 'error';
  }>({
    open: false,
    title: '',
    message: '',
    type: 'success',
  });

  if (!selectedCourseId) {
    return (
      <>
        <Header />
        <ContainerWrapper>
          <NoCardOptionSelected />
        </ContainerWrapper>
        <div style={{ backgroundColor: '#002F9D', marginTop: '56px' }}>
          <Footer />
        </div>
      </>
    );
  }

  const handleCloseFeedback = () => {
    setFeedbackModal((prev) => ({ ...prev, open: false }));
    if (feedbackModal.type === 'success') {
      router.push('/page-option');
    }
  };

  interface FormValues {
    fullName: string;
    cpf: string;
    birthDate: string;
    email: string;
    phone: string;
    graduationYear: string;
    acceptTerms: boolean;
    acceptWhatsApp: boolean;
  }

  const handleSubmit = async (values: FormValues) => {
    const convertBrazilianDateToISO = (dateString: string) => {
      const [day, month, year] = dateString.split('/');
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toISOString();
    };

    const payload: PurchasePayload = {
      course_option_id: selectedCourseId,
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
      total_installments: selectedInstallment?.parcels,
      installment_value: selectedInstallment?.installment,
      total_value: selectedInstallment?.total,
    };

    try {
      await createPurchase.mutateAsync(payload);
      setFeedbackModal({
        open: true,
        title: 'Inscrição realizada com sucesso!',
        message: `Obrigado ${values.fullName.split(' ')[0]}! Seu interesse é muito importante para nós. Em breve entraremos em contato para dar continuidade ao seu processo de matrícula.`,
        type: 'success',
      });
    } catch (error) {
      const apiError = error as ApiError;
      /* eslint-disable-next-line no-console, no-undef */
      console.error('Erro ao criar compra:', error);
      let errorMessage = 'Ocorreu um erro inesperado ao enviar os dados. Tente novamente.';

      if (apiError.response?.data?.message) {
        if (Array.isArray(apiError.response.data.message)) {
          errorMessage = apiError.response.data.message.join('\n');
        } else {
          errorMessage = apiError.response.data.message as string;
        }
      } else if (apiError.response?.status === 400) {
        if (!selectedCourseId) {
          errorMessage = 'Por favor, selecione um curso para prosseguir com a inscrição.';
        } else {
          errorMessage = 'Alguns campos estão inválidos. Por favor, verifique os dados informados.';
        }
      } else if (apiError.response?.status === 404) {
        errorMessage = 'Opção de curso não encontrada. Por favor, selecione outra opção.';
      } else if (apiError.response?.status === 500) {
        errorMessage = 'Erro interno do servidor. Por favor, tente novamente mais tarde.';
      }

      setFeedbackModal({
        open: true,
        title: 'Erro ao enviar inscrição',
        message: errorMessage,
        type: 'error',
      });
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
                <FormFields
                  formatters={{
                    formatCPF,
                    formatDate,
                    formatPhone,
                  }}
                />

                <TermsSection />

                <FormActions
                  isSubmitting={isSubmitting}
                  isPending={createPurchase.isPending}
                  isValid={isValid}
                  isDirty={dirty}
                />
              </Form>
            )}
          </Formik>
        </Box>
      </ContainerWrapper>

      <div style={{ backgroundColor: '#002F9D', marginTop: '56px' }}>
        <Footer />
      </div>

      <FeedbackModal
        open={feedbackModal.open}
        title={feedbackModal.title}
        message={feedbackModal.message}
        type={feedbackModal.type}
        onClose={handleCloseFeedback}
        buttonText={feedbackModal.type === 'success' ? 'Continuar' : 'Fechar'}
      />
    </>
  );
}
