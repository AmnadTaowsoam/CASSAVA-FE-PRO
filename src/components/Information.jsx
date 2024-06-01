import React, { useState } from "react";
import predictionAPIService from "../services/PredictionAPI";
import useInterfaceResult from "../services/InterfaceAPI"; // Import the custom hook

function Information({ formData, setFormData, setInterfaceResult }) {
  const [fines, setFines] = useState("");
  const [bulk, setBulk] = useState("");
  const [predictionResult, setPredictionResult] = useState({
    sandPredictValue: "",
    totalSandValue: "",
    phys0001: "",
    chem0010: "",
    chem0013: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  
  const { startInterface, result, error: interfaceError, isLoading: isInterfacing } = useInterfaceResult();

  // Handle changes to the fines and bulk inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const reg = /^\d*\.?\d*$/; // Regex to handle numbers including those starting with a decimal point
  
    if (value === "" || reg.test(value)) {
      if (name === "fines" || name === "bulk") {
        const setter = name === "fines" ? setFines : setBulk;
        setter(value);
      }
    }
  };   

  // Handle form submission for prediction
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setStatusMessage("Calculating...");

    try {
      await predictionAPIService.login();

      const { inslot, batch, plant, vendor, date_receive } = formData;
      const dateParts = date_receive.split(".");
      if (dateParts.length !== 3) {
        throw new Error("Invalid date format. Please use YYYY.MM.DD format.");
      }
      const month = parseInt(dateParts[1], 10);
      const finesValue = parseFloat(fines);
      const bulkValue = parseFloat(bulk);

      if (isNaN(finesValue) || isNaN(bulkValue)) {
        throw new Error("Please enter valid fines and bulk values.");
      }

      const payload = {
        inslot: formData.inslot,
        material: formData.material,
        batch: formData.batch,
        plant: formData.plant,
        operationno: formData.operationno,
        month: parseInt(dateParts[1], 10),
        vendor: formData.vendor,
        fines: finesValue,
        bulk: bulkValue,
      };

      const response = await predictionAPIService.sandPrediction(payload);
      const resultInfo = response.result.result_info;
      const micResultInfo = response.result.mic_result_info;
      const sandPredictValue = parseFloat(resultInfo.sand_predict_value);
      const totalSandValue = parseFloat(resultInfo.total_sand_value);
      if (isNaN(sandPredictValue) || isNaN(totalSandValue)) {
        throw new Error("Invalid prediction result values.");
      }

      setPredictionResult({
        sandPredictValue: sandPredictValue.toFixed(2),
        totalSandValue: totalSandValue.toFixed(2),
        phys0001: micResultInfo.phys0001.toFixed(2),
        chem0010: micResultInfo.chem0010.toFixed(2),
        chem0013: micResultInfo.chem0013.toFixed(2)
      });
      
      setStatusMessage("Calculation complete. Results updated below.");
    } catch (err) {
      console.error("API call failed:", err);
      setError(err.message || "Failed to calculate. Please try again.");
      setStatusMessage("Calculation failed. Please check the input and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle interface action
  const handleInterface = async () => {
    const { inslot, batch, material, plant, operationno } = formData;
    await startInterface(inslot, batch, material, plant, operationno);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-end">
          <div className="flex flex-col">
            <label htmlFor="fines" className="block text-base font-medium text-gray-900 dark:text-black mb-1">Fines:</label>
            <input
              type="text"
              id="fines"
              name="fines"
              value={fines}
              onChange={handleInputChange}
              className="input input-bordered input-accent w-full"
              required
              placeholder="Enter Fines..."
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="bulk" className="block text-base font-medium text-gray-900 dark:text-black mb-1">Bulk:</label>
            <input
              type="text"
              id="bulk"
              name="bulk"
              value={bulk}
              onChange={handleInputChange}
              className="input input-bordered input-warning w-full"
              required
              placeholder="Enter Bulk..."
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-center">
          <div className="flex flex-col items-center">
            <label className="block text-base font-medium text-gray-900 dark:text-black text-center">Sand Predict Value:</label>
            <div className="text-lg text-center mt-2 p-2 bg-gray-100 rounded-md w-full">{predictionResult.sandPredictValue || "value..."}</div>
          </div>
          <div className="flex flex-col items-center">
            <label className="block text-base font-medium text-gray-900 dark:text-black text-center">Total Sand Value:</label>
            <div className={`text-lg text-center mt-2 p-2 bg-gray-100 rounded-md w-full ${predictionResult.totalSandValue > 3 ? "text-red-500" : ""}`}>{predictionResult.totalSandValue || "value..."}</div>
          </div>
          <div className="flex flex-col items-center">
            <label className="block text-base font-medium text-gray-900 dark:text-black text-center">Mic_PHYS0001:</label>
            <div className="text-lg text-center mt-2 p-2 bg-gray-100 rounded-md w-full">{predictionResult.phys0001 || "value..."}</div>
          </div>
          <div className="flex flex-col items-center">
            <label className="block text-base font-medium text-gray-900 dark:text-black text-center">Mic_CHEM0010:</label>
            <div className="text-lg text-center mt-2 p-2 bg-gray-100 rounded-md w-full">{predictionResult.chem0010 || "value..."}</div>
          </div>
          <div className="flex flex-col items-center">
            <label className="block text-base font-medium text-gray-900 dark:text-black text-center">Mic_CHEM0013:</label>
            <div className="text-lg text-center mt-2 p-2 bg-gray-100 rounded-md w-full">{predictionResult.chem0013 || "value..."}</div>
          </div>
          <div className="flex justify-center gap-2 mt-8">
            <button type="submit" className="btn btn-outline btn-accent" disabled={isSubmitting}>{isSubmitting ? "Calculating..." : "Calculate"}</button>
            <button type="button" className="btn btn-outline btn-primary" onClick={handleInterface} disabled={isInterfacing}>{isInterfacing ? "Interfacing..." : "Interface"}</button>
          </div>
        </div>
        
        {error && (
          <div className="text-red-500 text-center mt-4 w-full">
            {error}
          </div>
        )}
        {interfaceError && (
          <div className="text-red-500 text-center mt-4 w-full">
            {interfaceError}
          </div>
        )}
        {statusMessage && (
          <div className="text-gray-700 text-center mt-4 w-full">
            {statusMessage}
          </div>
        )}
      </form>
    </div>
  );
}

export default Information;
