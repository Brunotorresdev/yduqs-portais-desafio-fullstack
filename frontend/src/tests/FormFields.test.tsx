import React from 'react';

import { render, screen } from '@/tests/test-utils';
import { FormFields } from '../app/purchase/components/FormFields';
import { Formik } from 'formik';
import { describe, expect, it, vi } from 'vitest';

const mockFormatters = {
  formatCPF: (value: string) => value,
  formatDate: (value: string) => value,
  formatPhone: (value: string) => value,
};

describe('FormFields', () => {
  const renderComponent = () => {
    return render(
      <Formik
        initialValues={{
          fullName: '',
          cpf: '',
          birthDate: '',
          email: '',
          phone: '',
          graduationYear: '',
        }}
        onSubmit={vi.fn()}
      >
        <FormFields formatters={mockFormatters} />
      </Formik>
    );
  };

  it('should render all form fields', () => {
    renderComponent();

    expect(screen.getByLabelText('Nome completo')).toBeInTheDocument();
    expect(screen.getByLabelText('CPF')).toBeInTheDocument();
    expect(screen.getByLabelText('Data de nascimento')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Celular para contato')).toBeInTheDocument();
    expect(screen.getByLabelText('Ano de conclusão do ensino ...')).toBeInTheDocument();
  });

  it('should render helper text for name field', () => {
    renderComponent();

    expect(
      screen.getByText(
        'Preencha seu nome completo, sem abreviações, igual ao seu documento de identificação.'
      )
    ).toBeInTheDocument();
  });
});
