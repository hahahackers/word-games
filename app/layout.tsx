import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Word Games',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <ul className="flex gap-4 m-2 uppercase">
            <li>
              <a href="hangman">Hangman</a>
            </li>
            <li>
              <a href="wordle">Wordle</a>
            </li>
          </ul>
        </nav>

        {children}
      </body>
    </html>
  );
}
