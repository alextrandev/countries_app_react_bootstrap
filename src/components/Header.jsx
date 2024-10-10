import { Col, Row } from 'react-bootstrap'

// this is actually the heading or title at the start of each page. not the header/nav
// for the real header/nav, check the Layout component

export default function Header({ title }) {
  return (
    <Row>
      <Col className="p-1 d-flex justify-content-center">
        <h1>{title}</h1>
      </Col>
    </Row>
  )
}
