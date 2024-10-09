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
  const countryName = country.name.common;

  return (
    <Card className='shadow p-0 overflow-hidden'>
      <Card.Header>
        <Card.Title>Map of {countryName}</Card.Title>
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
          center={country.latlng}
          zoom={6}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={country.capitalInfo.latlng}>
            <Popup>
              <Card className='border-0'>
                <Card.Body className='p-0 m-0'>
                  <Card.Title>{country.capital[0]}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Capital of {countryName}</Card.Subtitle>
                  <Card.Link href={`https://en.wikipedia.org/wiki/${country.capital[0]}`}>Wiki link</Card.Link>
                </Card.Body>
              </Card>
            </Popup>
          </Marker>
        </MapContainer>
      </Card.Body>
    </Card>
  )
}
