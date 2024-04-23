import User from "./User.jsx";
import {useEffect, useState} from "react";
import {userService} from "../service/user-service.js";

const Dashboard = () => {

    const [users, setUsers] = useState([
        {lastname: "DOE", email: "john.doe@email.com"},
        {lastname: "SMITH", email: "matt.smith@email.com"}
    ]);
    const [error, setError] = useState("")

    useEffect(() => {
        userService
            .getAllUsers()
            .then((response) => {
                setUsers(response.data)
            })
            .catch((error) => {
                setError("Erreur lors de la récupération des utilisateurs")
            })
    }, []);

    return (
        <>
            {
                error && (
                    <div>{error}</div>
                )
            }
            {
                /*!*/error && (
                    <table>
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users.map((user, index) => (
                                <User user={user} key={index}/>
                            ))
                        }
                        </tbody>
                    </table>)
            }

        </>
    );
}

export default Dashboard;