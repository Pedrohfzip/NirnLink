import { Header } from "@/components/Header";
import { LeftSideBar } from "@/components/LeftSideBar";
import { RightSideBar } from "@/components/RightSideBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 w-full overflow-hidden">
        <LeftSideBar />
        <main className="flex-1 min-w-0 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {children}
        </main>
        <RightSideBar />
      </div>
    </div>
  );
}