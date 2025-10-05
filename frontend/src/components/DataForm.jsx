import Form from 'react-bootstrap/Form';
import  Button  from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/DataForm.css';
import { useContext } from 'react';
import { Context } from './context/Context';

const DataForm = () => {
    const { formSubmitHandler, setZones } = useContext(Context);

    return (
        <div>
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

                <Button type="submit">Submit</Button>
                <Button className="m-2" type="button" onClick={() => setZones([])}> Clear</Button>
            </Form>
        </div>
    )
}

export default DataForm