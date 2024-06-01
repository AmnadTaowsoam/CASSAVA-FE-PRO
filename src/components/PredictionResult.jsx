// import React from "react";

// const PredictionResult = ({ sandPredictValue, totalSandValue, onInterfaceClick }) => {
//   return (
//     <div className="container mx-auto max-w-4xl w-full mt-4 bg-white font-bold">
//       <div className="grid gap-4 mb-2">
//         <div className="flex justify-between items-center">
//           <div className="flex-1 mr-2">
//             <label htmlFor="sand_predict_value" className="block mb-1 font-medium">
//               Sand in Fines (%):
//             </label>
//             <input
//               type="text"
//               id="sand_predict_value"
//               className="border border-gray-300 rounded-lg py-2 px-4 w-full h-12"
//               placeholder="Sand Predict Value Calculate..."
//               value={sandPredictValue}
//               readOnly
//             />
//           </div>
//           <div className="flex-1 mr-2">
//             <label htmlFor="total_sand_value" className="block mb-1 font-medium">
//               Total Sand (%):
//             </label>
//             <input
//               type="text"
//               id="total_sand_value"
//               className="border border-gray-300 rounded-lg py-2 px-4 w-full h-12"
//               placeholder="Total Sand Value Calculate..."
//               value={totalSandValue}
//               readOnly
//             />
//           </div>
//           {totalSandValue !== "Calculating..." && (
//             <button
//               className="flex-none bg-teal-700 hover:bg-teal-500 text-white rounded-lg py-2 px-4 h-12 font-medium"
//               onClick={onInterfaceClick}
//             >
//               Interface
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PredictionResult;
