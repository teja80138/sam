import React from "react";

const teamMembers = [
    { name: "Teja Sai Redddy", role: "Deeplearning Engineer", image: "/Team/Teja.jpg" },
    { name: "Ravi Kumar", role: "", image: "/team/bob.jpg" },
    { name: "Nikitha", role: "", image: "/team/charlie.jpg" },
    { name: "Harshini", role: "", image: "/team/david.jpg" },
    { name: "Prasunamba", role: "", image: "/team/eve.jpg" }
  ];
  

function About() {
  return (
    <div style={containerStyle}>
      <div style={contentBoxStyle}>
        <h2 style={titleStyle}>Meet Our Team</h2>
        <div style={teamContainerStyle}>
          {teamMembers.map((member, index) => (
            <div key={index} style={teamCardStyle}>
              <img src={member.image} alt={member.name} style={teamImageStyle} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// **Styles**
const containerStyle = { paddingTop: "80px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" };
const contentBoxStyle = { backgroundColor: "rgba(183, 113, 229, 0.9)", padding: "40px", borderRadius: "12px", boxShadow: "0px 8px 16px rgba(70, 53, 177, 0.3)", backdropFilter: "blur(10px)", maxWidth: "80%", color: "#000", textAlign: "center" };
const titleStyle = { fontSize: "30px", fontWeight: "bold", marginBottom: "20px" };
const teamContainerStyle = { display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginTop: "20px" };
const teamCardStyle = { textAlign: "center", padding: "10px", maxWidth: "150px" };
const teamImageStyle = { width: "100px", height: "100px", borderRadius: "50%", marginBottom: "10px", objectFit: "cover" };

export default About;
