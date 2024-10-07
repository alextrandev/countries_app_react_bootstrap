import { Col, Spinner } from "react-bootstrap";

export default function LoadingScreen({ children }) {
  return (
    <Col className="text-center m-5">
      <Spinner
        animation="border"
        role="status"
        className="center"
        variant="info"
      />
      {children}
    </Col>
  )
}