import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./ChatPage.css";
import TelegramIcon from "@mui/icons-material/Telegram";
import { TextField, FormControl, Button } from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";

function ChatPage() {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const generatedText = useSelector(
    (store) => store.earningsReducer.generatedText
  );
  const user = useSelector((store) => store.earningsReducer.user);
  const dispatch = useDispatch();

  const generateTextRequest = (text) => ({
    type: "FETCH_OPEN_AI",
    payload: text,
  });

  const handleSubmit = () => {
    dispatch(generateTextRequest(inputText));
  };

  useEffect(() => {
    if (generatedText && inputText) {
      setChatHistory([
        ...chatHistory,
        { userText: inputText, aiText: generatedText },
      ]);
      setInputText("");
    }
  }, [generatedText]);

  return (
    <div className="chatpage">
      <div className="middlechatpage">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ maxWidth: "60%", width: "100%" }}>
            {chatHistory.map((chat, index) => (
              <div key={index}>
                <div style={{ textAlign: "left" }}>
                  User: {user}
                  {chat.userText}
                </div>
                <div style={{ textAlign: "left" }}>AI: {chat.aiText}</div>
              </div>
            ))}
          </div>
          <div className="input-containersssss">
            <FormControl
              sx={{
                "margin-left": "2px",
                "margin-right": "2px",
                "padding-left": "2px",
                "padding-right": "2px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#D3D3D3",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#D3D3D3",
                  },
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "#D3D3D3",
                },
              }}
            >
              <TextField
                sx={{
                  marginBottom: 1,
                  width: 300,
                  "margin-left": "2px",
                  "margin-right": "2px",
                  "padding-left": "2px",
                  "padding-right": "2px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#D3D3D3",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#D3D3D3",
                    },
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "transparent",
                  },
                }}
                id="outlined-basic"
                variant="outlined"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={handleSubmit}>
                        <TelegramIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
