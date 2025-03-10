import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import { TypeProvider } from "./contexts/TypeContext";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "URANAI",
  description: "URANAI FUTURE SCENARIO",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
    <TypeProvider>
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        {children}
      </body>
    </html>
    </TypeProvider>
    </AuthProvider>

  );
}
