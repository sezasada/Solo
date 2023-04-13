import { useHistory } from "react-router-dom";
import backgroundImage from "./Back.jpeg";
import "./WelcomePage.css";

function WelcomePage() {
  const history = useHistory();

  function handleSubmit() {
    history.push("/login");
  }

  return (
    <div className="bodys">
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
            }}
          >
            Offering easy access to earnings reports, news, and financial data
            of over 2,500 companies
          </h3>
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
  );
}

export default WelcomePage;
