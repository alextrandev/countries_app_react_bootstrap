import { Col, Row } from 'react-bootstrap'

export default function Header({ title }) {
  return (
    <Row className="m-1">
      <Col className="mt-5 d-flex justify-content-center">
        <h1>{title}</h1>
      </Col>
    </Row>
  )
}
