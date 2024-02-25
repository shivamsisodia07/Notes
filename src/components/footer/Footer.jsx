import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer
    className='bg-primary text-white text-center py-1'
      style={{
        width: '100%',
        position: 'relative',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Container >
        <Row>
          <Col className="text-center py-3">
            Copyright &copy;TaskMaster
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer