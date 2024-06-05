import React, { useState } from "react";

const SignUpForm: React.FC = () => {
    const [userType, setUserType] = useState('');

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');


    //User type selection menu
    const options = [
        { label: "Select a type", value: "" },
        { label: "Researcher", value: "researcher" },
        { label: "Investor", value: "investor" },
        { label: "Institution staff", value: "institution_staff" },
        { label: "Service provider", value: "service_provider" }
    ];

    //Updates the value from the user type selection menu
    const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        setUserType(e.target.value);
    };

    //Updates the string fields from the form when modified
    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    //POST Query to signup endpoint
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const dataToSend = {
            user_type: userType,
            ...formData
        };

        fetch('https://django-dev.aakscience.com/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    //Make sure to show the error that the back end is sending
                    throw new Error(`Failed to sign up: ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            setMessage(data.message);
            setError('');
        })
        .catch((error) => {
            setError(error.message);
            setMessage('');
        });
    };

    return (
        //Form structure
        <form className="flex flex-col justify-center items-center rounded shadow-xl mt-10 mb-10 p-8 bg-white" onSubmit={handleSubmit}>
            <div>
                <label className="font-bold">User type</label>
                <select className="w-full p-2 border border-gray-300 rounded mt-1 form-select" onChange={handleSelect}>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <label className="font-bold">First Name</label>
                <input
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                />
                <label className="font-bold">Last Name</label>
                <input
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                />
                <label className="font-bold">Username</label>
                <input
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <label className="font-bold">e-mail</label>
                <input
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <label className="font-bold">password</label>
                <input
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
            </div>
            <button className="w-full text-white py-2 rounded mt-5 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 animate-pulse"
                type="submit"
                title="SignUp">
                Sign me up!
            </button>
            {/* Printing the end result of the form submission after being sent to the endpoint */}
            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}
        </form>
    );
};

export default SignUpForm;