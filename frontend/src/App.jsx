import { useContext, useState } from 'react'
import { Context } from './components/context/Context'
import './css/App.css'
import DataForm from './components/DataForm'
import Map from './components/Map'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import Result from './components/Result'

function App() {
  const { showResult, setShowResult, showForm, setShowForm } = useContext(Context)

  return (
    <div className="app-container">
      <Map />

      { showForm && <DataForm /> }
      { showResult && <Result /> }
      
    </div>
  )
}

export default App
