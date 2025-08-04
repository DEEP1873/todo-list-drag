import React from "react";

type Item = {
  title: string;
  description: string;
};

type Props = {
  completedItems?: Item[]; // Optional prop
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
 
};

const Completion: React.FC<Props> = ({
  completedItems = [],
  onDrop,

}) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="h-170 w-full md:w-1/3 bg-green-200 p-4 rounded-lg shadow-md "
      onDrop={onDrop}
      onDragOver={handleDragOver}
    >
      <h2 className="text-lg font-semibold mb-2 ">Inprogress</h2>

      <div className=" max-h-[70vh] overflow-y-auto">
        {completedItems.length > 0 ? (
          completedItems.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-green-300 mb-4 rounded shadow text-sm sm:text-base"
              draggable={true}
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "text/plain",
                  JSON.stringify({ ...item, source: "inprogress" })
                );
              }}
            >
              <strong>Title: {item.title}</strong>
              <p>Description: {item.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">
            Drag tasks here to move in progress mode.
          </p>
        )}
      </div>
    </div>
  );
};

export default Completion;
