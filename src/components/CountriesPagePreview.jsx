import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function HomepagePreview({ user }) {
  return (
    <Card className='d-flex flex-row p-3'>
      <Card.Body>
        <Card.Title>Countries page</Card.Title>
        <Card.Text>
          Logged in user can browse from over 250 countries across 6 regions.
          Because of the huge number of countries, there is a nice pagination bar to reduce loading time.
        </Card.Text>
        <Card.Text>
          Each countries is shown in their own beautiful card with flag and name to easily identify.
        </Card.Text>
        <Card.Text>
          A search bar and a region selection bar available so you can easily browsing and look for your favourite countries.
        </Card.Text>
        <Card.Text>
          To experience full function of the app, please login or register!
        </Card.Text>
        <Container className='d-flex gap-2 p-0'>
          <Button href="/login" variant="primary" disabled={user}>Login here</Button>
          <Button href='/register' variant="secondary" disabled={user}>Or register a new account</Button>
        </Container>
      </Card.Body>
      <Card.Img variant="top" src="/gifs/countries-page-preview.gif" style={{ borderRadius: "5px" }} />
    </Card>
  );
}