import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./ChatPage.css";
import TelegramIcon from "@mui/icons-material/Telegram";
import { TextField, FormControl, Button } from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
function ChatPage() {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const generatedText = useSelector(
    (store) => store.earningsReducer.generatedText
  );
  const user = useSelector((store) => store.user.username);
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
  const renderChatContent = () => {
    if (chatHistory.length === 0) {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              textAlign: "center",
              width: "70%",
              paddingTop: "100px",
              fontSize: "20px",
            }}
          >
            <p>
              ChatGPT is an AI language model that can be used to analyze and
              understand financial data. Trained on a vast dataset of text from
              the internet, books, and other sources, it can engage in natural
              language conversations with humans and provide information on
              various topics, including finance.
            </p>
            <p>
              With advanced machine learning algorithms, ChatGPT can analyze the
              context of a conversation and generate appropriate responses to
              questions about financial data. It has the potential to
              revolutionize the way we analyze and understand financial
              information, helping us to solve complex problems with its vast
              knowledge base and analytical capabilities.
            </p>
            <p>
              As it constantly learns and improves through interactions with
              humans, ChatGPT can become an invaluable tool for anyone seeking
              to gain insights into the world of finance.
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <></> // ... (the rest of the code for displaying chat history. Not set up yet)
      );
    }
  };
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
          <div style={{ width: "100%" }}>
            {renderChatContent()}
            {chatHistory.map((chat, index) => (
              <div key={index}>
                <div
                  style={{
                    paddingLeft: "20%",
                    paddingTop: "1vh",
                    paddingBottom: "1vh",
                    paddingRight: "20%",
                    width: "100%",
                  }}
                >
                  <div style={{ textAlign: "left", width: "100%" }}>
                    <div
                      style={{
                        backgroundColor: "grey",
                        color: "white",
                        display: "inline-block",
                        padding: "0.4em",
                        borderRadius: "5px",
                        marginRight: "0.5em",
                      }}
                    >
                      {user}
                    </div>

                    {chat.userText}
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "#D3D3D3",
                    paddingLeft: "20%",
                    paddingTop: "1.8vh",
                    paddingBottom: "1.8vh",
                    paddingRight: "20%",
                    width: "100%",
                  }}
                >
                  <div style={{ textAlign: "left", width: "100%" }}>
                    <SmartToyIcon
                      style={{
                        fontSize: "30px",
                        marginRight: "0.5em",
                      }}
                    />
                    {chat.aiText}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="input-containersssss" style={{ width: "80%" }}>
            <FormControl
              sx={{
                width: "100%",
                maxWidth: "800px",
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
                placeholder="Send a Message."
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
