import React from 'react';
import { render, screen } from '@/tests/test-utils';
import { FormActions } from '../app/purchase/components/FormActions';
import { describe, expect, it } from 'vitest';

describe('FormActions', () => {
  it('should render submit button with "Avançar" text when not pending', () => {
    render(<FormActions isSubmitting={false} isPending={false} isValid={true} isDirty={true} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Avançar');
    expect(button).toBeEnabled();
  });

  it('should render submit button with "Enviando..." text when pending', () => {
    render(<FormActions isSubmitting={false} isPending={true} isValid={true} isDirty={true} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Enviando...');
  });

  it('should disable button when form is not valid', () => {
    render(<FormActions isSubmitting={false} isPending={false} isValid={false} isDirty={true} />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should disable button when form is not dirty', () => {
    render(<FormActions isSubmitting={false} isPending={false} isValid={true} isDirty={false} />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should disable button when form is submitting', () => {
    render(<FormActions isSubmitting={true} isPending={false} isValid={true} isDirty={true} />);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
