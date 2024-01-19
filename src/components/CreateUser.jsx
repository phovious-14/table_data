// Import necessary dependencies
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './style.css'

// Create a functional component
const CreateUser = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
    };
    return (
        <Popup
            trigger={<button className="button"> + Create User </button>}
            modal
            nested
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>

                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <label for="firtsName">
                                First Name:

                            </label>
                            <input
                                id='firtsName'
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />

                            <label for="lastName">
                                Last Name:
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />

                            <label for="email">
                                Email:
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default CreateUser;
