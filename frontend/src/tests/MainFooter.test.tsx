import React from 'react';
import { render, screen } from '@/tests/test-utils';
import { MainFooter } from '@/components/MainFooter';
import { describe, expect, it } from 'vitest';

describe('MainFooter', () => {
  it('should render all main sections', () => {
    render(<MainFooter />);
    
    expect(screen.getByText('A ESTÁCIO')).toBeInTheDocument();
    expect(screen.getByText('ESTUDE NA ESTÁCIO')).toBeInTheDocument();
    expect(screen.getByText('CURSOS')).toBeInTheDocument();
    expect(screen.getByText('INSCREVA-SE')).toBeInTheDocument();
    expect(screen.getByText('ÁREA DO ALUNO')).toBeInTheDocument();
    expect(screen.getByText('PARA COMEÇAR')).toBeInTheDocument();
    expect(screen.getByText('REDES SOCIAIS')).toBeInTheDocument();
    expect(screen.getByText('FALE COM A GENTE')).toBeInTheDocument();
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
