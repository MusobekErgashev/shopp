'use client'
import Header from "@/components/Header";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient())
  
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="px-20 py-15 mt-7">
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </div>
      </body>
    </html>
  );
}