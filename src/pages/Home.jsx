import React, { useState, useEffect } from "react";
import QRCodeReader from "../components/QRCodeReader";
import Information from "../components/Information";
// import InterfaceResult from "../components/InterfaceResult";

const Home = () => {
  const [predictionData, setPredictionData] = useState({
    queue: '',
    inslot: '',
    date_receive: '',
    batch: '',
    plant: '',
    material: '',
    vendor: '',
    operationno: '',
  });

  const [interfaceData, setInterfaceData] = useState({
    fines: '',
    bulk: '',
    totalSandValue: ''
  });

  useEffect(() => {}, [predictionData]);

  return (
    <div className="flex justify-center items-center mt-2 bg-gray-100">
      <div className="md:container md:mx-auto w-full md:w-2/3 lg:w-1/2 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-4">Sand in Cassava Calculator</h1>
        <div className="mb-6">
          <QRCodeReader setPredictionData={setPredictionData} />
        </div>
        <div className="mb-6">
          <Information 
            formData={predictionData} 
            setFormData={setPredictionData}
            // setInterfaceResult={setInterfaceData}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
