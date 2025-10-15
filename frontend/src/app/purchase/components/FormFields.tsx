'use client';
import React from 'react';
import { FormInput } from '@/components/forms/FormInput';

interface FormFieldsProps {
  formatters: {
    formatCPF: (value: string) => string;
    formatDate: (value: string) => string;
    formatPhone: (value: string) => string;
  };
}

export function FormFields({ formatters }: FormFieldsProps) {
  const { formatCPF, formatDate, formatPhone } = formatters;

  return (
    <>
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
      <FormInput name='graduationYear' placeholder='Ano de conclusão do ensino ...' maxLength={4} />
    </>
  );
}
