import type { Metadata } from "next";
import { CssBaseline } from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meu App",
  description: "Exemplo com MUI e Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CssBaseline />
        {children}
      </body>
    </html>
  );
}
