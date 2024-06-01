// import React from 'react';
// import predictionAPIService from '../services/InterfaceAPI';

// function InterfaceResult({ formData, interfaceData }) {
//     const { inslot, batch, material, plant, operationno } = formData;
//     const { fines, bulk, totalSandValue } = interfaceData;

//     const handleInterface = async () => {
//         try {
//             // Check for existing token or login if needed
//             const token = localStorage.getItem('interfaceAccessToken');
//             if (!token) {
//                 console.log('No token found, logging in...');
//                 await predictionAPIService.login();  // Assuming this sets the token in localStorage
//             }
    
//             const micCodes = {
//                 'PHYS0001': fines,
//                 'CHEM0010': bulk,
//                 'CHEM0013': totalSandValue
//             };
    
//             // Iterate over each MIC code and send its corresponding result
//             for (const [micCode, result] of Object.entries(micCodes)) {
//                 if (result !== undefined && result !== null) {  // Ensure there is a result to send
//                     await predictionAPIService.sandInterface({
//                         inslot,
//                         batch,
//                         material,
//                         plant,
//                         operation: operationno,
//                         miccode: micCode,
//                         result
//                     });
//                 } else {
//                     console.error(`No result available to send for ${micCode}`);
//                 }
//             }
    
//             alert('Interface completed successfully for all MIC codes.');
//         } catch (error) {
//             console.error('Interface failed:', error);
//             alert('Failed to interface data. Please check the console for more details.');
//         }
//     };
    

//   return (
//     <div>
//       <div>
//         <p className="text-left text-xl m-2">Interface data</p>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="table table-zebra w-full text-base text-center">
//           <thead className="text-base font-bold">
//             <tr>
//               <th>MIC-PHYS0001</th>
//               <th>MIC-CHEM0010</th>
//               <th>MIC-CHEM0013</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>{fines}</td>
//               <td>{bulk}</td>
//               <td>{totalSandValue}</td>
//               <td>
//                 <button className="btn btn-accent" onClick={handleInterface}>
//                   Interface
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default InterfaceResult;
