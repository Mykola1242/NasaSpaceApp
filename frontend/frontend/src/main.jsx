import { ContextProvider } from './components/context/Context';
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <ContextProvider>
        <App />
    </ContextProvider>
)
