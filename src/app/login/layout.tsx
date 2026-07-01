import "@/app/globals.css";

function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
    return (
        <div className="w-screen h-screen bg-[url(/tree-pattern.webp)] bg-fixed bg-center
            bg-cover">
            {children}
        </div>
    );
}

export default RootLayout;
