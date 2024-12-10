import "./globals.css";
import SideBar from "./Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full mx-1 flex">
        <SideBar />
        <main className="w-full h-full">{children}</main>
      </body>
    </html>
  );
}
