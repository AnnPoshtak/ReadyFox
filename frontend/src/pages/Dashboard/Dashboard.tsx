import { useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import Main from "./components/Main";
import Quizzes from "./components/Quizzes";

export default function Dashboard() {
  const [tab, setTab] = useState<"dashboard" | "quizzes" | "materials" | "results">("dashboard");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar tab={tab} setTab={setTab} />

      <main className="flex-1 pl-64 p-8 max-w-7xl">
        {tab === "dashboard" && <Main />}
        {tab === "quizzes" && <Quizzes />}
        {tab === "materials" && <div>Materials Content</div>}
        {tab === "results" && <div>Results Content</div>}
      </main>
    </div>
  );
}