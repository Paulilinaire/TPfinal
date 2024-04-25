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
            <main className="mt-20 flex flex-col overflow-x-auto">
                {error ? (
                    <div className="text-center text-red-600">{error}</div>
                ) : (
                    <div className="flex justify-center"> 
                        <table 
                            className="w-3/4 text-left text-l rounded-lg overflow-hidden shadow-lg">
                            <thead className="text-gray-700 uppercase font-bold">
                                <tr style={{color: "#233863", backgroundColor: "#EAF3FA"}}>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Email</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((userInfos, index) => (
                                    <User userInfos={userInfos} key={index} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </>
    );
};

export default Dashboard;