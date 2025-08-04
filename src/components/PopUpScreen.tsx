import React from 'react'
interface PopUpScreenProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  AddHandler: () => void;
  editindex: number | null;
  closeHandler: () => void;
}

const PopUpScreen : React.FC<PopUpScreenProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  AddHandler,
  editindex,
  closeHandler,
}) => {
 return (
  <div className="fixed inset-0  bg-opacity-10  backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-gray-700 p-4 rounded-lg w-[90%] sm:w-[400px] mx-auto">
      <div className="mb-4">
        <label className="block  text-white mb-1">Title:</label>
        <input
          type="text"
          className="w-full p-2 text-white border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1  text-white">Description:</label>
        <input
          type="text"
          className="w-full p-2  text-white border"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex justify-between">
        <button
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={AddHandler}
        >
          {editindex !== null ? "Save" : "Add"}
        </button>
        <button
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={closeHandler}
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

}

export default PopUpScreen