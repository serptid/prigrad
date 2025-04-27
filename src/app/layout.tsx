"use client"
import SPWMini from 'spwmini/client';
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const spm = new SPWMini('8346d39a-bc0e-48b8-9f4b-85c37a32e55a')
    spm.initialize()
  }, []);


  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
