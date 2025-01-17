import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { anonymousLogin } from '../auth/firebase';

export default function SingleCountryPagePreview({ user }) {

  return (
    <Card className='d-flex flex-row p-3'>
      <Card.Img variant="top" src="/gifs/single-countries-preview.gif" style={{ borderRadius: "5px" }} />
      <Card.Body>
        <Card.Title>Single country page</Card.Title>
        <Card.Text>
          User can learn more about countries using the single country page. The page feature many useful information and even have AI intergration for extra knowledge.
        </Card.Text>
        <Card.Text>
          First section features country's flag and coat of arms and their descriptions.
        </Card.Text>
        <Card.Text>
          The trivial section will fetch interesting facts about the countries from Open AI.
        </Card.Text>
        <Card.Text>
          The info section feature basic information about the country and also have weather current weather forecast.
        </Card.Text>
        <Card.Text>
          The map of the country can be found at the end of the page if you want to know more about the country geography.
        </Card.Text>
        <Card.Text>
          To use the single country page, please login or register!
        </Card.Text>
        <Container className='d-flex gap-2 p-0'>
          <Button href="/login" variant="primary" disabled={user}>Login here</Button>
          <Button href='/register' variant="secondary" disabled={user}>Or register a new account</Button>
          <Button onClick={anonymousLogin} variant="primary" disabled={user}>Or Login as anonymous user!</Button>
        </Container>
      </Card.Body>
    </Card>
  );
}