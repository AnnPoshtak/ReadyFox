import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 min-w-0 pl-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}