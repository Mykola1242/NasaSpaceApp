import { useContext } from 'react';
import { Context } from './context/Context';
import Button from 'react-bootstrap/Button';
import '../css/Result.css';

const Result = () => {
    const { clearResults, damageData } = useContext(Context);

    const roundDistance = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(2) + ' km';
        } else {
            return num?.toFixed(0) + ' m';
        }
    }

    return (
        <div className="result-container">
            <h2>Simulation Result</h2>

            {/* Основна інформація */}
            <div>
                <strong>Asteroid Name:</strong> {damageData?.asteroid_name ?? 'N/A'}<br />
                <strong>Mass:</strong> {damageData?.mass_kg?.toLocaleString() ?? 'N/A'} kg<br />
                <strong>Kinetic Energy:</strong> {damageData?.kinetic_energy_joules?.toLocaleString() ?? 'N/A'} J<br />
                <strong>TNT Equivalent:</strong> {damageData?.tnt_equivalent_tons?.toLocaleString() ?? 'N/A'} tons<br />
                <strong>Time to Impact:</strong> {damageData?.time_to_impact_seconds ?? 'N/A'} s
            </div>

            {/* Зони ураження */}
            <div>
                <h3 style={{ textAlign: 'center', marginTop: '16px' }}>Damage Zones:</h3>
                <ul>
                    <li style={{ backgroundColor: 'rgba(255,0,0,0.3)' }}>
                        <strong>Severe:</strong> {roundDistance(damageData?.damage_zones_km?.severe) ?? 'N/A'}
                        <p style={{ color: '#a00' }}>
                            Complete destruction, extreme heat, shockwave, and fireball. Survival unlikely.
                        </p>
                    </li>
                    <li style={{ backgroundColor: 'rgba(255,165,0,0.25)' }}>
                        <strong>Moderate:</strong> {roundDistance(damageData?.damage_zones_km?.moderate) ?? 'N/A'}
                        <p style={{ color: '#b36b00' }}>
                            Severe damage to buildings, broken windows, fires, and injuries likely.
                        </p>
                    </li>
                    <li style={{ backgroundColor: 'rgba(255,255,0,0.2)' }}>
                        <strong>Minor:</strong> {roundDistance(damageData?.damage_zones_km?.minor) ?? 'N/A'}
                        <p style={{ color: '#b3b300' }}>
                            Light structural damage, shattered glass, and possible minor injuries.
                        </p>
                    </li>
                </ul>
            </div>

            <Button onClick={clearResults}>Close</Button>
        </div>
    );
}

export default Result;