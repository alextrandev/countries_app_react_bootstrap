import { Container } from "react-bootstrap";
import Header from "./Header";
import CountriesPagePreview from "./CountriesPagePreview";
import SingleCountryPagePreview from "./SingleCountryPagePreview";

export default function Home() {
  return (
    <Container fluid className="p-5">
      <Header title="Welcome to Countries App!" />
      <CountriesPagePreview />
      <SingleCountryPagePreview />
    </Container>
  )
}
