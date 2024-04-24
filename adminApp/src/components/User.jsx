import {useNavigate} from "react-router-dom";

const User = ({user}) => {

    const navigate = useNavigate();

    return (
        <>
            <tr className="bg-white border-b border-blue-200">
                <th scope="row" className="px-6 py-4" style={{color: "#233863"}}>{user.firstname} {user.lastname}</th>
                <td className="px-6 py-3" style={{color: "#3586FD"}}>{user.email}</td>
                <td className="px-6 py-3">
                    <button onClick={() => navigate(`/details/${user.id}`)} style={{color: "#233863", backgroundColor: "#FFF"}}
                            className="px-5 py-3 text-base font-bold text-white rounded-lg text-center shadow-lg me-2" type="submit">
                        details
                    </button>
                    <button onClick={() => navigate("/report")} style={{color: "#FFF", backgroundColor: "#FA9746"}}
                            className="px-5 py-3 text-base font-bold text-white rounded-lg text-center shadow-lg" type="submit">
                        report
                    </button>
                </td>
            </tr>
        </>
    );
}

export default User;