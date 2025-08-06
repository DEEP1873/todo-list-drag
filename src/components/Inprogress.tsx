import React from "react";

type Item = {
  title: string;
  description: string;
};

type Props = {
  completedItems?: Item[]; // Optional prop
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
};

const Inprogress: React.FC<Props> = ({
  completedItems = [],
  onDrop,
}) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className=" w-full h-full bg-[#f8fafc] p-4 rounded-lg shadow-xl border border-gray-200 flex flex-col"
      onDrop={onDrop}
      onDragOver={handleDragOver}
    >
      <div className="text-center text-xl font-semibold mb-3 text-blue-700">
        In Progress
      </div>

      <div className="overflow-y-auto pr-2">
        {completedItems.length > 0 ? (
          completedItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#fff7eb] p-4 rounded-lg mb-4 shadow-md border-l-4 border-blue-400 hover:shadow-lg transition duration-300"
              draggable={true}
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "text/plain",
                  JSON.stringify({ ...item, source: "inprogress" })
                );
              }}
            >
              <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full mb-2">
                In Progress
              </div>
              <strong className="block text-gray-900 text-base">
                Title: {item.title}
              </strong>
              <p className="text-gray-700 text-sm mt-1">
                Description: {item.description}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">
            Drag tasks here to move into progress mode.
          </p>
        )}
      </div>
    </div>
  );
};

export default Inprogress;
