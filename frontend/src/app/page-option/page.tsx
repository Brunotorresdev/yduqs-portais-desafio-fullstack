'use client';

import { Banner } from '@/components/layout/Banner';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Box, Typography } from '@mui/material';
import { usePageOptions } from './hooks/usePageOptions';
import CardOptions from './components/CardOptions';
import { ContainerWrapper } from '@/components/layout/ContainerWrapper';

export default function PageOption() {
  const { data, isLoading, error, isFetched } = usePageOptions();

  return (
    <div>
      <Header />
      <Banner
        title="Vamos começar, escolha as opções do seu curso"
        subTitle="Use os filtros para saber o preço do seu curso e fazer sua inscrição."
      />
      <ContainerWrapper>
        <Typography variant="h6" component="h2">
          {data?.data?.length || '0'} opções encontradas
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          {isFetched && data?.data.map((item: any) => <CardOptions key={item.id} item={item} />)}
        </Box>
      </ContainerWrapper>

      <div style={{ backgroundColor: '#002F9D' }}>
        <Footer />
      </div>
    </div>
  );
}
