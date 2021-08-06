import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { FaEdit } from 'react-icons/fa';

const ContactItem = (props) => {
  const { contact, removecontact } = props;
  return (
    <ListGroup.Item>
        <Row>
            <Col xs={10}>
                <h2>{contact.name}</h2>
                <p>{contact.number}</p>
                <p>{contact.email}</p>
                <p>{contact.notes}</p>
            </Col>
            <Col xs={2}>
              <Button><Link to={`/edit/${contact.id}`} style={{color:"#FFFFFF", textDecoration:'none'}}><FaEdit/></Link></Button>
              <CloseButton aria-label="Hide" onClick={() => removecontact(contact.id)} />
            </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default ContactItem;