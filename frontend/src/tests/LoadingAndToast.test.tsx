import React from 'react';

import { render, screen } from '@/tests/test-utils';
import { LoadingAndToast } from '../app/purchase/components/LoadingAndToast';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('LoadingAndToast', () => {
  const mockOnCloseToast = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading backdrop when loading is true', () => {
    render(
      <LoadingAndToast
        loading={true}
        toast={{ open: false, message: '', severity: 'success' }}
        onCloseToast={mockOnCloseToast}
      />
    );

    expect(screen.getByRole('progressbar', { hidden: true })).toBeInTheDocument();
  });

  it('should render success toast message', () => {
    render(
      <LoadingAndToast
        loading={false}
        toast={{ open: true, message: 'Success message', severity: 'success' }}
        onCloseToast={mockOnCloseToast}
      />
    );

    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  it('should render error toast message', () => {
    render(
      <LoadingAndToast
        loading={false}
        toast={{ open: true, message: 'Error message', severity: 'error' }}
        onCloseToast={mockOnCloseToast}
      />
    );

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('should not render toast when open is false', () => {
    render(
      <LoadingAndToast
        loading={false}
        toast={{ open: false, message: 'Hidden message', severity: 'success' }}
        onCloseToast={mockOnCloseToast}
      />
    );

    expect(screen.queryByText('Hidden message')).not.toBeInTheDocument();
  });
});
