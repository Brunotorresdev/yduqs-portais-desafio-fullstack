'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  styled,
  useTheme,
  useMediaQuery,
  Divider,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import Image from 'next/image';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const FooterSection = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({
  backgroundColor: '#001F66',
  color: '#FFFFFF',
  padding: theme.spacing(6, 0),
  width: '100%',
  '& a': {
    color: '#FFFFFF',
    textDecoration: 'none',
    fontSize: '14px',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  width: '100%',
  '&:before': {
    display: 'none',
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)({
  padding: 0,
  minHeight: 'auto',
  '& .MuiAccordionSummary-content': {
    margin: '0',
  },
});

export const FooterTitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: '#FFFFFF',
  fontFamily: '"Inter", "Roboto", sans-serif',
  fontStyle: 'semibold',
  lineHeight: '150%',
}));

export const FooterLink = styled(Link)({
  fontSize: '16px',
  display: 'block',
  fontWeight: 400,
  marginBottom: '8px',
  '&:hover': {
    textDecoration: 'underline !important',
    fontFamily: '"Inter", "Roboto", sans-serif',
    lineHeight: '150%',
  },
});





export function MainFooter() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const footerSections = [
    {
      title: 'A ESTÁCIO',
      links: [
        { text: 'Sobre a Estácio', href: '#' },
        { text: 'Unidades', href: '#' },
        { text: 'Sustentabilidade', href: '#' },
        { text: 'Regulamentos', href: '#' },
        { text: 'Trabalhe na Estácio', href: '#' },
        { text: 'Convênios com Empresas', href: '#' },
        { text: 'Seja Parceiro', href: '#' },
        { text: 'Seja Fornecedor', href: '#' },
        { text: 'Imprensa', href: '#' },
      ],
    },
    {
      title: 'ESTUDE NA ESTÁCIO',
      links: [
        { text: 'Por que nossa graduação?', href: '#' },
        { text: 'Por que nossa pós?', href: '#' },
        { text: 'Bolsas e financiamentos', href: '#' },
        { text: 'Carreiras', href: '#' },
        { text: 'Modelos de Ensino', href: '#' },
        { text: 'Formas de Ingresso', href: '#' },
        { text: 'EaD', href: '#' },
        { text: 'Internacionalização', href: '#' },
        { text: 'Clube do aluno', href: '#' },
        { text: 'Informações e-MEC', href: '#' },
      ],
    },
    {
      title: 'CURSOS',
      links: [
        { text: 'Graduação', href: '#' },
        { text: 'Pós graduação', href: '#' },
        { text: 'Cursos Livres', href: '#' },
        { text: '2ª Graduação', href: '#' },
        { text: 'Pós-Graduação', href: '#' },
        { text: 'Mestrado e Doutorado', href: '#' },
        { text: 'Cursos livres', href: '#' },
      ],
    },
    {
      title: 'INSCREVA-SE',
      links: [
        { text: 'Vestibular', href: '#' },
        { text: 'Enem', href: '#' },
        { text: 'Transferência', href: '#' },
        { text: 'Segunda Graduação', href: '#' },
      ],
    },
  ];

  const secondaryFooterSections = [
    {
      title: 'ÁREA DO ALUNO',
      links: [
        { text: 'Acessar área do aluno', href: '#' },
        { text: 'Aplicativo na App Store', href: '#' },
        { text: 'Aplicativo na Google Play', href: '#' },
      ],
    },
    {
      title: 'PARA COMEÇAR',
      links: [
        { text: 'Dicas de Estudo', href: '#' },
        { text: 'Ensino Digital', href: '#' },
        { text: 'Mercado de Trabalho', href: '#' },
        { text: 'Sou calouro', href: '#' },
        { text: 'Por que Estácio?', href: '#' },
      ],
    },
    {
      title: 'REDES SOCIAIS',
      links: [
        { text: 'Instagram', href: '#' },
        { text: 'Facebook', href: '#' },
        { text: 'Linkedin', href: '#' },
        { text: 'Youtube', href: '#' },
      ],
    },
    {
      title: 'FALE COM A GENTE',
      links: [
        { text: 'Atendimento', href: '#' },
        { text: 'Ouvidoria', href: '#' },
      ],
    },
  ];

  return (
    <FooterSection component='footer'>
      <Container maxWidth='lg'>
        <Grid
          container
          spacing={isMobile ? 0 : 4}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: isMobile ? 0 : 2,
            width: '100%',
          }}
        >
          {footerSections.map((section) => (
            <Grid key={section.title} width={isMobile ? '100%' : '160px'} size={{ xs: 12, sm: 3 }}>
              {isMobile ? (
                <Accordion
                  sx={{
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    '&:before': {
                      display: 'none',
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#FFF' }} />}
                    sx={{ padding: 0 }}
                  >
                    <FooterTitle sx={{ margin: 0 }}>{section.title}</FooterTitle>
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: '0 0 0 16px' }}>
                    {section.links.map((link, index) => (
                      <FooterLink key={index} href={link.href}>
                        {link.text}
                      </FooterLink>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ) : (
                <>
                  <FooterTitle>{section.title}</FooterTitle>
                  {section.links.map((link, index) => (
                    <FooterLink key={index} href={link.href}>
                      {link.text}
                    </FooterLink>
                  ))}
                </>
              )}
            </Grid>
          ))}
        </Grid>

        <Grid
          container
          spacing={4}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 2,
            mt: isMobile ? '16px' : '32px',
          }}
        >
          {secondaryFooterSections.map((section) => (
            <Grid key={section.title} width={isMobile ? '100%' : '160px'} size={{ xs: 12, sm: 3 }}>
              {isMobile ? (
                <Accordion
                  sx={{
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    '&:before': {
                      display: 'none',
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#FFF' }} />}
                    sx={{ padding: 0 }}
                  >
                    <FooterTitle sx={{ margin: 0 }}>{section.title}</FooterTitle>
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: '0 0 0 16px' }}>
                    {section.links.map((link, index) => (
                      <FooterLink key={index} href={link.href}>
                        {link.text}
                      </FooterLink>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ) : (
                <>
                  <FooterTitle>{section.title}</FooterTitle>
                  {section.links.map((link, index) => (
                    <FooterLink key={index} href={link.href}>
                      {link.text}
                    </FooterLink>
                  ))}
                </>
              )}
            </Grid>
          ))}
        </Grid>
        <Divider color='#E0E0E0' sx={{ mt: '32px' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 2,
            mt: isMobile ? '16px' : '32px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
                    <Grid width={isMobile ? '100%' : '160px'} size={{ xs: 12, sm: 3}}>

            <FooterLink href='#'>Política de privacidade</FooterLink>
            <FooterLink href='#'>Código de Ética</FooterLink>
            <FooterLink href='#'>Preferências de cookies</FooterLink>
            <FooterLink href='#'>Mapa do site</FooterLink>
          </Grid>

          <Box>
            <Image
              src='/images/image_footer2.png'
              alt='Logo da empresa'
              width={265}
              height={189}
              priority
              style={{
                marginLeft: isMobile ? '16px' : 0,
              }}
            />
          </Box>
        </Box>
        <Divider color='#E0E0E0' sx={{ mt: isMobile ? '16px' : '32px' }} />

        <Grid mt={'32px'} size={{ xs: 12, sm: 3}}>
          <FooterLink href='#'>Estácio Brasil - Todos os direitos reservados</FooterLink>
        </Grid>

        
      </Container>
    </FooterSection>
  );
}
