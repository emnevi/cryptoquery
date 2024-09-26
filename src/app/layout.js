import './globals.css'; // Import global CSS (with Tailwind included)
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'Crypto Wallet Checker',
  description: 'A tool to check crypto wallet information',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
