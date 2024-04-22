import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import style from './Map.module.css';
import { useNavigate } from "react-router-dom";
import { useCities } from '../contexts/CitiesContext';
import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { useGeoLocation } from '../hooks/useGeoLocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';

export const Map = () => {
    const { cities } = useCities()
    const [mapPosition, setMapPosition] = useState<{ lat: number, lng: number }>({ lat: 0, lng: 0 })
    const { isLoading: isLoadingPosition, position: geoLocationPosition, getPosition } = useGeoLocation(null)

    const {lat, lng} = useUrlPosition()


    useEffect(() => {
        if (lat && lng) setMapPosition({ lat, lng })
    }, [lat, lng])

    useEffect(() => {
        if (geoLocationPosition) setMapPosition({ lat: geoLocationPosition.lat, lng: geoLocationPosition.lng })

    }, [geoLocationPosition])

    return (
        <div className={style.mapContainer}>
            {!geoLocationPosition && <Button style='position' onClick={() => { getPosition() }} >{isLoadingPosition ? 'Loading...' : 'Use your location'}</Button>}
            <MapContainer center={mapPosition} zoom={10} scrollWheelZoom={true} className={style.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map(city =>
                    <Marker position={{ lat: city.position.lat, lng: city.position.lng }} key={city.id}>
                        <Popup>
                            <span>{city.emoji}</span><span>                            {city.cityName}</span>

                        </Popup>
                    </Marker>
                )}
                <ChangeMapPosition lat={mapPosition.lat} lng={mapPosition.lng} />
                <DetectClick />
            </MapContainer>
        </div>
    );
};

const ChangeMapPosition = (center: LatLngExpression) => {
    const map = useMap()

    map.setView(center)

    return null
}

const DetectClick = () => {
    const navigate = useNavigate()
    useMapEvent('click', e => { navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`) })


    return null
}

export default Map;