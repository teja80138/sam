import React from "react";

function VGGAnnotator() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <iframe
        src="/via.html"
        title="VGG Annotator"
        style={{ width: "100%", height: "100vh",marginTop:"0px", border: "none" }}
      ></iframe>
    </div>
  );
}

export default VGGAnnotator;