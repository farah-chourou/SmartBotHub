import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Box,
} from "@mui/material";
import Editor from "@monaco-editor/react";
import axios from "axios";

const languageOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "java", label: "Java" },
  { value: "python", label: "Python" },
];

function Index() {
  const [sourceLanguage, setSourceLanguage] = useState("javascript");
  const [sourceScript, setSourceScript] = useState("");
  const [translatedLanguage, setTranslatedLanguage] = useState("javascript");
  const [translatedScript, setTranslatedScript] = useState("");
  const [translationPrompt, setTranslationPrompt] = useState(
    "Write a function in"
  );

  const editorRef = useRef(null);

  const handleSourceLanguageChange = (event) => {
    setSourceLanguage(event.target.value);
  };

  const handleTranslatedLanguageChange = (event) => {
    setTranslatedLanguage(event.target.value);
  };

  const handleSourceScriptChange = (value) => {
    setSourceScript(value);
  };

  const handleTranslationPromptChange = (value) => {
    setTranslationPrompt(value);
  };

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const handleTranslate = async () => {
    try {
      const response = await axios.post(
        "https://api.edenai.run/v2/text/code_generation",
        {
          providers: "google",
          prompt: `${sourceScript} `,
          instruction: `translate this code to    ${translatedLanguage} code`,
          temperature: 0.1,
          max_tokens: 500,
          fallback_providers: "",
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDcwYTUxZDYtNGE5Zi00YmFlLWIxNzktN2ZkYTg1ZjMyMDE2IiwidHlwZSI6ImFwaV90b2tlbiJ9.j2Ier71HjqT0o_QJNgwOtueKK-O4FHLYfvZXvxHWex4",
          },
        }
      );
      console.log(response.data.google.generated_text);
      setTranslatedScript(response.data.google.generated_text);
    } catch (error) {
      console.error("Error transdlating code:", error);
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
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            sx={{ color: "#fff", textAlign: "center" }}
            p={3}
          >
            Input
          </Typography>
          <Box sx={{ color: "#fff", marginBottom: 1 }}>
            <Typography variant="p" gutterBottom>
              Select Source Language
            </Typography>
          </Box>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <Select
              labelId="source-language-select-label"
              id="source-language-select"
              value={sourceLanguage}
              label="Source Language"
              onChange={handleSourceLanguageChange}
              sx={{ backgroundColor: "#333333", color: "white" }}
            >
              {languageOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#1E1E1E" }}>
            {/* Code Editor for Source Language */}
            <Editor
              height="40vh"
              theme="vs-dark"
              language={sourceLanguage}
              value={sourceScript}
              options={{
                selectOnLineNumbers: true,
              }}
              onMount={handleEditorDidMount}
              onChange={handleSourceScriptChange}
            />

            {/* Translate Button */}
            <Button
              variant="contained"
              onClick={handleTranslate}
              sx={{ marginTop: 2, backgroundColor: "#F15A29" }}
            >
              Translate
            </Button>
          </Paper>
        </Grid>
        {/* Second Grid for Translated Language and Script Display */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            sx={{ color: "#fff", textAlign: "center" }}
            p={3}
          >
            Output
          </Typography>
          <Box sx={{ color: "#fff", marginBottom: 1 }}>
            <Typography variant="p" gutterBottom>
              Select Translated Language
            </Typography>
          </Box>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <Select
              labelId="translated-language-select-label"
              id="translated-language-select"
              value={translatedLanguage}
              label="Translated Language"
              onChange={handleTranslatedLanguageChange}
              sx={{ backgroundColor: "#333333", color: "white" }}
            >
              {languageOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#1E1E1E" }}>
            {/* Code Editor for Translated Language */}
            <Editor
              height="40vh"
              theme="vs-dark"
              language={translatedLanguage}
              value={translatedScript}
              options={{
                selectOnLineNumbers: true,
              }}
              onMount={handleEditorDidMount}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Index;
