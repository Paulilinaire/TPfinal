import { useState } from "react";

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  return (
 
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="relative mx-auto w-auto max-w-3xl">
              <div className="bg-white border-0 rounded-lg shadow-lg">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="text-2xl"
                    onClick={() => setShowModal(false)}
                  >
                    &times;
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  <p className="text-lg leading-relaxed">
                    I always felt like I could do anything. That's the main
                    thing people are controlled by! Thoughts—their perception
                    of themselves. They're slowed down by their perception of
                    themselves. If you're taught you can't do anything, you
                    won't do anything.
                  </p>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end p-6 border-t border-gray-200">
                  <button
                    className="text-red-500 font-bold uppercase px-6 py-2 text-sm"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white font-bold uppercase px-6 py-3 text-sm rounded shadow hover:shadow-lg transition duration-150"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black opacity-25 z-40"></div>
          </div>
   
  );
}