import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { pointingService } from '../service/pointing-service';

const User = ({ user }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const [pointingData, setPointingData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (showModal) {
      const fetchData = async () => {
        try {
          const date = new Date().toISOString().split('T')[0]; 
          const response = await pointingService.getMonthPointing(date); 
          setPointingData(response.data);
        } catch (err) {
          console.error(err);
          setError('Error fetching pointing data');
        }
      };

      fetchData();
    }
  }, [showModal]); 

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
            onClick={() => setShowModal(true)}
          >
            Report
          </button>
          {showModal && (
            <>
              <div className="fixed inset-0 flex justify-center items-center z-50">
                <div className="relative mx-auto w-auto max-w-3xl">
                  <div className="bg-white border-0 rounded-lg shadow-lg">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-5 border-b border-gray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        {user.firstname} {user.lastname}
                      </h3>
                      <button
                        className="text-2xl"
                        onClick={() => setShowModal(false)}
                      >
                        &times;
                      </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6">
                      <p className="text-md">Working hours:</p>
                      <p className="text-md">Overtime:</p>
                      {pointingData && (
                        <>
                          <p>Total Work Hours: {pointingData.totalWorkHours}</p>
                          <p>Overtime: {pointingData.overtime}</p>
                        </>
                      )}
                    </div>

                    {/* Modal Footer */}
                    <div className="flex justify-end p-6">
                      <button
                        className="text-red-500 font-bold uppercase px-6 py-2 text-sm"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
                {/* Overlay */}
                <div className="fixed inset-0 bg-black opacity-25 z-40"></div>
              </div>
            </>
          )}
        </td>
      </tr>
    </>
  );
};

export default User;
