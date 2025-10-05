import { useContext } from 'react';
import { Context } from './context/Context';
import Button from 'react-bootstrap/Button';
import '../css/Result.css';

const Result = () => {
    const { clearResults, damageData } = useContext(Context);

    return (
        <div className="result-container">
            <h2>Simulation Result</h2>

            <div>
                <pre>{JSON.stringify(damageData, null, 2)}</pre>
            </div>

            <Button onClick={clearResults}>Close</Button>
        </div>
    );
}

export default Result;