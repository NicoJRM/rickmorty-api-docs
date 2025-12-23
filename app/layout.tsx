// app/layout.tsx
import "./globals.css";
import { AppHeader } from "@/components/layout/AppHeader";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
