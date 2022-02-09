// import ApiErrorModal from "./ApiErrorModal";
// import ApiSuccessModal from "./ApiSuccessModal";
// import AddEditVehicleModal from "./AddEditVehicleModal";

// export default function VehicleModal({ isModalOpen, closeModal, content }) {
//   switch (content.modalName) {
//     case "ApiErrorModal":
//       return (
//         <ApiErrorModal
//           isModalOpen={isModalOpen}
//           closeModal={closeModal}
//           content={content}
//         />
//       );
//     case "ApiSuccesModal":
//       return (
//         <ApiSuccessModal
//           isModalOpen={isModalOpen}
//           closeModal={closeModal}
//           content={content}
//         />
//       );
//     case "AddEditVehicleModal":
//       return (
//         <AddEditVehicleModal
//           isModalOpen={isModalOpen}
//           closeModal={closeModal}
//           addVehicle={content.addVehicle}
//           editVehicle={content.editVehicle}
//           initialValues={content.initialValues}
//         />
//       );
//     default:
//       return null;
//   }
// }
