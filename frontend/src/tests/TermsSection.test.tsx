import React from 'react';

import { render, screen, fireEvent } from '@/tests/test-utils';
import { TermsSection } from '../app/purchase/components/TermsSection';
import { Formik } from 'formik';
import { describe, it, expect, vi } from 'vitest';

describe('TermsSection', () => {
  const renderComponent = () => {
    return render(
      <Formik
        initialValues={{
          acceptTerms: false,
          acceptWhatsApp: false,
        }}
        onSubmit={vi.fn()}
      >
        <TermsSection />
      </Formik>
    );
  };

  it('should render both checkboxes', () => {
    renderComponent();

    expect(
      screen.getByRole('checkbox', { name: /Li e concordo com os termos do edital/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: /Aceito receber atualizações/i })
    ).toBeInTheDocument();
  });

  it('should allow checking and unchecking terms', () => {
    renderComponent();

    const termsCheckbox = screen.getByRole('checkbox', {
      name: /Li e concordo com os termos do edital/i,
    });

    fireEvent.click(termsCheckbox);
    expect(termsCheckbox).toBeChecked();

    fireEvent.click(termsCheckbox);
    expect(termsCheckbox).not.toBeChecked();
  });

  it('should allow checking and unchecking whatsapp updates', () => {
    renderComponent();

    const whatsappCheckbox = screen.getByRole('checkbox', { name: /Aceito receber atualizações/i });

    fireEvent.click(whatsappCheckbox);
    expect(whatsappCheckbox).toBeChecked();

    fireEvent.click(whatsappCheckbox);
    expect(whatsappCheckbox).not.toBeChecked();
  });
});
