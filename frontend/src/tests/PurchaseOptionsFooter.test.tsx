import React from 'react';
import { render, screen, fireEvent } from '@/tests/test-utils';
import { PurchaseOptionsFooter } from '../app/page-option/components/PurchaseOptionsFooter';
import { describe, expect, it } from 'vitest';

describe('PurchaseOptionsFooter', () => {
  it('should render both accordion sections', () => {
    render(<PurchaseOptionsFooter />);

    expect(screen.getByText('Sobre a Bolsa Incentivo')).toBeInTheDocument();
    expect(screen.getByText('Resumo das suas escolhas')).toBeInTheDocument();
  });

  it('should expand Bolsa Incentivo section when clicked', () => {
    render(<PurchaseOptionsFooter />);
    const incentiveSection = screen.getByText('Sobre a Bolsa Incentivo');

    fireEvent.click(incentiveSection);
    expect(incentiveSection.closest('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('should expand Resumo section when clicked', () => {
    render(<PurchaseOptionsFooter />);
    const summarySection = screen.getByText('Resumo das suas escolhas');

    fireEvent.click(summarySection);
    expect(summarySection.closest('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('should collapse expanded section when clicked again', () => {
    render(<PurchaseOptionsFooter />);
    const incentiveSection = screen.getByText('Sobre a Bolsa Incentivo');

    fireEvent.click(incentiveSection); // expand
    expect(incentiveSection.closest('button')).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(incentiveSection); // collapse
    expect(incentiveSection.closest('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('should close first section when opening second section', () => {
    render(<PurchaseOptionsFooter />);
    const incentiveSection = screen.getByText('Sobre a Bolsa Incentivo');
    const summarySection = screen.getByText('Resumo das suas escolhas');

    fireEvent.click(incentiveSection); // open first
    expect(incentiveSection.closest('button')).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(summarySection); // open second
    expect(summarySection.closest('button')).toHaveAttribute('aria-expanded', 'true');

    // First section should be collapsed
    expect(incentiveSection.closest('button')).toHaveAttribute('aria-expanded', 'false');
  });
});
