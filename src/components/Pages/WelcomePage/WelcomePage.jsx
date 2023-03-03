import { useHistory } from "react-router-dom";
import backgroundImage from "./Back.jpeg";
import './WelcomePage.css';

function WelcomePage() {
    const history = useHistory();

    function handleSubmit() {
        history.push('/login')
    }

    return (
        <div className="bodys">
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="col-md-6 offset-md-3" style={{ color: 'white', paddingBottom: '300px', marginRight: '200px' }}>
                    <h2>Welcome To Market Watcher</h2>
                    <h3>Offering easy access to earnings reports, news, and financial data of over 2,500 companies</h3>
                    <button className="btn btn-primary" onClick={handleSubmit}>Go</button>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage;
