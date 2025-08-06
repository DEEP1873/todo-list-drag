import React from "react";

type Item = {
  title: string;
  description: string;
};

type Props = {
  completedItems2?: Item[];
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
};

const Completion: React.FC<Props> = ({ completedItems2 = [], onDrop }) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="w-full bg-white border border-gray-200 p-4 rounded-lg shadow-xl h-full flex flex-col"
      onDrop={onDrop}
      onDragOver={handleDragOver}
    >
      {/* Sticky Title */}
      <div className="sticky top-0 z-10 bg-white">
        <h2 className="text-center text-xl font-semibold mb-3 text-green-800">
          Completed
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto pr-2 flex-1">
        {completedItems2.length > 0 ? (
          completedItems2.map((item, index) => (
            <div
              key={index}
              className="bg-green-100 border text-green-800 border-l-4 border-green-300 p-4 mb-4 rounded-lg shadow hover:shadow-lg transition duration-300"
              draggable={true}
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "text/plain",
                  JSON.stringify({ ...item, source: "completed" })
                );
              }}
            >
              <div className="inline-block bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">
                Completed
              </div>
              <strong className="block text-gray-800">
                Title: {item.title}
              </strong>
              <p className="text-gray-700 mt-1">
                Description: {item.description}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">
            Drag tasks here to mark as completed.
          </p>
        )}
      </div>
    </div>
  );
};

export default Completion;
