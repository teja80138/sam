import React, { useState } from "react";
import axios from "axios";

const Segmentation = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [segmentedImages, setSegmentedImages] = useState([]);
  const [segmentationJsons, setSegmentationJsons] = useState([]);
  const [jsonGenerated, setJsonGenerated] = useState(false);

  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    
    const validFiles = files.filter(file => 
      ALLOWED_TYPES.includes(file.type) && file.size <= 5 * 1024 * 1024
    );
    
    if (validFiles.length !== files.length) {
      setError("Some files were invalid. Only PNG or JPEG images under 5MB are allowed.");
      return;
    }
    
    setSelectedFiles([...selectedFiles, ...validFiles]);
    setError(null);
    setJsonGenerated(false);
  };

  const transformSegmentationData = (data) => {
    const transformedData = {};
  
    // Iterate through each file in the segmentation JSON
    Object.keys(data).forEach((fileKey) => {
      const fileData = data[fileKey];
  
      // Map the regions into the new structure
      const transformedRegions = fileData.regions.map(region => ({
        shape_attributes: {
          name:"polyline",
          all_points_x: region.shape_attributes.all_points_x || [],
          all_points_y: region.shape_attributes.all_points_y || []
        }
      }));
  
      // Construct the new file object
      transformedData[fileKey] = {
        filename: fileData.filename,
        size:fileData.size,
        regions: transformedRegions
      };
    });
  
    return transformedData;
  };
  
  const handleSegment = async () => {
    if (selectedFiles.length === 0) {
      setError("Please select images first.");
      return;
    }

    setLoading(true);
    setError(null);
    setJsonGenerated(false);

    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post("https://qpc28cj1-8000.inc1.devtunnels.ms/segment", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Ensure response contains the necessary data
      if (response.data && response.data.segmentation_json) {
        const transformedData = transformSegmentationData(response.data.segmentation_json);
        setSegmentationJsons(transformedData);
      } else {
        setError("Invalid segmentation data received.");
      }
    } catch (error) {
      setError("Error processing images. Please try again.");
      console.error("Segmentation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateJson = () => {
    if (segmentationJsons && Object.keys(segmentationJsons).length > 0) {
      const jsonString = JSON.stringify(segmentationJsons, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "segmentation_data.json";
      a.click();
      URL.revokeObjectURL(url);
      setJsonGenerated(true);
      setSegmentationJsons([])
    } else {
      setError("No segmentation data available.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Image Segmentation</h1>

      <input type="file" accept="image/*" multiple onChange={handleFileChange} />
      
      {error && <p style={styles.error}>{error}</p>}

      <button onClick={handleSegment} disabled={loading || selectedFiles.length === 0} style={styles.button}>
        {loading ? "Processing..." : "Segment"}
      </button>

      <div style={styles.imageContainer}>
        {segmentedImages.map((image, index) => (
          <div key={index}>
            <h2>Segmented Image {index + 1}</h2>
            <img src={image} alt={`Segmented ${index + 1}`} style={styles.image} />
          </div>
        ))}
      </div>

      {segmentationJsons && Object.keys(segmentationJsons).length > 0 && (
        <div style={styles.jsonContainer}>
          <h2>Segmentation Data</h2>
          {/* <pre>{JSON.stringify(segmentationJsons, null, 2)}</pre> */}

          <button onClick={handleGenerateJson} style={styles.jsonButton}>
            {jsonGenerated ? "JSON Downloaded ✅" : "Generate JSON"}
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
  imageContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  image: {
    width: "300px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  jsonContainer: {
    textAlign: "left",
    margin: "20px auto",
    maxWidth: "600px",
    backgroundColor: "#f4f4f4",
    padding: "10px",
    borderRadius: "5px",
    overflowX: "auto",
  },
  jsonButton: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
};

export default Segmentation;
