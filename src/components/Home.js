import React from "react";

function Home() {
  return (
    <div style={containerStyle}>
      <div style={contentBoxStyle}>
        <h1 style={titleStyle}>About the Project</h1>
        <p style={{ fontSize: "18px", maxWidth: "600px", margin: "auto" }}>
          This project utilizes <b>AI-powered image segmentation</b> to automatically detect objects in images.
          It provides <b>precise JSON outputs</b> for applications like object recognition and image analysis.
        </p>
      </div>
    </div>
  );
}

// Styles
const containerStyle = { paddingTop: "80px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" };
const contentBoxStyle = { backgroundColor: "rgba(183, 113, 229, 0.9)", padding: "40px", borderRadius: "12px", boxShadow: "0px 8px 16px rgba(70, 53, 177, 0.3)", backdropFilter: "blur(10px)", maxWidth: "80%", color: "#000", textAlign: "center" };
const titleStyle = { fontSize: "30px", fontWeight: "bold", marginBottom: "20px" };

export default Home;