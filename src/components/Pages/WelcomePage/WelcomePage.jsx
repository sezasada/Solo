import { useHistory } from "react-router-dom";
import backgroundImage from "./Back.jpeg";
import './WelcomePage.css';

function WelcomePage() {
    const history = useHistory();

    function handleSubmit() {
        history.push('/landing')
    }

    return (
        <div className="welcome-container">
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="col-md-6 offset-md-3" style={{color: 'white', paddingBottom: '300px'}}>
                    <h2>Welcome To Market Watcher</h2>
                    <h3>The easiest way to view financial reports</h3>
                    <button className="btn btn-primary" onClick={handleSubmit}>Go</button>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage;
