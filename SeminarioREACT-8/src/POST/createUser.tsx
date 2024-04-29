import { useState } from "react";
import axios from "axios";
import { User } from "../modules/user";
import './createUser.css';

interface CreateUserProps {
    updateUserList: () => void;
}

interface FormErrors {
    [key: string]: string;
}

function CreateUser({ updateUserList }: CreateUserProps) {
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

        setErrors(prevErrors => ({
            ...prevErrors,
            [fieldName]: errorMessage
        }));
    };

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
            axios.post("http://localhost:3000/user", user)
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
        <div>
            <form onSubmit={handleSubmit} className="create-user-form">
                <div>
                    <label>First Name</label>
                    <input type="text" value={first_name} onChange={(e) => { setFirstName(e.target.value); validateField('first_name', e.target.value); }} />
                    {errors.first_name && <span style={{ color: 'red' }}>{errors.first_name}</span>}
                </div>
                <div>
                    <label>Middle Name</label>
                    <input type="text" value={middle_name} onChange={(e) => { setMiddleName(e.target.value); validateField('middle_name', e.target.value);}} />
                    {errors.middle_name && <span style={{ color: 'red' }}>{errors.middle_name}</span>}
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" value={last_name} onChange={(e) => { setLastName(e.target.value); validateField('last_name', e.target.value); }} />
                    {errors.last_name && <span style={{ color: 'red' }}>{errors.last_name}</span>}
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" value={email} onChange={(e) => { setEmail(e.target.value); validateField('email', e.target.value); }} />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>
                <div>
                    <label>Phone Number</label>
                    <input type="text" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div>
                    <label>Gender</label>
                    <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateUser;
