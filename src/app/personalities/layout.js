import localFont from "next/font/local";
import "../globals.css";
import { TypeProvider } from '../contexts/TypeContext';

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "URANAI",
  description: "URANAI Your Personality",
};

export default function PersonalitiesLayout({ children }) {
  return (
      <div>
        {children}
      </div>
  );
}
