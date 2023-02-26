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


    // useEffect(() => {
    //     fetch('https://stocknewsapi.com/api/v1/category?section=general&items=3&page=1&token=9knkgcm8m9iqlnrnj0hyqumlsnpjrocziwvo31mf')
    //         .then(response => response.json())
    //         .then(data => {
    //             setNews(data.data); // update the component state with the API response's data array
    //         })
    //         .catch(error => {
    //             console.error('Error fetching API data:', error);
    //         });
    // }, []); // run the effect only once, on component mount
export default welcomePage;