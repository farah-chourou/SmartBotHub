import React from "react";
import Grid from "@mui/material/Grid";
import farahImage from "../assets/farah.png";
import talelImage from "../assets/talel.png";

const containerStyle = {
  position: "relative",
  textAlign: "center",
};

const imageStyle = {
  height: "12%",
};
const imageStyle2 = {
  height: "8%",
};
const titleStyle = {
  marginTop: "10px",
  color: "white",
  fontWeight: "bold",
  justifyContent: "center",
};

const imageContainerStyle = {
  marginTop: "20px",
  animation: "moveImages 5s infinite alternate", // Apply the animation
};

function Home() {
  return (
    <div style={containerStyle}>
      <div>
        <h1>Welcome to Smart Bot HUB AI </h1>
      </div>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={imageContainerStyle}
      >
        <Grid item xs={6} sm={3}>
          <img src={farahImage} alt="Image 1" style={imageStyle2} />
          <div style={titleStyle}>Farah...</div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <img src={talelImage} alt="Image 2" style={imageStyle} />
          <div style={titleStyle}>Talel...</div>
        </Grid>
        {/* Add more Grid items for additional images and titles */}
      </Grid>
    </div>
  );
}

export default Home;
