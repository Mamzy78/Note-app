import React from "react";
import CloseIcon from '@mui/icons-material/Close';

function CostumizeNoteModal({
  isCustomizeModalOpen,
  toggleModal,
  onColorSelect,
  onDelete,
}) {
  return (
    <div>
      {isCustomizeModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40"
          onClick={toggleModal}
        ></div>
      )}

      {isCustomizeModalOpen && (
        <div
          className="fixed inset-0 z-50 max-w-lg mx-auto w-full"
          onClick={toggleModal}
        >
          <div
            className="modal-content bg-white p-5 rounded-t-lg shadow-lg absolute bottom-0 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button inside modal */}
            <button
              onClick={toggleModal}
              className="flex justify-center items-center absolute right-5 bg-[#EFEEF0] rounded-full w-6 h-6"
            >
              <CloseIcon className="text-dark-grey" style={{width:"16px", height:"16px"}} />
            </button>
            <p className="text-dark-grey mt-6 mb-4 text-[10px]">CHANGE BACKGROUND</p>

            <div className="flex justify-between pb-9 border-b">
              <button
                className="w-8 h-8 rounded-full bg-white border border-[#C8C5CB]"
                onClick={() => onColorSelect("#ffffff")}
              >
                {/* white color */}
              </button>
              <button
                className="w-8 h-8 rounded-full bg-[#F7DEE3]"
                onClick={() => onColorSelect("#F7DEE3")}
              >
                {/* pinkish color */}
              </button>
              <button
                className="w-8 h-8 rounded-full bg-[#EFEEF0]"
                onClick={() => onColorSelect("#EFEEF0")}
              >
                {/* greyish color */}
              </button>
              <button
                className="w-8 h-8 rounded-full bg-[#DAF6E4]"
                onClick={() => onColorSelect("#DAF6E4")}
              >
                {/* green color */}
              </button>
              <button
                className="w-8 h-8 rounded-full bg-[#FDEBAB]"
                onClick={() => onColorSelect("#FDEBAB")}
              >
                {/* dark yellow color */}
              </button>
              <button
                className="w-8 h-8 rounded-full bg-[#EFE9F7]"
                onClick={() => onColorSelect("#EFE9F7")}
              >
                {/* purpelish color */}
              </button>
              <button
                className="w-8 h-8 rounded-full bg-[#F7F6D4]"
                onClick={() => onColorSelect("#F7F6D4")}
              >
                {/* <light yellow color */}
              </button>
            </div>
            <div className="mt-2 pt-4">
              <button
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => {
                  onDelete();
                  toggleModal();
                }}
              >
                <img src="/images/trash.svg" alt="Delete" />
                <span className="text-delete-red font-InterMedium">
                  Delete Note
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CostumizeNoteModal;
