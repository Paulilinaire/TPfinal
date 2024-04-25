import {useNavigate} from "react-router-dom";

const User = (props) => {

    const {user, status} = props.userInfos;

    const navigate = useNavigate();

    return (
        <>
            <tr className="bg-white border-b border-blue-200">
                <td className="px-6 py-3">
                    {
                        status ?
                            <div className="relative inline-flex">
                                <span
                                    className="align-middle font-sans font-bold text-center uppercase text-xs px-6">
                                    Online
                                </span>
                                <span
                                    className="absolute min-w-[12px] min-h-[12px] rounded-full content-[''] bg-green-500"/>
                            </div>
                            :
                            <div className="relative inline-flex">
                                <span
                                    className="absolute min-w-[12px] min-h-[12px] rounded-full content-[''] bg-red-500"/>
                                <span
                                    className="align-middle font-sans font-bold text-center uppercase text-xs px-6">
                                    Offline
                                </span>

                            </div>
                    }
                </td>
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