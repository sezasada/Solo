import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
function ChatPage() {
  const [inputText, setInputText] = useState("");
  const generatedText = useSelector(
    (store) => store.earningsReducer.generatedText
  );
  const dispatch = useDispatch();

  const generateTextRequest = (text) => ({
    type: "FETCH_OPEN_AI",
    payload: text,
  });

  const handleSubmit = () => {
    dispatch(generateTextRequest(inputText));
  };
  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={handleSubmit}>Generate Text</button>
      <div>
        <div>{inputText}</div>
        <div>{generatedText}</div>
      </div>
    </div>
  );
}

export default ChatPage;
