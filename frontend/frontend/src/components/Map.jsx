import { MapContainer, TileLayer, Marker, Circle, Popup, useMapEvents } from 'react-leaflet';
import { useEffect, useContext } from 'react';
import { Context } from './context/Context'
import 'leaflet/dist/leaflet.css';

export default function ImpactMap() {
  const { zones, position, setPosition } = useContext(Context);


  useEffect(() => {
    // Ініціалізація карти або інші побічні ефекти, якщо потрібно
  }, [zones]);

  // компонент для вибору координат кліком
  function LocationPicker() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });
    return null;
  }


  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={[50.45, 30.523]} zoom={6} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <LocationPicker />

        {position && (
          <>
            <Marker position={position}>
              <Popup>Місце удару</Popup>
            </Marker>
            {zones.map((z, i) => (
              <Circle key={i} center={position} radius={z.radius} color={z.color} fillColor={z.fillColor} />
            ))}
          </>
        )}
      </MapContainer>
    </div>
  );
}
