import { JSX } from 'react';
import { ContainerWrapper } from './ContainerWrapper';
import { Typography } from '@mui/material';
import { useMediaQuery, useTheme, Box } from '@mui/material';

type BannerProps = {
  title: string;
  subTitle?: string;
};

export function Banner({ title, subTitle }: BannerProps): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div
      style={{
        padding: isMobile ? '24px 16px' : '40px 10px',
        backgroundColor: '#144BC8',
        marginBottom: isMobile ? '24px' : '32px',
      }}
    >
      <ContainerWrapper>
        <Typography
          color="#FFFFFF"
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: '"Montserrat", "Roboto", sans-serif',
            fontWeight: 500,
            fontSize: isMobile ? '24px' : '32px',
            fontStyle: 'medium',
            lineHeight: '120%',
            marginBottom: '8px',
          }}
        >
          {title}
        </Typography>
        <Typography
          color="#FFFFFF"
          variant="h6"
          component="h6"
          gutterBottom
          sx={{
            fontFamily: subTitle
              ? '"Inter", "Roboto", sans-serif'
              : '"Montserrat", "Roboto", sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '150%',
            letterSpacing: '0%',
            marginBottom: '0',
          }}
        >
          {subTitle}
        </Typography>
      </ContainerWrapper>
    </div>
  );
}
