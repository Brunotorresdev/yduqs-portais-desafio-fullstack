import { JSX } from 'react';
import Image from 'next/image';
import { ContainerWrapper } from './ContainerWrapper';
import { useMediaQuery, useTheme, Box } from '@mui/material';

export function Header(): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

  return (
    <header style={{ padding: isMobile ? '16px 0' : '24px 10px' }}>
      <ContainerWrapper>
        <Image
          src='/images/logo_estacio.png'
          alt='Logo da empresa'
          width={isMobile ? 126.67 : 158.33}
          height={isMobile ? 32 : 40}
          priority
          style={{
            marginLeft: isMobile ? '16px' : 0,
          }}
        />
      </ContainerWrapper>
    </header>
  );
}
