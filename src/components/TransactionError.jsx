import React from "react";
import { XCircle } from "lucide-react";

const TransactionError = ({ Retry, setIsOpen }) => {
    function closeWindow(){
        setIsOpen({payBefore:false,error:false,success:false,general:false})
      }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent p-6">
      <div className="bg-white shadow-md rounded-lg p-8 text-center">
        <XCircle size={64} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800">Transaction Failed</h2>
        <p className="text-gray-600 mt-2">There was an issue processing your transaction. Please try again.</p>
        <span className="flex flex-col">
        <button onClick={Retry} className="link-button">
                Retry
            </button>
            <button onClick={closeWindow} style={{backgroundColor:"#E74C3C "}} className="mt-6 link-button bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md">
            Close
            </button>        
        </span>
      </div>
    </div>
  );
};

export default TransactionError;