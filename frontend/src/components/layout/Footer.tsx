import { JSX } from 'react';
import Image from 'next/image';
import { ContainerWrapper } from './ContainerWrapper';
import { Box, Typography } from '@mui/material';

export function Footer(): JSX.Element {
  return (
    <Box
      sx={{
        maxWidth: 1190,
        margin: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '24px 0',
      }}
    >
      <Box>
        <Image
          src="/images/logo_estacio_white.png"
          alt="Logo da empresa"
          width={158.33}
          height={40}
          priority
        />
      </Box>

      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '56px' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image
            style={{ marginRight: '12px' }}
            width={40}
            height={40}
            src="/icons/phone_icon.png"
            alt="Icone de telefone"
            priority
          />
          <Typography variant="body2" color="#FFFFFF">
            0800 771 5055
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image
            style={{ marginRight: '12px' }}
            width={40}
            height={40}
            src="/icons/whatsapp_icon.png"
            alt="Icone do WhatsApp"
            priority
          />
          <Typography variant="body2" color="#FFFFFF">
            Precisa de ajuda?
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
