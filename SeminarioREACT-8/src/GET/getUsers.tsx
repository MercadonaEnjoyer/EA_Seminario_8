import { useState, useEffect } from "react";
import { User } from "../modules/user";
import axios from "axios";
import './getUsers.css'

interface GetUsersProps {
    usersUpdated: boolean;
    setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

function GetUsers({ usersUpdated, setSelectedUser } : GetUsersProps){
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/user')
        .then((result) => {
            console.log(result.data);
            setUsers(result.data)})
        .catch((err) => console.log(err))
        console.log()
    }, [usersUpdated] );

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
    };


    return (
        <div className="users-container">
            <div className="table-container">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone number</th>
                            <th>Gender</th>
                            <th>Posts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index ) => (
                                    <tr key = {index} onClick={() => handleUserClick(user)}>
                                    <td>{user.name.first_name} {user.name.middle_name} {user.name.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone_number}</td>
                                    <td>{user.gender}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default GetUsers;

