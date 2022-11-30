import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import './style.scss'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </BrowserRouter>
    </Provider>
)
