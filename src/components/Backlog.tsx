import React, { useState } from "react";
import PopUpScreen from "./PopUpScreen";

type Item = {
  title: string;
  description: string;
};
type props = {
  // limit: number;
  // setLimit: React.Dispatch<React.SetStateAction<number>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};
const Backlog: React.FC<props> = ({ items,setItems }) => {
  // const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [Popupscreen, setPopUpScreen] = useState(false);
  const [editindex, setEditIndex] = useState<number | null>(null);

  const closeHandler = () => {
    setPopUpScreen(false);
  };

  const openHandler = () => {
    setPopUpScreen(true);
  };

  const editHandler = (index: number) => {
    const itemToEdit = items[index];
    setTitle(itemToEdit.title);
    setDescription(itemToEdit.description);
    setEditIndex(index);
    setPopUpScreen(true);
  };

  const AddHandler = () => {
    if (title.trim() !== "" && description.trim() !== "" ) {
      if (editindex !== null) {
        const updatedItems = [...items];
        updatedItems[editindex] = { title, description };
        setItems(updatedItems);
      } else {
        const newTask = { title, description };
        setItems([...items, newTask]);
       
      }

      setTitle("");
      setDescription("");
      setEditIndex(null);
      setPopUpScreen(false);
    }
  };

  return (
    <div className="h-170 w-full  md:w-1/3 p-4 rounded-lg bg-amber-200">
      <div className="flex justify-center my-3">
        <button
          className="border-2 w-20 h-10 rounded-lg"
          onClick={openHandler}
        >
          +
        </button>
      </div>

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

      <div className="my-3  max-h-[70vh] overflow-y-auto">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-amber-300 rounded mb-2 shadow "
            draggable={true}
            onDragStart={(e) => {
              e.dataTransfer.setData(
                "text/plain",
                JSON.stringify({ ...item, source: "backlog" })
              );
            }}
          >
            <strong>Name: {item.title}</strong>
            <p>Description: {item.description}</p>
            <div className="flex flex-row-reverse">
              <button
                className="px-10 py-1 rounded-lg bg-red-600 text-black"
                onClick={() => editHandler(index)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Backlog;
