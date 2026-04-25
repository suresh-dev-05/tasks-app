import type { Metadata } from 'next';
import { AppNav } from '../components/app-nav';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tasks App',
  description: 'Simple full-stack tasks app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-shape bg-shape-1" aria-hidden="true" />
        <div className="bg-shape bg-shape-2" aria-hidden="true" />
        <main className="app-shell">
          <header className="header-card">
            <div>
              <p className="eyebrow">Task Manager</p>
              <h1 className="brand-title">Plan. Track. Ship.</h1>
            </div>
            <AppNav />
          </header>
          <section className="content-card">{children}</section>
        </main>
      </body>
    </html>
  );
}
