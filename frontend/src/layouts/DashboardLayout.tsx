import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 pl-64 p-8 max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
}