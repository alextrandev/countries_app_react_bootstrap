import { Col, Spinner } from "react-bootstrap";

export default function LoadingScreen() {
  return (
    <Col className="text-center m-5">
      <Spinner
        animation="border"
        role="status"
        className="center"
        variant="info"
      />
    </Col>
  )
}