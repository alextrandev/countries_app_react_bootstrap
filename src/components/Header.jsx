import { Col, Row } from 'react-bootstrap'

export default function Header({ title }) {
  return (
    <Row>
      <Col className="p-1 d-flex justify-content-center">
        <h1>{title}</h1>
      </Col>
    </Row>
  )
}
