import { createContext, useState } from "react";
import axios from "axios";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [damageData, setDamageData] = useState(null);
    const [formData, setFormData] = useState({
        diameter: '',
        velocity: '',
        density: '',
        angle: '',
    });
    const [position, setPosition] = useState(null);
    const [zones, setZones] = useState([]);

    const API_URL = "http://localhost:8000";

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        runSimulation();

        // try {
        //     const response = await axios.post('/api/data', formData);
        //     setDamageData(response.data);
        //     console.log('Data submitted successfully:', response.data);

        //     runSimulation();
        // } catch (error) {
        //     console.error('Error submitting data:', error);
        // }
    };

    function runSimulation() {
    if (!position) return alert("Оберіть місце удару на карті");

    // Отримаємо данні ураження від сервера

    const radiusSevere = 10000; // 10 км
    const radiusModerate = 25000; // 25 км
    const radiusLight = 60000; // 60 км

    setZones([
      { radius: radiusSevere, color: 'red', fillColor: 'rgba(255,0,0,0.3)' },
      { radius: radiusModerate, color: 'orange', fillColor: 'rgba(255,165,0,0.25)' },
      { radius: radiusLight, color: 'yellow', fillColor: 'rgba(255,255,0,0.2)' },
    ]);
  }

    return (
        <Context.Provider value={{
            API_URL,
            formData,

            setFormData,
            damageData,

            setDamageData,
            
            formSubmitHandler,
            
            position,
            setPosition,
            
            zones,
            setZones,
            
            runSimulation
        }}>
            {children}
        </Context.Provider>
    );
};