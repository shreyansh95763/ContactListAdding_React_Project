import axios from "axios";
import React, { useState, useEffect } from "react";
import ContactList from "./ContactList.js";
import "./Input_contact.css";

const Contact_container = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const [data, setData] = useState({
    name: "",
    number: "",
    email: "",
  });
  const [newContact, setNewContact] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        // Fetch initial data from the API
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setNewContact(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getData();
  }, []);

  // Event handler for input changes
  const dataHandlerInput = (event) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  // Update contact information
  const updateContacts = async (updatedData) => {
    try {
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${updatedData.id}`,
        updatedData
      );
      console.log(res.data);

      // Update the newContact state with the modified data
      const newArray = newContact.map((item) =>
        item.id === updatedData.id ? res.data : item
      );
      setNewContact(newArray);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  // Delete a contact
  const deleteContact = async (id) => {
    try {
      // Make a DELETE request to the API
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

      // Update the newContact state by removing the deleted contact
      const newArrey = newContact.filter((item) => item.id !== id);
      setNewContact(newArrey);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  // Save a new contact
  const saveContact = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the API to add a new contact
      const addedContact = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        data
      );

      // Update the newContact state with the newly added contact
      setNewContact((prev) => [
        {
          id: addedContact.data.id || newContact.length + 1,
          ...data,
        },
        ...prev,
      ]);

      // Clear the form data and close the modal
      setData({
        name: "",
        number: "",
        email: "",
      });
      toggleModal();
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="heading-name">Your Contact List</h1>
        <div>
          <button onClick={toggleModal} className="btn-modal">
            Add Contact
          </button>
        </div>
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <form onSubmit={saveContact}>
              <h2>Add New Contact List</h2>
              <p>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  placeholder="Write Your Name..."
                  onChange={dataHandlerInput}
                  autoComplete="off"
                />
                <input
                  type="tel"
                  name="number"
                  value={data.number}
                  pattern="[0-9]{10}"
                  placeholder="Number"
                  onChange={dataHandlerInput}
                  autoComplete="off"
                />
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="Email"
                  onChange={dataHandlerInput}
                  autoComplete="off"
                />
              </p>
              <div>
                <button className="close-modal" onClick={toggleModal}>
                  X
                </button>
                <button type="submit" className="save-modal">
                  SAVE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="contactList-containers">
        {/* Render ContactList component for each contact in newContact */}
        {newContact?.map((value) => (
          <ContactList
            key={value.id}
            data={value}
            updateContact={updateContacts}
            deleteContact={() => deleteContact(value.id)}
          />
        ))}
      </div>
    </>
  );
};

export default Contact_container;
