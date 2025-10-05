import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [damageData, setDamageData] = useState({});
    const [formData, setFormData] = useState({
        asteroid: {
            name: 'Asteroid',
            radius: null,
            velocity: null,
            composition: ''
        },
        impact_angle: null,
        distance_to_impact: null,
    });
    const [position, setPosition] = useState(null);
    const [zones, setZones] = useState([]);

    const [showResult, setShowResult] = useState(false);
    const [showForm, setShowForm] = useState(true);

    const API_URL = "http://localhost:8000";

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        if (!position) return alert("Оберіть місце удару на карті");

        const form = e.target;
        const formData = {
            asteroid: {
                name: 'Asteroid',
                radius: form.diameter.value / 2,
                velocity: form.velocity.value,
                composition: form.composition.value
            },
            impact_angle: form.angle.value,
            distance_to_impact: form.distance_to_impact.value
        };

        console.log('Submitting form data:', formData);

        try {
            const response = await axios.post(`${API_URL}/simulate`, formData);

            console.log('Data submitted successfully:', response.data);
            setDamageData(response.data);

            setShowResult(true);
            setShowForm(false);
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    function runSimulation() {
        // Отримаємо данні ураження від сервера
        if (!damageData || !damageData['damage_zones_km']) return;

        const radiusSevere = damageData['damage_zones_km']['severe']
        const radiusModerate = damageData['damage_zones_km']['moderate']
        const radiusLight = damageData['damage_zones_km']['minor']

        setZones([
            { radius: radiusSevere, color: 'red', fillColor: 'rgba(255,0,0,0.3)' },
            { radius: radiusModerate, color: 'orange', fillColor: 'rgba(255,165,0,0.25)' },
            { radius: radiusLight, color: 'yellow', fillColor: 'rgba(255,255,0,0.2)' },
        ]);
    };

    const clearResults = () => {
        setDamageData(null);
        setZones([]);
        setShowResult(false);
        setShowForm(true);
    }

    useEffect(() => {
        console.log('Updated damageData:', damageData);
        if (damageData && damageData['damage_zones_km']) {
            runSimulation();
        }
    }, [damageData]);

    return (
        <Context.Provider value={{
            API_URL,

            formData,
            setFormData,

            damageData,
            setDamageData,

            position,
            setPosition,

            zones,
            setZones,

            showResult,
            setShowResult,

            showForm,
            setShowForm,

            formSubmitHandler,
            runSimulation,
            clearResults
        }}>
            {children}
        </Context.Provider>
    );
};