import { ThemeProvider } from "@/components/theme-provider";
import { Lora, Geist, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const lora = Lora({
    subsets: ["latin"],
    variable: "--font-lora",
    style: ["normal", "italic"]
});

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-geist"
});

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    variable: "--font-ibm-plex-mono",
    weight: ["400"]
});

function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="en" className={`${lora.variable} ${geist.variable}
            ${ibmPlexMono.variable} antialiased box-border`} suppressHydrationWarning>
            <body className="[&>div]:max-w-384 flex flex-col items-center
                bg-(--background)">
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}

export default RootLayout;
