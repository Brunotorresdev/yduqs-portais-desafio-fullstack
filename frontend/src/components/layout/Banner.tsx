import { JSX } from 'react';
import { ContainerWrapper } from './ContainerWrapper';
import { Typography } from '@mui/material';

type BannerProps = {
  title: string;
  subTitle?: string;
};

export function Banner({ title, subTitle }: BannerProps): JSX.Element {
  return (
    <div style={{ padding: '24px 0', backgroundColor: '#144BC8' }}>
      <ContainerWrapper>
        <Typography color="#FFFFFF" variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        <Typography color="#FFFFFF" variant="h6" component="h6" gutterBottom>
          {subTitle}
        </Typography>
      </ContainerWrapper>
    </div>
  );
}
