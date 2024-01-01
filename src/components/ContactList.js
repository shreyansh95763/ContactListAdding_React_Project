import React, { useState } from "react";
import "./Contact.css";

const ContactList = ({ data, updateContact, deleteContact }) => {
    const [edit, setEdit] = useState(false);
    const [inputs, setInputs] = useState({
        name: data.name,
        number: data.number,
        email: data.email,
    })

    // after edit button click take the input as event/; 
    const handleInputChange = (event) => {
        setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }
    // cancel to the edited values
    const cancelEdit = () => {
        setInputs({
            name: data.name,
            number: data.number,
            email: data.email,
        });
        setEdit(false);
    };
    //update the data and update the value of newContact through thier id
    const updatedContact = async (event) => {
        event.preventDefault();
        console.log(data.name);
        await updateContact({ id: data.id, ...inputs });
        setEdit(false);
    };

    return (
        <div className="contactList">
                    {/* if edit true then run code  */}
            {edit ? (
                <>
                    <form className="contact-detail" >
                        <div className="lists">
                            <input className="inputs-content" type="text" name="name" value={inputs.name} onChange={handleInputChange} required autofocus />
                            <input className="inputs-content" type="test" name="number" value={inputs.number} onChange={handleInputChange} required />
                            <input className="inputs-content" type="email" name="email" value={inputs.email} onChange={handleInputChange} required />
                        </div>
                        <div className="edit-btn">
                            <button className="btn cancel" onClick={cancelEdit}>Cancel</button>
                            <button type="submit" className="btn update" onClick={updatedContact}>Update</button>
                        </div>
                    </form>
                </>
            ) : 
                {/* then the value of updated is display  */}
             (<div className="contact-detail lists">
                    <span className="inputs-content">{inputs.name}</span>
                    <span className="inputs-content">+91  {inputs.number}</span>
                    <span className="inputs-content">{inputs.email}</span>
                </div>
                )}
            
                  {/* if edit false then not perform the update function */}
                {(!edit && (
                    <>
                      {/* <div className="main-btn"></div> */}
                        <div className="edit-btn">
                            <button className="btn edit" onClick={() => setEdit(true)}>Edit</button>
                            <button className="btn delete" onClick={() => deleteContact({ id: data.id, ...inputs })}>Delete</button>
                        </div>
                    </>
                ))}
        </div>
    )
}
export default ContactList;
