import axios from "axios";
import React, { useState , useEffect } from "react";
import ContactList from "./ContactList.js";
import "./Input_contact.css";

const Contact_container = () => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({
    name:"",
    number:"",
    email:""
  }
  );
  const [newContact , setNewContact] = useState([])
  // const [val , setVal] = useState([])

  useEffect(()=>{
    const getData = async () =>{
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      console.log(response);
      response?.newContact?.forEach((element) => {
        const putElements = {
          id: element.id,
          name:element.name,
          number:element.number,
          email:element.email
        };
        setNewContact((preData)=> [ ...preData , putElements ]);
      });
    }
    getData();
    return setNewContact([]);
  },[1])


  const dataHandlerInput = (event) => {
     setData((prev)=>({...prev,[event.target.name] : event.target.value}))
  };

  const updateContacts = async(updatedData )=>{
      const res = await axios.put(`https://jsonplaceholder.typicode.com/users/1`);
      console.log(res);     
      const newArray = newContact.map((items) => {
        if(items.id === updatedData.id){
          // console.log("Inside update");
          const func = {
            id: updatedData.id,
            ...updatedData
          }
          // console.log("TTTTTTTTTTTT",func);
          return func;
        }
        return items;
      })
      setNewContact(newArray);
  }
 
  const deleteContact = async(event) =>{
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${event.id}`);
    const newArrey = newContact.filter((item)=> item.id !== event.id);
    setNewContact(newArrey);

  }
  const saveContact =async (e) => {
    e.preventDefault();
    // props.passVal(data);
    const addedContact = await axios.post("https://jsonplaceholder.typicode.com/users");
    console.log(addedContact);
    setNewContact((prev)=>[
      {
        id:(addedContact.newContact && addedContact.newContact.id)  || newContact.length+1,
        ...data,
      },
      ...prev
    ]);
    setData({
      name:"",
      number:"",
      email:""
    });

  };

  // console.log(newContact);
  const toggleModal = () => {
    setModal(!modal);
  };

  // if (modal) {
  //   document.body.classList.add('active-modal') 
  // } else {
  //   document.body.classList.remove('active-modal')
  // }

  return (
    <>


      <div className="container">
        <div></div>
        <h1 className="heading-name">Your  Contact  List</h1>
        <div>
          {/* <button className="btn-modal">View page</button> */}
          <button onClick={toggleModal} className="btn-modal">Add Contact </button>
        </div>
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
          <form onSubmit={saveContact}>
            <h2>Add New Contact List</h2>
            <p>
              <input type="text" name="name" value={data.name} placeholder="Write Your Name..." onChange={dataHandlerInput} autoComplete="off" />
              <input type="tel" name="number" value={data.number} pattern="[0-9]{10}" placeholder="Number" onChange={dataHandlerInput} autoComplete="off" />
              <input type="email" name="email" value={data.email} placeholder="Email" onChange={dataHandlerInput} autoComplete="off" />
            </p>
            <div>
              <button className="close-modal" onClick={toggleModal}>X</button>
              <button type="submit" className="save-modal" >SAVE</button>
            </div>
          </form>
          </div>
        </div>
      )}
      <div className="contactList-containers">
     { newContact?.map((value)=>(
       <ContactList key ={value.id} data={value} updateContact={updateContacts} deleteContact={deleteContact}/>
      ))}
    </div>
    </>
  );
}
export default Contact_container;