import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./WelcomePage.css";

function WelcomePage() {
  const [clickedLetters, setClickedLetters] = useState("");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const secretSequence = "easyandover";
  const videoRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (clickedLetters.slice(-secretSequence.length) === secretSequence) {
      videoRef.current.play();
    }
  }, [clickedLetters, secretSequence]);

  const text =
    "Offering easy access to earnings reports, news, and financial data of over 2,500 companies";
  const words = text.split(" ");

  const handleWordClick = (word) => {
    setClickedLetters((prevLetters) => prevLetters + word.toLowerCase());
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsVideoPlaying(true); 
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  function handleSubmit() {
    history.push("/login");
  }

  return (
    <div className={`bodys ${isVideoPlaying ? "bodys-top-align" : ""}`}>
      <div className="page-content">
        <div className="content-wrapper">
          <div className="market-title">
            <h3 className="market-watchers">Market Watcher</h3>
          </div>
          <div style={{ color: "white" }}>
            <h3
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              {words.map((word, index) => (
                <span
                  key={index}
                  onClick={() => handleWordClick(word)}
                  style={{ margin: "0 5px" }}
                >
                  {word}
                </span>
              ))}
            </h3>
            {clickedLetters.slice(-secretSequence.length) ===
              secretSequence && (
              <div className="video-container shake">
                <video
                  className="codClip"
                  ref={videoRef}
                  onClick={togglePlayPause}
                  loop
                  muted
                  src="/newvid.mp4"
                  type="video/mp4"
                ></video>
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                onClick={handleSubmit}
                className="btn"
                type="submit"
                name="submit"
                style={{
                  borderRadius: "25px",
                  width: "200px",
                  height: "40px",
                  fontSize: "1.3rem",
                  color: "white",
                  fontWeight: "700",
                  background: "rgb(34,193,195)",
                  background: "black",
                  border: "0px",
                  cursor: "pointer",
                  transition: "opacity 0.25s ease-out",
                }}
                onMouseOver={(event) => (event.target.style.opacity = "0.7")}
                onMouseOut={(event) => (event.target.style.opacity = "1")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
