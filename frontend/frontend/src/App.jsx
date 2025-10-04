import { useState } from 'react'
import './css/App.css'
import DataForm from './components/DataForm'
import Map from './components/Map'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [showForm, setShowForm] = useState(true);

  return (
    <div className="app-container">
      {/* <Button
        variant={showForm ? "secondary" : "primary"}
        className="toggle-form-btn"
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? 'Hide Form' : 'Show Form'}
      </Button> */}
      {showForm && <DataForm />}
      <Map />
    </div>
  )
}

export default App
