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
} from '@mui/material';
import Image from 'next/image';

const FooterSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#001F66',
  color: '#FFFFFF',
  padding: theme.spacing(6, 0),
  '& a': {
    color: '#FFFFFF',
    textDecoration: 'none',
    fontSize: '14px',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: '#FFFFFF',
  fontFamily: '"Inter", "Roboto", sans-serif',
  fontStyle: 'semibold',
  lineHeight: '150%',
}));

const FooterLink = styled(Link)({
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
  return (
    <FooterSection component='footer'>
      <Container maxWidth='lg'>
        <Grid
          container
          spacing={4}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Grid width={'160px'} size={{ xs: 12, sm: 3 }}>
            <FooterTitle>A ESTÁCIO</FooterTitle>
            <FooterLink href='#'>Sobre a Estácio</FooterLink>
            <FooterLink href='#'>Unidades</FooterLink>
            <FooterLink href='#'>Sustentabilidade</FooterLink>
            <FooterLink href='#'>Regulamentos</FooterLink>
            <FooterLink href='#'>Trabalhe na Estácio</FooterLink>
            <FooterLink href='#'>Convênios com Empresas</FooterLink>
            <FooterLink href='#'>Seja Parceiro</FooterLink>
            <FooterLink href='#'>Seja Fornecedor</FooterLink>
            <FooterLink href='#'>Imprensa</FooterLink>
          </Grid>

          <Grid width={'160px'} size={{ xs: 12, sm: 3 }}>
            <FooterTitle>ESTUDE NA ESTÁCIO</FooterTitle>
            <FooterLink href='#'>Por que nossa graduação?</FooterLink>
            <FooterLink href='#'>Por que nossa pós?</FooterLink>
            <FooterLink href='#'>Bolsas e financiamentos</FooterLink>
            <FooterLink href='#'>Carreiras</FooterLink>
            <FooterLink href='#'>Modelos de Ensino</FooterLink>
            <FooterLink href='#'>Formas de Ingresso</FooterLink>
            <FooterLink href='#'>EaD</FooterLink>
            <FooterLink href='#'>Internacionalização</FooterLink>
            <FooterLink href='#'>Clube do aluno</FooterLink>
            <FooterLink href='#'>Informações e-MEC</FooterLink>
          </Grid>

          <Grid width={'160px'} size={{ xs: 12, sm: 3 }}>
            <FooterTitle>CURSOS</FooterTitle>
            <FooterLink href='#'>Graduação</FooterLink>
            <FooterLink href='#'>Pós graduação</FooterLink>
            <FooterLink href='#'>Cursos Livres</FooterLink>
            <FooterLink href='#'>2ª Graduação</FooterLink>
            <FooterLink href='#'>Pós-Graduação</FooterLink>
            <FooterLink href='#'>Mestrado e Doutorado</FooterLink>
            <FooterLink href='#'>Cursos livres</FooterLink>
          </Grid>

          <Grid width={'160px'} size={{ xs: 12, sm: 3 }}>
            <FooterTitle>INSCREVA-SE</FooterTitle>
            <FooterLink href='#'>Vestibular</FooterLink>
            <FooterLink href='#'>Enem</FooterLink>
            <FooterLink href='#'>Transferência</FooterLink>
            <FooterLink href='#'>Segunda Graduação</FooterLink>
          </Grid>
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
          <Grid width={'160px'} size={{ xs: 12, sm: 3 }}>
            <FooterTitle>ÁREA DO ALUNO</FooterTitle>
            <FooterLink href='#'>Acessar área do aluno</FooterLink>
            <FooterLink href='#'>Aplicativo na App Store</FooterLink>
            <FooterLink href='#'>Aplicativo na Google Play</FooterLink>
          </Grid>

          <Grid width={'160px'} size={{ xs: 12, sm: 3 }}>
            <FooterTitle>PARA COMEÇAR</FooterTitle>
            <FooterLink href='#'>Dicas de Estudo</FooterLink>
            <FooterLink href='#'>Ensino Digital</FooterLink>
            <FooterLink href='#'>Mercado de Trabalho</FooterLink>
            <FooterLink href='#'>Sou calouro</FooterLink>
            <FooterLink href='#'>Por que Estácio?</FooterLink>
          </Grid>

          <Grid width={'160px'} size={{ xs: 12, sm: 3 }}>
            <FooterTitle>REDES SOCIAIS</FooterTitle>
            <FooterLink href='#'>Instagram</FooterLink>
            <FooterLink href='#'>Facebook</FooterLink>
            <FooterLink href='#'>Linkedin</FooterLink>
            <FooterLink href='#'>Youtube</FooterLink>
          </Grid>

          <Grid width={'160px'} size={{ xs: 12, sm: 3 }}>
            <FooterTitle>FALE COM A GENTE</FooterTitle>
            <FooterLink href='#'>Atendimento</FooterLink>
            <FooterLink href='#'>Ouvidoria</FooterLink>
          </Grid>
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
          <Grid width={'160px'} size={{ xs: 12, sm: 3 }}>
            <FooterLink href='#'>Política de privacidade</FooterLink>
            <FooterLink href='#'>Código de Ética</FooterLink>
            <FooterLink href='#'>Preferências de cookies</FooterLink>
            <FooterLink href='#'>Mapa do site</FooterLink>
          </Grid>

          <Box>
            <Image
              src='/images/image_footer.png'
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

        <Grid mt={'32px'} size={{ xs: 12, sm: 3 }}>
          <FooterLink href='#'>Estácio Brasil - Todos os direitos reservados</FooterLink>
        </Grid>
      </Container>
    </FooterSection>
  );
}
