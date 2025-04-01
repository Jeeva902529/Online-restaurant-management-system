import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const SupplierPage = () => {
  const initialSuppliers = [
    { name: "Supplier 1", status: "Available" },
    { name: "Supplier 2", status: "Available" },
    { name: "Supplier 3", status: "Available" },
    { name: "Supplier 4", status: "Available" },
    { name: "Supplier 5", status: "Available" },
    { name: "Supplier 6", status: "Available" },
    { name: "Supplier 7", status: "Absent" },
    { name: "Supplier 8", status: "Available" },
  ];

  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  const selectSupplier = (name) => {
    setSelectedSupplier(selectedSupplier === name ? null : name);
  };

  const sendNotification = () => {
    if (!selectedSupplier) return;
    setIsModalOpen(true);
    setIsBlurred(true);
  };

  const confirmAssign = () => {
    setSuppliers((prevSuppliers) =>
      prevSuppliers.map((supplier) =>
        supplier.name === selectedSupplier ? { ...supplier, status: "Busy" } : supplier
      )
    );
    setSelectedSupplier(null);
    setIsModalOpen(false);
    setIsBlurred(false);
  };

  return (
    <div className={`bg-gray-100 text-gray-900 min-h-screen p-6 flex flex-col gap-6 items-center ${isBlurred ? 'blur-sm' : ''}`}>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Supplier Management</h1>
        <p className="text-red-600 mb-6">Checking available and Assign Supplier</p>

      </div>

      <div className="grid md:grid-cols-2 gap-14 w-3/4">
        <div className="text-center font-semibold text-2xl text-gray-900">Available Suppliers</div>
        <div className="text-center font-semibold text-2xl text-gray-900">Assigned Suppliers</div>
        <div className="w-full bg-white p-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 max-h-65 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <div className="space-y-2">
            {suppliers.filter(s => s.status === "Available").map((supplier) => (
              <div key={supplier.name} className="flex justify-between items-center p-2 rounded-lg">
                <span className="text-gray-700 font-medium text-lg">{supplier.name}</span>
                <button
                  onClick={() => selectSupplier(supplier.name)}
                  className={`px-5 py-2 rounded-lg transition duration-300 ${selectedSupplier === supplier.name
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-900 hover:bg-gray-400"
                    }`}
                >
                  {selectedSupplier === supplier.name ? "Selected" : "Assign"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full bg-white p-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 max-h-65 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <div className="space-y-2">
            {suppliers.filter(s => s.status === "Busy").map((supplier) => (
              <div key={supplier.name} className="flex justify-between items-center p-2 rounded-lg">
                <span className="text-gray-700 font-medium text-lg">{supplier.name}</span>
                <span className="px-4 py-2 rounded-lg bg-green-500 text-white">Busy</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={sendNotification}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-400 transition duration-300 shadow-md transform hover:scale-105"
          disabled={!selectedSupplier}
        >
          Send Notification
        </button>
      </div>

      <div className="text-center font-semibold text-2xl text-gray-900 mt-6">Absent Suppliers</div>
      <div className="w-3/4 bg-white p-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <div className="space-y-2">
          {suppliers.filter(s => s.status === "Absent").map((supplier) => (
            <div key={supplier.name} className="flex justify-between items-center p-2 rounded-lg">
              <span className="text-gray-700 font-medium text-lg">{supplier.name}</span>
              <span className="px-4 py-2 rounded-lg bg-red-500 text-white">Absent</span>
            </div>
          ))}
        </div>
      </div>

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 flex items-center justify-center bg-transparent" onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
              <Dialog.Title className="text-2xl font-semibold text-gray-800 mb-2">
                Confirm Assignment
              </Dialog.Title>
              <Dialog.Description className="text-gray-600 mb-4">
                Are you sure you want to mark <span className="font-bold">{selectedSupplier}</span> as Busy?
              </Dialog.Description>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmAssign}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 transition transform hover:scale-105"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-400 transition transform hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SupplierPage;
