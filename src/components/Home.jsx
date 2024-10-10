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
          <Card.Title>Card Title</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      <SingleCountryPagePreview />
    </Container>
  )
}
