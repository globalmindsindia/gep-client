import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatIsGEP from "@/components/WhatIsGEP";
import WhyJoin from "@/components/WhyJoin";
import YourRole from "@/components/YourRole";
import Services from "@/components/Services";
import Trust from "@/components/Trust";
import Footer from "@/components/Footer";
import RegistrationModal from "@/components/RegistrationModal";
import GlobalBackground from "@/components/GlobalBackground";
import ErrorReporter from "@/components/ErrorReporter";

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onRegisterClick={() => setIsModalOpen(true)} />
      <Hero onRegisterClick={() => setIsModalOpen(true)} />
      <div className="relative z-20 bg-transparent">
        <WhatIsGEP />
        <WhyJoin />
        <YourRole />
        <Services />
        <Trust />
        <Footer />
      </div>
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <div className="antialiased bg-transparent">
      <GlobalBackground />
      <ErrorReporter />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;