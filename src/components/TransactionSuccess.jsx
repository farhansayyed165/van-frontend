import React from "react";
import { CheckCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";

const TransactionSuccess = ({ setIsOpen }) => {
  function closeWindow(){
    setIsOpen({payBefore:false,error:false,success:false,general:false})
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent p-6">
      <div className="bg-white flex flex-col items-center justify-center shadow-md rounded-lg p-8 text-center">
        <CheckCircle size={64} className="text-green-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800">Transaction Successful!</h2>
        <p className="text-gray-600 mt-2">Your transaction has been completed successfully.</p>
        <button onClick={closeWindow} className="link-button m-2">
          Continue
        </button>
      </div>
    </div>
  );
};

export default TransactionSuccess;