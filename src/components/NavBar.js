import React from "react";

function NavBar({ setView }) {
  return (
    <div style={{
      position: "absolute",
      maxHeight: "50px",
      top: "0",
      left: "0",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "rgba(70, 53, 177, 0.8)",
      backdropFilter: "blur(10px)",
      color: "#FFFBCA"
    }}>
      <h2 style={{ marginLeft: "20px", fontSize: "24px", fontWeight: "bold" }}>
        AI Image Segmentation
      </h2>
      <div style={{ marginRight: "20px" }}>
        <a href="#" onClick={() => setView("home")} style={navLinkStyle}>Home</a>
        <a href="#" onClick={() => setView("about")} style={navLinkStyle}>About</a>
        <a href="#" onClick={() => setView("segmentation")} style={navLinkStyle}>Segmentation</a>
        <a href="#" onClick={() => setView("vgg")} style={navLinkStyle}>VGG Format</a>  {/* 🔹 Added VGG Button */}
      </div>
    </div>
  );
}

const navLinkStyle = {
  color: "#FFFBCA",
  margin: "0 15px",
  textDecoration: "none",
  fontWeight: "bold",
  cursor: "pointer"
};

export default NavBar;