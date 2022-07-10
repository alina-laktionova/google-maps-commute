import React from 'react'
import {useLoadScript} from '@react-google-maps/api'
import Map from './components/Map'
import '@reach/combobox/styles.css'

const API_KEY: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''
const libraries: ('places' | 'drawing' | 'geometry' | 'localContext' | 'visualization')[] = ['places']

function App() {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: API_KEY,
        libraries: libraries,
    })

    if (!isLoaded) return <div>Loading...</div>
    return <Map />
}

export default App
