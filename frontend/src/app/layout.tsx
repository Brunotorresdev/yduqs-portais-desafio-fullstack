import type { Metadata } from 'next';
import { CssBaseline } from '@mui/material';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers/Providers';

const inter = Inter({ subsets: ['latin'] });

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
