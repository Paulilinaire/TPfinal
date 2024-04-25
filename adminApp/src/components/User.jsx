import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { pointingService } from '../service/pointing-service';
import Modal from '../shared/Modal';

const User = ({ user }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const [pointingData, setPointingData] = useState(null);
  const [error, setError] = useState('');

      const fetchData = async () => {
        setShowModal(true)
        try {
          const date = new Date().toISOString().split('T')[0]; 
          const response = await pointingService.getMonthPointing(date, user); 
          setPointingData(response.data);
        } catch (err) {
          console.error(err);
          setError('Error fetching pointing data');
        }
      };

      const setModal = () => {
        setShowModal(false)
      }

  return (
    <>
      <tr className="bg-white border-b border-blue-200">
        <th scope="row" className="px-6 py-4 text-primary">
          {user.firstname} {user.lastname}
        </th>
        <td className="px-6 py-3 text-secondary">{user.email}</td>
        <td className="px-6 py-3">
          <button
            onClick={() => navigate(`/details/${user.id}`)}
            className="px-5 py-3 text-base font-bold bg-white text-primary rounded-lg shadow-lg me-2"
          >
            Details
          </button>
          <button
            style={{ color: '#FFF', backgroundColor: '#FA9746' }}
            className="px-5 py-3 text-base font-bold text-white rounded-lg text-center shadow-lg"
            type="button"
            onClick={() => fetchData()}
          >
            Report
          </button> 
          {pointingData != null &&
            <Modal pointingData={pointingData.data} user={user} showModal={showModal} setShowModal={setModal}></Modal>
          } 
        </td>
      </tr>
    </>
  );
};

export default User;
