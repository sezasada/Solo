import { useHistory } from "react-router-dom";

function welcomePage() {
    const history = useHistory();

    function handleSubmit() {
        history.push('/landing')
    }

    return (
        <div>
            <h2>Welcome</h2>
            <button onClick={handleSubmit}>Go</button>
        </div>
    )
}


export default welcomePage;