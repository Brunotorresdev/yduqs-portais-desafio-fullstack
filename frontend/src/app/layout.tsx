import type { Metadata } from 'next';
import { CssBaseline } from '@mui/material';
import { Providers } from '@/components/providers/Providers';
import '../styles/globals.css'; 

export const metadata: Metadata = {
  title: 'Teste YDUQS - Next.js',
  description: 'Aplicação Front-end desenvolvida em Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <CssBaseline />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
