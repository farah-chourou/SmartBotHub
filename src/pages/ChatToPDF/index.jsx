import React from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

function index() {
  const [chatbotResponse, setChatbotResponse] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);

  const [file, setFile] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleChatbotQuery = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.edenai.run/v2/aiproducts/askyoda/37e03355-e4ad-4125-99d6-268437d791d4/ask_llm",
        {
          query,
          llm_provider: "openai",
          llm_model: "gpt-3.5-turbo-instruct",
          k: 5,
        },
        {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzNkZDQ4N2EtOWM1Zi00ZTY4LWFjMjEtMTRiNGQ3MGZjMGM0IiwidHlwZSI6ImFwaV90b2tlbiJ9.OzMpcRMfFYO1eHLfxF9QDOwcNHbmtBEfpiWPXHatDr4",
            "Content-Type": "application/json",
          },
        }
      );

      const newChat = { question: query, response: response.data?.result };
      console.log(chatHistory);
      setChatHistory((prevHistory) => [...prevHistory, newChat]);
      setQuery(""); // Clear the input field
    } catch (error) {
      console.error("Error fetching data from Eden AI:", error);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { question: query, response: "Error fetching data from Eden AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUploadFile = async () => {
    try {
      setLoadingUpload(true);

      const form = new FormData();
      form.append("provider", "amazon");
      form.append("file", file);

      const uploadOptions = {
        method: "POST",
        url: "https://api.edenai.run/v2/aiproducts/askyoda/37e03355-e4ad-4125-99d6-268437d791d4/add_file",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzNkZDQ4N2EtOWM1Zi00ZTY4LWFjMjEtMTRiNGQ3MGZjMGM0IiwidHlwZSI6ImFwaV90b2tlbiJ9.OzMpcRMfFYO1eHLfxF9QDOwcNHbmtBEfpiWPXHatDr4",
          "Content-Type": `multipart/form-data`,
        },
        data: form,
      };

      const uploadResponse = await axios.request(uploadOptions);

      console.log("File uploaded successfully:", uploadResponse.data);

      // Now you can proceed with your chatbot query or any other logic
    } catch (error) {
      console.error("Error uploading file to Eden AI:", error);
    } finally {
      setLoadingUpload(false);
    }
  };
  return (
    <Container
      sx={{
        marginTop: 2,
        maxWidth: "100%",
        color: "#fff",
      }}
    >
      <Grid container spacing={2}>
        {/* First Grid for File Upload */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              backgroundColor: "#444",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
              File Upload
            </Typography>
            <input type="file" onChange={handleFileChange} />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleUploadFile}
              disabled={loadingUpload}
            >
              Upload
            </Button>
          </Paper>
        </Grid>

        {/* Second Grid for Chatbot */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#444" }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
              Chatbot
            </Typography>

            {/* Chat History */}
            <div>
              {chatHistory.map((chat, index) => (
                <Paper
                  key={index}
                  elevation={3}
                  sx={{
                    marginTop: 2,
                    padding: 2,
                    border: "1px solid #ccc",
                    borderRadius: 1,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#555", // Adjust background color for individual chat items
                  }}
                >
                  <Typography variant="" sx={{ color: "#fff" }}>
                    <b style={{ fontWeight: "bold" }}>You:</b> {chat.question}
                  </Typography>{" "}
                  <br></br>
                  <Typography variant="" sx={{ color: "#fff" }}>
                    <b sx={{ fontWeight: "bold" }}>Response:</b> {chat.response}
                  </Typography>
                </Paper>
              ))}
            </div>

            <div
              style={{ display: "flex", alignItems: "center", marginTop: 15 }}
            >
              <TextField
                label="Ask Me  about your pdf "
                variant="outlined"
                size="small"
                fullWidth
                value={query}
                onChange={handleQueryChange}
                sx={{ marginRight: 2, backgroundColor: "#666", color: "#fff" }}
              />
              <button onClick={handleChatbotQuery} disabled={loading}>
                {loading ? "Loading..." : "Ask"}
              </button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default index;
