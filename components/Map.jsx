import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

export default function Map({lat,lng}) {
    return (    
        <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} style={{position:"fixed",bottom:0,left:0,zIndex:1,height:"65vh", width: "100%"}}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]} draggable={true} >
          </Marker>
      </MapContainer>
    )
}
