import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="km">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cormorant+Garamond:wght@400;600&family=Kantumruy+Pro:wght@300;400;600;700&family=Moul&family=MonteCarlo&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
