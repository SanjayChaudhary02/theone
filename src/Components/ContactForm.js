import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, updateContact, contactList } from "../features/contactSlice";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, Redirect } from "react-router-dom";
import { FaEraser } from 'react-icons/fa';
import validator from 'validator';
import './Contact.css';

const ContactForm = (props) => {
  const contactId = (props.match.params.id) ? parseInt(props.match.params.id) : null;
  let editContact = {name:'',number:'',email:'',notes:''};
  if(contactId){
        const listContact = useSelector(contactList);
        editContact = listContact.find((contact) => {
            return contact.id === contactId
        });
    }
  

  const [name, setName] = useState(editContact.name);
  const [number, setNumber] = useState(editContact.number);
  const [email, setEmail] = useState(editContact.email);
  const [notes, setNotes] = useState(editContact.notes);
  const [redirect, useRedirect] = useState(false);
  const [nameError, setNameError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const dispatch = useDispatch();

    
  

  const add = (e) => {
      e.preventDefault();
        if (name === ""){
            setNameError('Please enter name');
        }else{
            setNameError('')
        }
        if(number === "") {
            setNumberError('Please enter number');
        }else{
            setNameError('');
        }
        

        if(name!=="" && number!=="" && emailError==""){
            const contact = {
                name: name,
                number: number,
                email:email,
                notes: notes,
                id: contactId
            };
            dispatch(contactId?updateContact(contact):addContact(contact));
            useRedirect(true);
        }
  };
  const validateEmail = (e) => {
    const email = e.target.value
    setEmail(email);

    if (validator.isEmail(email)) {
      setEmailError('');
    } else {
      setEmailError('Enter valid Email!')
    }
  }

  const clearContact = () => {
    setName("");
    setNumber("");
    setNotes("");
    setEmail("");
    setHasError(false);
  };

  return (redirect?<Redirect to='/'/>:(
    <Container>
        <div className='mt-2 mb-2'>
            <Button variant="outline-dark" type="button" onClick={() => clearContact()} className="float-end" style={{color:"#000000", textDecoration:'none'}}><FaEraser /> Clear Contact</Button>
            <Button variant="outline-dark" type="button" className="float-end"><Link to={'/'} style={{color:"#000000", textDecoration:'none'}}>Back To Contact</Link></Button>
        </div>
        <Form>
            <Form.Group className="mb-3" controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name}/>
                {nameError && <span style={{fontWeight: 'bold',color: 'red',}}>{nameError}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="Number">
                <Form.Label>Number</Form.Label>
                <Form.Control type="number" placeholder="Enter number" onChange={(e) => setNumber(e.target.value)} value={number}/>
                {numberError && <span style={{fontWeight: 'bold',color: 'red',}}>{numberError}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="Email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => validateEmail(e)} value={email}/>
                {emailError && <span style={{fontWeight: 'bold',color: 'red',}}>{emailError}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="Notes">
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e) => add(e)}>Save</Button>
        </Form>
        
    </Container>
  ));
};


export default ContactForm;