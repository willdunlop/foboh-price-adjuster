import "../globals.css";
import { Sidebar } from "@/components/Sidebar";
import { AppBar } from "@/components/AppBar";


export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex">
      <Sidebar />
      <div className="w-full h-full">
        <AppBar />
        <div className="overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
