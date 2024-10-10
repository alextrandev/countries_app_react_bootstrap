import { Card, Container } from "react-bootstrap";
import Header from "./Header";
import CountriesPagePreview from "./CountriesPagePreview";
import SingleCountryPagePreview from "./SingleCountryPagePreview";

export default function Home() {
  return (
    <Container fluid className="p-5">
      <Header title="Welcome to Countries App!" />
      {/* some overview about the project */}
      <Card border="0" className="p-3">
        <Card.Body>
          <Card.Title>Countries info app featuring authentication, AI intergration and databases</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Tech stack: React.js, Redux, Express.js, Bootstrap, Firebase
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Powered by: Rest Countries API, Open Weather API and Open AI API
          </Card.Subtitle>
          <Card.Subtitle className="text-muted">
            Extra libraries: Leaflet, Toastify, Serverless-http
          </Card.Subtitle>
        </Card.Body>
      </Card>
      <CountriesPagePreview />
      {/* some advertisement about the favourites page and firebase */}
      <Card border="0" className="p-3">
        <Card.Body>
          <Card.Title>Firebase Firestore authentication and databases</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Feature fast and secure authentication using Firestore database
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            User favourites countries will also be stored using the same database
          </Card.Subtitle>
        </Card.Body>
      </Card>
      <SingleCountryPagePreview />
      {/* some advertisement about the favourites page and firebase */}
      <Card border="0" className="p-3">
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted p-0">
            The app is entirely open source and <b>free to use</b>
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Please use the link below to check out the source code or other project that I built.
          </Card.Subtitle>
          <Card.Title className="mb-2 text-muted">
            Thank you for using open countries app!
          </Card.Title>
        </Card.Body>
      </Card>
    </Container>
  )
}
