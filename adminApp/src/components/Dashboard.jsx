import User from "./User.jsx";
import {useEffect, useState} from "react";
import {userService} from "../service/user-service.js";
import Navbar from "../shared/Navbar";


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
            <Navbar />
            <main className="mt-10">
            {
                error && (
                    <div>{error}</div>
                )
            }
            {
                !error && (
                    <div class="relative overflow-x-auto">
                    <table className="w-full text-l text-left rounded">
                        <thead className="text-gray-700 uppercase text-l font-bold">
                        <tr style={{color: "#233863", backgroundColor: "#EAF3FA"}}>
                            <th className="px-6 py-3" scope="col">Name</th>
                            <th className="px-6 py-3" scope="col">Email</th>
                            <th className="px-6 py-3" scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users.map((user, index) => (
                                <User user={user} key={index}/>
                            ))
                        }
                        </tbody>
                    </table>
                    </div>)
            }
            </main>

        </>
    );
}

export default Dashboard;