import { JSX } from 'react';
import Image from 'next/image';
import { ContainerWrapper } from './ContainerWrapper';
import { Box, useMediaQuery, useTheme } from '@mui/material';

export function Header(): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <header style={{ padding: isMobile ? '16px 0' : '24px 10px' }}>
      <ContainerWrapper>
     
         <Box
              sx={{
                position: 'relative',
                width: isMobile ? 126.67 : 158.33,
                height: isMobile ? 32 : 40,
                marginLeft: isMobile ? '16px' : 0,
              }}
            >
              <Image
                src='/images/logo_estacio.png'
                alt='Logo da empresa'
                fill
                style={{ objectFit: 'contain' }}
                sizes='(max-width: 600px) 100px, 158px'
                priority
              />
            </Box>
      </ContainerWrapper>
    </header>
  );
}
