import React from 'react';


function MyModal({ isCustomizeModalOpen, toggleModal, onColorSelect, onDelete }) {

  return (
    <div>
      {isCustomizeModalOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40"
        ></div>
      )}
      
      {isCustomizeModalOpen && (
        <div 
          className="fixed inset-0 z-50 max-w-lg mx-auto w-full"
        >
          <div className="modal-content bg-white p-5 rounded-t-lg shadow-lg absolute bottom-0 w-full">
            {/* Close button inside modal */}
            <button onClick={toggleModal} className="flex justify-center items-center absolute right-5 bg-slate-200 rounded-full w-6 h-6">
              <img src="/x.svg" alt="Close" className='w-4 h-4'/>
            </button>
            <p className="text-gray-900 mt-6 mb-4">CHANGE BACKGROUND</p>
            
            {/* Example interactive content */}
            <div className="flex justify-between pb-9 border-b">
              <button onClick={() => onColorSelect('#fffffff')}>
                <img src="/Extra Menu BG Choice(1).svg" alt="white" />
              </button>
              <button onClick={() => onColorSelect('#F7DEE3')}>
                  <img src="/Extra Menu BG Choice(2).svg" alt='pink'/>
              </button>
              <button onClick={() => onColorSelect('#EFE9F7')}>
                  <img src="/Extra Menu BG Choice(3).svg" alt='gray'/>
              </button>
              <button onClick={() => onColorSelect('#DAF6E4')}>
                  <img src="/Extra Menu BG Choice(4).svg" alt='gerrnish'/>
              </button>
              <button onClick={() => onColorSelect('#FDEBAB')}>
                  <img src="/Extra Menu BG Choice(5).svg" alt='yellowish'/>
              </button>
              <button onClick={() => onColorSelect('#F7F6D4')}>
                  <img src="/Extra Menu BG Choice(6).svg" alt='light-gray'/>
              </button>
              <button onClick={() => onColorSelect('#EFEEF0')}>
                  <img src="/Extra Menu BG Choice(7).svg" alt='light-brown'/>
              </button>
            </div>
            <div className='mt-2 pt-4'>
              <button 
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => {
                    onDelete();
                    toggleModal();
                  }}
              >
                <img src="/trash.svg" alt="Delete"/>
                <span className="text-red-500">Delete Note</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyModal;


              