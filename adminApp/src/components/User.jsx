const User = ({user}) => {

    return (
        <>
            <tr>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>
                    <button className="text-center text-blue-950 rounded shadow">details</button>
                    <button className="text-center text-white bg-green-600 rounded shadow">report</button>
                </td>
            </tr>
        </>
    );
}

export default User;