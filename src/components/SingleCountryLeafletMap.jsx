import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Card } from 'react-bootstrap';

// Set up the default icon for markers
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function SingleCountryLeafletMap({ country }) {
  return (
    <Card className='shadow p-0'>
      <Card.Header>
        <Card.Title>Map of {country.name.common}</Card.Title>
        <Card.Text>
          <span>Powered by </span>
          <a className='text-black' href="https://leafletjs.com/">Leaflet</a>
          <span>. Map by </span>
          <a className='text-black' href="https://www.openstreetmap.org/#map=5/51.50/-0.10">OpenStreetMap</a>

        </Card.Text>
      </Card.Header>
      <Card.Body className='bg-light'>
        <MapContainer
          style={{
            height: 600,
            minWidth: '40vw',
          }}
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </Card.Body>
    </Card>
  )
}
