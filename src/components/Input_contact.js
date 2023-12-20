// import axios from "axios";
// import React, { useState , useEffect } from "react";
// import "./Input_contact.css";

// const Input_contact = (props) => {
//   const [newContact , setNewContact] = useState([])
//   const [modal, setModal] = useState(false);
//   const [data, setData] = useState({
//     name:"",
//     number:"",
//     email:""
//   }
//   );
//   // const [val , setVal] = useState([])

//   useEffect(()=>{
//     const getData = async () =>{
//       const response = await axios.get("https://jsonplaceholder.typicode.com/users");
//       response?.newContact?.forEach((element) => {
//         const putElements = {
//           id:element.id,
//           name:element.name,
//           number:element.number,
//           email:element.email
//         }
//         setNewContact((preData)=> [ ...preData , putElements ]);
        
//       });
//     }
//     getData();
//   },[])


//   const dataHandlerInput = (event) => {
//      setData((prev)=>({...prev,[event.target.name] : event.target.value}))
//   };
 

//   const itemList =async (e) => {
//     e.preventDefault();
//     props.passVal(data);
//     const addedContact = await axios.post("https://jsonplaceholder.typicode.com/users");
//     console.log(addedContact);
//     setNewContact((prev)=>[
//       {
//         id:addedContact.newContact.id + newContact.length,
//         ...data,
//       },
//       ...prev
//     ]);
//     setData({
//       name:"",
//       number:"",
//       email:""
//     });

//   };

//   console.log(newContact);
//   const toggleModal = () => {
//     setModal(!modal);
//   };

//   if (modal) {
//     document.body.classList.add('active-modal') 
//   } else {
//     document.body.classList.remove('active-modal')
//   }

//   return (
//     <>


//       <div className="container">
//         <div></div>
//         <h1 className="heading-name">Your  Contact  List</h1>
//         <div>
//           {/* <button className="btn-modal">View page</button> */}
//           <button onClick={toggleModal} className="btn-modal">Add Contact </button>
//         </div>
//       </div>

//       {modal && (
//         <div className="modal">
//           <div onClick={toggleModal} className="overlay"></div>
//           <div className="modal-content">
//             <h2>Add New Contact List</h2>
//             <p>
//               <input type="text" name="name" value={data.name} placeholder="Write Your Name..." onChange={dataHandlerInput} autoComplete="off" />
//               <input type="text" name="number" value={data.number} placeholder="Number" onChange={dataHandlerInput} autoComplete="off" />
//               <input type="email" name="email" value={data.email} placeholder="Email" onChange={dataHandlerInput} autoComplete="off" />
//             </p>
//             <div>
//               <button className="close-modal" onClick={toggleModal}>X</button>
//               <button className="save-modal" onClick={itemList}>SAVE</button>
//             </div>
//           </div>
//         </div>
//       )}

//     </>
//   );
// }
// export default Input_contact;