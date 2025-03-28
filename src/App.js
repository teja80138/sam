import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Segmentation from "./components/Segmentation";
import VGGAnnotator from "./components/VGGAnnotator";  // 🔹 Added VGG Page

function App() {
  const [view, setView] = useState("home");

  // 🔹 Apply background only for "home" and "about"
  const backgroundStyle = (view === "home" || view === "about")
    ? {
        backgroundImage: "url('/sam.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }
    : { height: "100vh", backgroundColor: "#fff" }; // White background for other pages

  return (
    <div style={{ overflowX: "hidden", ...backgroundStyle }}>
      {/* Navbar - Always on Top */}
      <NavBar setView={setView} />
      
      {/* Content Appears Below */}
      <div style={{ marginTop: "50px", paddingBottom: "40px" }}>
        {view === "home" && <Home />}
        {view === "about" && <About />}
        {view === "segmentation" && <Segmentation />}
        {view === "vgg" && <VGGAnnotator />}
      </div>
    </div>
  );
}

export default App;