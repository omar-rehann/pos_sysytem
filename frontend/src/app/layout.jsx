import { Geist, Geist_Mono } from "next/font/google";
import "./styles/all.css"
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "POS System",
  description: "A modern Point of Sale system for managing products, customers, orders, invoices, and sales.",
};


export default function RootLayout({ children }) {
  return (
  <html
  lang="ar"
  dir="ltr"
  className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
>
  <head>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    />

    <link
      href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;700&display=swap"
      rel="stylesheet"
    />
  </head>

  <body className="min-h-full flex flex-col font-[Cairo]">
   {children}
  </body>
</html>
  );
}
