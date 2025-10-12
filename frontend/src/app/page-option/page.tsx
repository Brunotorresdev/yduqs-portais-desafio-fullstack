'use client';

import { Banner } from '@/components/layout/Banner';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Button, Typography } from '@mui/material';
import { usePageOptions } from './hooks/usePageOptions';

export default function PageOption() {
  const { data, isLoading, error } = usePageOptions();
  console.log("🚀 ~ PageOption ~ data:", data)
  
  return (
    <div>
      <Header />
      <Banner
        title="Vamos começar, escolha as opções do seu curso"
        subTitle="Use os filtros para saber o preço do seu curso e fazer sua inscrição."
      />
      <Typography variant="h4" gutterBottom>
        MUI + Next.js funcionando!
      </Typography>
      <Button variant="contained" color="primary">
        Clique aqui
      </Button>
      <div style={{ backgroundColor: '#001F66' }}>
        <Footer />
      </div>
    </div>
  );
}
