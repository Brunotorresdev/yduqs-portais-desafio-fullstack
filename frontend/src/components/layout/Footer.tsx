import { JSX } from 'react';
import Image from 'next/image';
import { ContainerWrapper } from './ContainerWrapper';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

interface FooterProps {
  isDefault?: boolean;
}

export function Footer({ isDefault }: FooterProps): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        maxWidth: 1190,
        margin: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        padding: isMobile ? '16px 16px 24px 16px' : '24px 10px',
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      {isDefault ? (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '56px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Image
                style={{ marginRight: '12px' }}
                width={40}
                height={40}
                src='/icons/phone_icon.png'
                alt='Icone de telefone'
                priority
              />
              <Typography variant='body2' color='#FFFFFF'>
                0800 771 5055
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Image
                style={{ marginRight: '12px' }}
                width={40}
                height={40}
                src='/icons/whatsapp_icon.png'
                alt='Icone do WhatsApp'
                priority
              />
              <Typography variant='body2' color='#FFFFFF'>
                Precisa de ajuda?
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='body2' color='#FFFFFF'>
              Estácio Brasil - Todos os direitos reservados
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{}}>
            <Image
              src='/images/logo_estacio_white.png'
              alt='Logo da empresa'
              width={158.33}
              height={40}
              priority
              style={{
                marginBottom: isMobile ? '16px' : 0,
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent: 'space-between',
              gap: isMobile ? '12px' : '56px',
              flexDirection: isMobile ? 'column-reverse' : 'row',
              marginTop: isMobile ? '24px' : 0,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Image
                style={{ marginRight: '12px' }}
                width={40}
                height={40}
                src='/icons/phone_icon.png'
                alt='Icone de telefone'
                priority
              />
              <Typography variant='body2' color='#FFFFFF'>
                0800 771 5055
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Image
                style={{ marginRight: '12px' }}
                width={40}
                height={40}
                src='/icons/whatsapp_icon.png'
                alt='Icone do WhatsApp'
                priority
              />
              <Typography variant='body2' color='#FFFFFF'>
                Precisa de ajuda?
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
