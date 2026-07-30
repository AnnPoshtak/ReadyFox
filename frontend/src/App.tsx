import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home/Home"
import FeaturesPage from "./pages/Features/Features"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import HowItWorksPage from "./pages/HowItWorks/HowItWorks"
import AboutPage from "./pages/AboutPage/AboutPage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
