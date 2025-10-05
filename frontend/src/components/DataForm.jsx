import Form from 'react-bootstrap/Form';
import  Button  from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/DataForm.css';
import { useContext, useEffect } from 'react';
import { Context } from './context/Context';

const DataForm = () => {
    const { formSubmitHandler, setZones, dangerousAsteroids } = useContext(Context);

    useEffect(() => {
        console.log('Dangerous Asteroids:', dangerousAsteroids);
    }, [dangerousAsteroids]);

    function daytimeToTime(daytime) {
    // Example: daytime = 12.34 (12 is the day, 34 is the fraction in 0...100)
    const [date, fraction] = daytime.split('.');
    const fractionNum = Number('0.' + (fraction.padEnd(2, '0'))); // e.g. '34' -> 0.34
    const dayFraction = Number(fraction) / 100; // 34/100 = 0.34

    const totalMinutes = Math.round(dayFraction * 24 * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${date} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

    return (
        <div className='data-form'>
            <Form className='data-form-container' onSubmit={formSubmitHandler}>
                <Form.Group className="mb-3" controlId="diameter">
                    <Form.Label>Diameter (m)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter diameter in meters"
                        name="diameter"
                        required
                    />
                </Form.Group>
            
                <Form.Group className="mb-3" controlId="composition">
                    <Form.Label>Composition</Form.Label>
                    <Form.Select aria-label="Default select example" name="composition">
                        <option value="1">rocky</option>
                        <option value="2">metallic</option>
                        <option value="3">icy</option>
                    </Form.Select>
                </Form.Group>
            
                <Form.Group className="mb-3" controlId="velocity">
                    <Form.Label>Velocity (km/s)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter velocity in km/s"
                        name="velocity"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="distance_to_impact">
                    <Form.Label>Distance to Impact (km)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter distance to impact in km"
                        name="distance_to_impact"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="angle">
                    <Form.Label>Entry Angle (degrees)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter entry angle in degrees"
                        name="angle"
                        required
                    />
                </Form.Group>

                <Button type="submit">Calculate</Button>

                <div className='dangerous-asteroids' style={{ zIndex: 1005 }}>
                    <h3 className="dangerous-asteroids-title">Dangerous Asteroids:</h3>
                    <table className="dangerous-asteroids-table">
                        <thead>
                            <tr>
                                <th className="dangerous-asteroids-th">Name</th>
                                <th className='dangerous-asteroids-th'>Impact Probability</th>
                                <th className="dangerous-asteroids-th">Close Approach Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dangerousAsteroids && dangerousAsteroids.map((asteroid, index) => (
                                <tr className="dangerous-asteroids-tr" key={index}>
                                    <td className="dangerous-asteroids-td">{asteroid.name}</td>
                                    <td className="dangerous-asteroids-td">{asteroid.ip}</td>
                                    <td className="dangerous-asteroids-td">{daytimeToTime(asteroid.date) + " UTC"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Form>
        </div>
    )
}

export default DataForm