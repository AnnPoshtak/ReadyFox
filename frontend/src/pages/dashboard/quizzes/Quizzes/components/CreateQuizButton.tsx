import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const CreateButton = () => {
  const navigate = useNavigate()
  return (

    <div className="group fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center">
      <div className="pointer-events-none opacity-0 translate-y-2 scale-90 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 mb-2.5 rounded-xl bg-brand-soft px-3.5 py-1.5 text-xs font-bold text-brown border border-outline-hover shadow-md whitespace-nowrap relative after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-brand-soft">
        Створіть свій квіз
      </div>

      <button
        aria-label="Створити свій квіз"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-shadow transition-all duration-300 ease-out hover:bg-brand-hover hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer border border-brand-hover"
        onClick={() => {
          navigate("new");
        }}
      >
        <Plus className="h-7 w-7 transition-transform duration-300 ease-out group-hover:rotate-90" />
      </button>
    </div>
  )
}