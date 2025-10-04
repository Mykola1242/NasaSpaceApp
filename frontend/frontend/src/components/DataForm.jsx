import Form from 'react-bootstrap/Form';
import  Button  from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/DataForm.css';
import { useContext } from 'react';
import { Context } from './context/Context';

const DataForm = () => {
    const { formSubmitHandler, formChangeHandler, setZones } = useContext(Context);

    return (
        <div>
            <Form className='data-form-container' onSubmit={formSubmitHandler}>
                <Form.Group className="mb-3" controlId="diameter">
                    <Form.Label>Diameter (m)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter diameter in meters"
                        name="diameter"
                        onChange={formChangeHandler}
                        required
                    />
                </Form.Group>
            
                <Form.Group className="mb-3" controlId="density">
                    <Form.Label>Density (kg/m³)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter density in kg/m³"
                        name="density"
                        onChange={formChangeHandler}
                        required
                    />
                </Form.Group>
            
                <Form.Group className="mb-3" controlId="velocity">
                    <Form.Label>Velocity (km/s)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter velocity in km/s"
                        name="velocity"
                        onChange={formChangeHandler}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="angle">
                    <Form.Label>Entry Angle (degrees)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter entry angle in degrees"
                        name="angle"
                        onChange={formChangeHandler}
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