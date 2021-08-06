import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactItem from "./ContactItem";
import { deleteContact, updateContact , contactList } from "../features/contactSlice";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const DisplayContact = () => {
    const [search, setSearch ]= useState('');
    const contacts = useSelector(contactList);
    const dispatch = useDispatch();
    const header = {backgroundColor: '#f3f0ed', borderBottom: '1px solid #ccc'};
    const [searchResult, setSearchResult] = useState([]);
    
    const removecontact = (id) => {
        dispatch(deleteContact({
            id: id
        }))
    };
    const updateContactFun = (id,obj) => {
        dispatch(updateContact({
            id: id,
            contact: obj
        }))
    };
    const searchcontact = (e) => {
        const searchKey = e.target.value.toLowerCase();
        setSearch(e.target.value);
        const searchResult = contacts.filter((contact) => {
            return contact.name.toLowerCase().indexOf(searchKey)>=0;
          });
          setSearchResult(searchResult);
    };
  return (
    <Container>
    <Row style={header}>
      <Col xs={9}><h5>Contact List</h5></Col>
      <Col xs={3}><Button variant="outline-dark" type="button" className="float-end"><Link to={'/add'} style={{color:"#000000", textDecoration:'none'}}>+ Add Contact</Link></Button></Col>
    </Row>
    <Row>
      <Col>
            <Form.Group className="mb-3" controlId="Name">
                <Form.Label>Search By Name</Form.Label>
                <Form.Control type="text" placeholder="Search Contact" onChange={(e) => searchcontact(e)} value={search}/>
            </Form.Group>
      </Col>
    </Row>
    <Row>
      <Col md={4} xs={12} className="mb-2">
      {search!='' && (<ListGroup>
          {searchResult.length > 0 ? searchResult.map((contact) => {
                return (
                    <ContactItem
                      key={contact.id}
                      contact={contact}
                      removecontact={removecontact}
                    />
                );
              })
            : <p>No match found</p>}
      </ListGroup>)}
      {search=='' && (<ListGroup>
          {contacts.length > 0 ? contacts.map((contact) => {
                return (
                    <ContactItem
                      key={contact.id}
                      contact={contact}
                      removecontact={removecontact}
                    />
                );
              })
            : <p>Please Add Contact</p>}
      </ListGroup>)}
      </Col>
    </Row>
  </Container>
    
  );
};

export default DisplayContact;