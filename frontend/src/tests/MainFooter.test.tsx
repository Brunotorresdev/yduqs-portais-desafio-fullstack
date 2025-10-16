import React from 'react';
import { render, screen, fireEvent } from '@/tests/test-utils';
import { MainFooter } from '@/components/MainFooter';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useMediaQuery } from '@mui/material';

// Mock useMediaQuery
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  };
});

describe('MainFooter', () => {
  describe('Desktop View', () => {
    beforeEach(() => {
      (useMediaQuery as any).mockReturnValue(false);
    });

    it('should render all main sections expanded', () => {
      render(<MainFooter />);

      expect(screen.getByText('A ESTÁCIO')).toBeInTheDocument();
      expect(screen.getByText('ESTUDE NA ESTÁCIO')).toBeInTheDocument();
      expect(screen.getByText('CURSOS')).toBeInTheDocument();
      expect(screen.getByText('INSCREVA-SE')).toBeInTheDocument();
      expect(screen.getByText('ÁREA DO ALUNO')).toBeInTheDocument();
      expect(screen.getByText('PARA COMEÇAR')).toBeInTheDocument();
      expect(screen.getByText('REDES SOCIAIS')).toBeInTheDocument();
      expect(screen.getByText('FALE COM A GENTE')).toBeInTheDocument();

      expect(screen.getByText('Sobre a Estácio')).toBeVisible();
      expect(screen.getByText('Graduação')).toBeVisible();
    });
  });

  describe('Mobile View', () => {
    beforeEach(() => {
      (useMediaQuery as any).mockReturnValue(true); // 👈 faltou isso!
    });

    it('should render all sections as accordions', () => {
      render(<MainFooter />);

      const expandIcons = screen.getAllByTestId('ExpandMoreIcon');
      expect(expandIcons.length).toBeGreaterThan(0);
    });

    it('should show links when accordion is expanded', () => {
      render(<MainFooter />);

      const estacioLink = screen.getByText('Sobre a Estácio');
      expect(estacioLink).not.toBeVisible();

      const estacioTitle = screen.getByText('A ESTÁCIO');
      fireEvent.click(estacioTitle);

      expect(estacioLink).toBeVisible();
    });

    it('should handle multiple accordions independently', () => {
      render(<MainFooter />);

      fireEvent.click(screen.getByText('A ESTÁCIO'));
      expect(screen.getByText('Sobre a Estácio')).toBeVisible();

      fireEvent.click(screen.getByText('CURSOS'));
      expect(screen.getByText('Graduação')).toBeVisible();

      expect(screen.getByText('Sobre a Estácio')).toBeVisible();
      expect(screen.getByText('Graduação')).toBeVisible();
    });
  });

  it('should render important links in A ESTÁCIO section', () => {
    render(<MainFooter />);

    expect(screen.getByText('Sobre a Estácio')).toBeInTheDocument();
    expect(screen.getByText('Unidades')).toBeInTheDocument();
    expect(screen.getByText('Sustentabilidade')).toBeInTheDocument();
  });

  it('should render social media links', () => {
    render(<MainFooter />);

    expect(screen.getByText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();
    expect(screen.getByText('Linkedin')).toBeInTheDocument();
    expect(screen.getByText('Youtube')).toBeInTheDocument();
  });

  it('should render contact information', () => {
    render(<MainFooter />);

    expect(screen.getByText('Atendimento')).toBeInTheDocument();
    expect(screen.getByText('Ouvidoria')).toBeInTheDocument();
  });

  it('should render copyright and policy links', () => {
    render(<MainFooter />);

    expect(screen.getByText('Estácio Brasil - Todos os direitos reservados')).toBeInTheDocument();
    expect(screen.getByText('Política de privacidade')).toBeInTheDocument();
    expect(screen.getByText('Código de Ética')).toBeInTheDocument();
    expect(screen.getByText('Preferências de cookies')).toBeInTheDocument();
    expect(screen.getByText('Mapa do site')).toBeInTheDocument();
  });

  it('should render all links as clickable elements', () => {
    render(<MainFooter />);

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);

    links.forEach(link => {
      expect(link).toHaveAttribute('href');
    });
  });
});
