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
            <div className='titl'>
                <h3 className="market-watchers">Market Watcher</h3>
            </div>
            <div style={{ color: 'white', marginLeft: '300px', paddingTop: '30px' }}>
                <h3>Offering easy access to earnings reports, news, and financial data of over 2,500 companies</h3>
                <button className="btn btn-dark" onClick={handleSubmit}>Go</button>
            </div>
        </div>
    )
}

export default WelcomePage;
