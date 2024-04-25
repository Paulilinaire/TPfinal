
export default function Modal(props) {
    const setShowModal = props.setShowModal;
    const user = props.user;
    const pointingData = props.pointingData;
    const showModal = props.showModal;


 
  if(showModal){
  return (
 
      <>
        <div className="fixed inset-0 flex justify-center items-center z-40">
          <div className="relative mx-auto w-auto max-w-3xl">
            <div className="bg-white border-0 rounded-lg shadow-lg">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  {user.firstname} {user.lastname}
                </h3>
                <button
                  className="text-2xl"
                  onClick={() => setShowModal()}
                >
                  &times;
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {pointingData && (
                  <>
                    <p>Total Work Hours: {pointingData.workingHour} h</p>
                    <p>Overtime: {pointingData.overtime} h</p>
                  </>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end p-6">
                <button
                  className="text-red-500 font-bold uppercase px-6 py-2 text-sm"
                  onClick={() => setShowModal()}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          </div>
          {/* Overlay */}
          <div className="fixed h-screen w-screen bg-black opacity-25 inset-0 z-10"></div>
      </>
  );
} 
}
