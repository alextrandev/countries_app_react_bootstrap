import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux';
import { showTrivial } from '../store/trivialsSlice';
import LoadingScreen from './LoadingScreen';

export default function AiTrivialsCard({ country }) {
  const dispatch = useDispatch();

  const countryName = country.name.common;
  const countryCode = country.cca3;

  const trivialsLoading = useSelector((state) => state.trivials.isLoading);
  const currentTrivial = useSelector((state) => state.trivials.currentTrivial[countryCode]);
  const isInitialized = useSelector((state) => state.trivials.isInitialized[countryCode]);

  return (
    <Card className='bg-light shadow'>
      <Card.Body>
        <Card.Title>
          <i className="bi bi-x-diamond-fill me-2"></i>
          Learn more about {countryName} with Open AI
        </Card.Title>
        <Card.Text>
          Click the button to get interesting fact about {countryName}. Generated by OpenAI
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <Button variant='success' onClick={() => dispatch(showTrivial(countryCode))} disabled={trivialsLoading && "disabled"}>
          {isInitialized ? "Show another" : "Show"} fact about {countryName}
        </Button>
      </Card.Body>
      {isInitialized &&
        <ListGroup className="list-group-flush">
          {!trivialsLoading
            ? <ListGroup.Item className='bg-light m-5'>
              <Card.Title className='d-flex gap-3 align-items-center' style={{ fontSize: "2rem" }}>
                <i className="bi bi-quote"></i>
                <span>{currentTrivial?.fact}</span>
                <i className="bi bi-quote"></i>
              </Card.Title>
            </ListGroup.Item>
            : <>
              <LoadingScreen>
                <p>Looking for fact about {countryName} {country.flag}<br />Please wait</p>
              </LoadingScreen>
            </>
          }
        </ListGroup>
      }
    </Card>
  );
}
