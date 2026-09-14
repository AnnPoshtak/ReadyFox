import { QuizSocketProvider } from "@/context/QuizSocketContext";
import { Outlet } from "react-router-dom";

function QuizSocket() {
    return (
        <> 
        <QuizSocketProvider>
            <Outlet />
        </QuizSocketProvider>
        </>
    );
}

export default QuizSocket;