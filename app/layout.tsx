'use client';
import '../styles/globals.css'
import {QueryClient, QueryClientProvider} from "react-query"
import {SessionProvider} from "next-auth/react"
import Script from 'next/script';

const queryClient = new QueryClient();

type LayoutComponent<P = {}> = (props: LayoutProps & P) => JSX.Element;

interface LayoutProps  {
  children: React.ReactNode;
  session: any;
};

export default function RootLayout({ children, session,...rest }: LayoutProps ): JSX.Element {

  return (
    <html lang="en">
      <Script src='https://upload-widget.cloudinary.com/global/all.js' type="text/javascript"></Script>
      <SessionProvider session={session}>
        <head />
        <QueryClientProvider client={queryClient}>
          <body>{children}</body>
        </QueryClientProvider>
      </SessionProvider>
      
    </html>
  )
}
