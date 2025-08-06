import React, { useState } from "react";
import PopUpScreen from "./PopUpScreen";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { addTaskToBacklog, editBacklogTask } from "../redux/taskSlice";

const Backlog = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.tasks.backlog);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [Popupscreen, setPopUpScreen] = useState(false);
  const [editindex, setEditIndex] = useState<number | null>(null);

  const openHandler = () => setPopUpScreen(true);
  const closeHandler = () => {
    setPopUpScreen(false);
    setEditIndex(null);
    setTitle(" ");
    setDescription("");
  };

  const AddHandler = () => {
    if (!title || !description) return;

    if (editindex !== null) {
      dispatch(
        editBacklogTask({
          index: editindex,
          updatedTask: { id: items[editindex].id, title, description },
        })
      );
    } else {
      dispatch(addTaskToBacklog({ title, description }));
    }

    closeHandler();
  };

  const EditHandler = (index: number) => {
    setEditIndex(index);
    setTitle(items[index].title);
    setDescription(items[index].description);
    openHandler();
  };

  return (
    <div className="h-full w-full bg-white p-2 rounded-lg shadow-xl border border-gray-200 flex flex-col">
      {/* Sticky Header Section */}
      <div className="sticky top-0 z-10 py-4 bg-white">
        <div className="text-center mb-2">
          <h2 className="text-2xl font-bold text-gray-800">Add Tasks</h2>
        </div>
        <div className="flex justify-center items-center my-2">
          <button
            className="w-16 h-16 rounded-full bg-green-500 text-white text-2xl flex items-center justify-center shadow-lg hover:bg-green-600"
            onClick={openHandler}
          >
            +
          </button>
        </div>
      </div>

      {/* Popup */}
      {Popupscreen && (
        <PopUpScreen
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          AddHandler={AddHandler}
          editindex={editindex}
          closeHandler={closeHandler}
        />
      )}

      {/* Scrollable Items Section */}
      <div className="overflow-y-auto pr-2 ">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-2 mb-2 bg-yellow-100 border border-l-4 border-yellow-300 rounded-xl shadow-md transition hover:shadow-lg"
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData(
                "text/plain",
                JSON.stringify({ ...item, source: "backlog" })
              )
            }
          >
            <strong className="block text-lg font-semibold text-yellow-800">
              Name: {item.title}
            </strong>
            <p className="text-yellow-700">{item.description}</p>
            <button
              onClick={() => EditHandler(index)}
              className="mt-3 inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1 rounded-full transition"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Backlog;
