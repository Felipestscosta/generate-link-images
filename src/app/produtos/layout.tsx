import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BRK | Auto Cadastro - Página de Produtos Bling ",
  description: "Listagem, análise e gerenciamento de produtos no CRM Bling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`flex h-screen w-screen justify-center items-center ${inter.className}`}>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
