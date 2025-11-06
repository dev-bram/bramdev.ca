import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Bram | Développement Web Réactif & Sur Mesure",
  description: "Développement Web Réactif & Sur Mesure",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
