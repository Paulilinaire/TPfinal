import {useNavigate} from "react-router-dom";

const User = ({user}) => {

    const navigate = useNavigate();

    return (
        <>
            <tr>
                <td style={{color: "#233863"}}>{user.lastname}</td>
                <td style={{color: "#3586FD"}}>{user.email}</td>
                <td>
                    <button onClick={() => navigate(`/details/${user.id}`)} style={{color: "#233863", backgroundColor: "#FFF"}}
                            className="rounded shadow">
                        details
                    </button>
                    <button onClick={() => navigate("/report")} style={{color: "#FFF", backgroundColor: "#FA9746"}}
                            className="rounded shadow">
                        report
                    </button>
                </td>
            </tr>
        </>
    );
}

export default User;