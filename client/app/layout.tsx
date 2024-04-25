import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/store/provider";
import { SocketProvider } from "@/components/Providers/SocketProvider";
import { PeerProvider } from "@/components/Providers/PeerProvider";
import store from "@/store/store";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "QuickHire",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Toaster />
                    <Providers>
                        <SocketProvider>
                            <PeerProvider>{children}</PeerProvider>
                        </SocketProvider>
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
