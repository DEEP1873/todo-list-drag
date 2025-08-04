import React from "react";
type Item = {
  title: string;
  description: string;
};

type Props = {
  completedItems2?: Item[]; // Optional prop
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  // limit: number;
  // setLimit: React.Dispatch<React.SetStateAction<number>>;
};

const Inprogress: React.FC<Props> = ({
  completedItems2 = [],
  onDrop,

}) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="h-170 w-full md:w-1/3  bg-red-200 p-4 rounded-lg shadow-md"
      onDrop={onDrop}
      onDragOver={handleDragOver}
    >
      <h2 className="text-lg font-semibold mb-2 ">Completed</h2>
      <div className=" max-h-[70vh] overflow-y-auto">
        {completedItems2.length > 0 ? (
          completedItems2.map((item, index) => (
            <div key={index} className="p-4 bg-red-400 mb-4 rounded shadow text-sm sm:text-base">
              <strong>Title: {item.title}</strong>
              <p>Description: {item.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Drag tasks here to put in completed</p>
        )}
      </div>
    </div>
  );
};

export default Inprogress;
