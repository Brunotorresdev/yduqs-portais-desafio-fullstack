'use client';

import { Banner } from '@/components/layout/Banner';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Box, Typography, Skeleton, useTheme, useMediaQuery } from '@mui/material';
import { usePageOptions } from './hooks/usePageOptions';
import CardOptions from './components/CardOptions';
import { ContainerWrapper } from '@/components/layout/ContainerWrapper';

export default function PageOption() {
  const { data, isLoading, isFetched } = usePageOptions();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <Header />
      <Banner
        title="Vamos começar, escolha as opções do seu curso"
        subTitle="Use os filtros para saber o preço do seu curso e fazer sua inscrição."
      />
      <ContainerWrapper>
        {!isMobile && (
          <>
            {isLoading ? (
              <Skeleton variant="text" width={220} height={32} sx={{ mb: 2 }} />
            ) : (
              <Typography
                sx={{ marginBottom: '16px', padding: '0 10px' }}
                variant="h6"
                component="h2"
              >
                {data?.data?.length || '0'} opções encontradas
              </Typography>
            )}
          </>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'center' : 'flex-start',
            padding: '0 10px',
          }}
        >
          {isLoading ? (
            <>
              <Skeleton variant="rectangular" width={300} height={300} sx={{ borderRadius: 2 }} />
              <Skeleton variant="rectangular" width={300} height={300} sx={{ borderRadius: 2 }} />
            </>
          ) : (
            isFetched && data?.data.map((item: any) => <CardOptions key={item.id} item={item} />)
          )}
        </Box>
      </ContainerWrapper>

      <div style={{ backgroundColor: '#002F9D', marginTop: '56px' }}>
        <Footer />
      </div>
    </Box>
  );
}
