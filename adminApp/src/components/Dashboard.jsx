import User from "./User.jsx";
import {useEffect, useState} from "react";
import {userService} from "../service/user-service.js";

const Dashboard = () => {

    const [users, setUsers] = useState([]);
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
                !error && (
                    <table className="table-auto text-center rounded">
                        <thead>
                        <tr style={{color: "#233863", backgroundColor: "#EAF3FA"}}>
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