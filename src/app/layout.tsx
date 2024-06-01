import { ReactNode } from 'react';
import '../styles/globals.css';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="nl">
      <head>
        <title>TransVergelijk</title>
        <meta name="description" content="Vergelijk wachttijden van verschillende ziekenhuizen." />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
