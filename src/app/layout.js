import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'WeatherSense',
  description: 'Real-time weather updates and forecasts with beautiful visualizations',
  keywords: ['weather', 'forecast', 'temperature', 'climate', 'meteorology'],
  authors: [{ name: 'Ratnesh Kumar Sharma' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
