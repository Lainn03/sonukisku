import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    title: "Sonu Kisku | Video Editor",
    description: "Portfolio of Sonu Kisku – Creative and professional video editing services for brands, creators, and businesses.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
                <Toaster position="top-right" />
            </body>
        </html>
    );
}
