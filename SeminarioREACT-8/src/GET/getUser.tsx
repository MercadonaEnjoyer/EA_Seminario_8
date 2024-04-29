import { useState, useEffect } from "react";
//import { useHistory } from "react-router-dom";
import { User } from "../modules/user";
import './getUser.css'
import axios from "axios";

interface Props {
    user: User | null;
    updateUserList: () => void;
}

interface FormErrors {
    [key: string]: string;
}

function UpdateUser({ user, updateUserList }: Props) {

    const [first_name, setFirstName] = useState('');
    const [middle_name, setMiddleName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    const validateField = (fieldName: string, value: string) => {
        let errorMessage = '';

        switch (fieldName) {
            case 'first_name':
                errorMessage = value.trim() === '' ? 'First name is required' : '';
                break;
            case 'middle_name':
                errorMessage = value.trim() === '' ? 'Middle name is required' : '';
                break;
            case 'last_name':
                errorMessage = value.trim() === '' ? 'Last name is required' : '';
                break;
            case 'email':
                errorMessage = value.trim() === '' ? 'Email is required' : !isValidEmail(value) ? 'Invalid email format' : '';
                break;
            default:
                break;
        }
    }

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const id = user?._id;
        e.preventDefault();
        const isFormValid = validateForm();
        if (isFormValid) {
            const user: User = {
                name: {
                    first_name: first_name,
                    middle_name: middle_name,
                    last_name: last_name,
                },
                email: email,
                phone_number: phone_number,
                gender: gender
            };
            axios.put("http://localhost:3000/user/" + id, user)
            .then(result => {
                console.log(result);
                updateUserList();
                setFirstName('');
                setMiddleName('');
                setLastName('');
                setEmail('');
                setPhoneNumber('');
                setGender('');
            })
            .catch(err => console.error(err));
        }
    };

    const validateForm = () => {
        let isValid = true;
    
        validateField('first_name', first_name);
        validateField('middle_name', middle_name);
        validateField('last_name', last_name);
        validateField('email', email);
    
        for (const error in errors) {
            if (errors[error] !== '') {
                isValid = false;
                break;
            }
        }
    
        return isValid;
    };

    return (
        <div className="user-details">
            {user ? (
                <>
                <h2>User Details:</h2>
                <form onSubmit={handleSubmit} className="create-user-form">
                    <div>
                        <input type="text" placeholder={user ? user.name.first_name.toString() : ''} value={first_name} onChange={(e) => { setFirstName(e.target.value); validateField('first_name', e.target.value); }} />
                        {errors.first_name && <span style={{ color: 'red' }}>{errors.first_name}</span>}
                    </div>
                    <div>
                        <input type="text" placeholder={user ? user.name.middle_name.toString() : ''} value={middle_name} onChange={(e) => { setMiddleName(e.target.value); validateField('middle_name', e.target.value);}} />
                        {errors.middle_name && <span style={{ color: 'red' }}>{errors.middle_name}</span>}
                    </div>
                    <div>
                        <input type="text" placeholder={user ? user.name.last_name.toString() : ''} value={last_name} onChange={(e) => { setLastName(e.target.value); validateField('last_name', e.target.value); }} />
                        {errors.last_name && <span style={{ color: 'red' }}>{errors.last_name}</span>}
                    </div>
                    <div>
                        <input type="text" placeholder={user ? user.email.toString() : ''} value={email} onChange={(e) => { setEmail(e.target.value); validateField('email', e.target.value); }} />
                        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                    </div>
                    <div>
                        <input type="text" placeholder={user ? user.phone_number.toString() : ''} value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div>
                        <input type="text" placeholder={user ? user.gender.toString() : ''} value={gender} onChange={(e) => setGender(e.target.value)} />
                    </div>
                    <button type="submit">Update</button>
                </form>
                </>
            ) : (
                <p>Please select a user from the table.</p>
            )}
        </div>
    );
}

export default UpdateUser;