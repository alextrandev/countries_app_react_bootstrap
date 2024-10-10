import { Container } from "react-bootstrap";
import Header from "./Header";
import HomepagePreview from "./HomepagePreview";

export default function Home() {
  return (
    <Container fluid className="p-5">
      <Header title="Welcome to Countries App!" />
      <HomepagePreview />
    </Container>
  )
}
