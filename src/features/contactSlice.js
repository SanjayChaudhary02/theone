import { createSlice } from "@reduxjs/toolkit";

function getId(state) {
    return state.contacts.reduce((maxId, contact) => {
      return Math.max(contact.id, maxId)
    }, -1) + 1
  }
function setLocalStorageData(state){
  localStorage.setItem('contact',JSON.stringify(state));
}
function getInitialState(state){
  const contact = localStorage.getItem('contact');
  if(contact && contact!=""){
    return JSON.parse(contact);
  }
  return {
    contacts:[{}]
  };
}
export const contactSlice = createSlice({
    name: "contact",
    initialState : getInitialState(),
    reducers : {
        addContact: (state, action) => {
            const newList = {
              ...state,
              contacts : [...state.contacts,{name:action.payload.name, number: action.payload.number, email:action.payload.email, notes:action.payload.notes, id:getId(state)}]
            };
            setLocalStorageData(newList);
            return newList;
        },
        deleteContact: (state, action) => {
          const newList = {
            ...state,
            contacts: state.contacts.filter((contact) => {
              return contact.id !== action.payload.id
            })
          };
          setLocalStorageData(newList);
            return newList;
        },
        updateContact: (state, action) => {
          const newList = {
            ...state,
            contacts: state.contacts.map((contact) => {
              return contact.id === action.payload.id ?
              Object.assign({}, contact, {name:action.payload.name, number: action.payload.number, email:action.payload.email, notes:action.payload.notes}) : contact
            })
          };
          setLocalStorageData(newList);
            return newList;
        }
    }
});
export const { addContact, deleteContact, updateContact } = contactSlice.actions;
export const contactList = (state) => state.contact.contacts;

export default contactSlice.reducer;