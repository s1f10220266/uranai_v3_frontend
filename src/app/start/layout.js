import localFont from "next/font/local";
import "../globals.css";
import { AuthProvider } from "../contexts/AuthContext";


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
  title: "URANAI START",
  description: "URANAI STSRT SOON",
};

export default function StartLayout({ children }) {
  return (

    <AuthProvider >
    <div>
      {children}
    </div>
    </AuthProvider>

  );
}
