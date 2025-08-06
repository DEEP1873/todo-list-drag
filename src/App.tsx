import React, { useState } from "react";
import Backlog from "./components/Backlog";
// import Inprogress from "./components/Inprogress";
// import Complition from "./components/Complition";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import {
  moveToCompleted,
  moveToInprogress,
} from "./redux/taskSlice";
import Completion from "./components/Completion";
import Inprogress from "./components/Inprogress";
// import Complition from './components/complition'

type Item = {
  id: string;
  title: string;
  description: string;
  source?: string;
};

const App: React.FC = () => {
  const dispatch = useDispatch();

  // const [items, setItems] = useState<Item[]>([]);
  // const [completedItems, setCompletedItems] = useState<Item[]>([]);
  // const [completedItems2, setCompletedItems2] = useState<Item[]>([]);

  const inProgressItems = useSelector(
    (state: RootState) => state.tasks.inProgress
  );
  const completedItems = useSelector(
    (state: RootState) => state.tasks.completed
  );

  const handleInProgressDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const itemData = e.dataTransfer.getData("text/plain");

    if (!itemData) {
      console.warn("Dropped item has no data.");
      return;
    }
    try {
      const item: Item & { source: string } = JSON.parse(itemData);
      dispatch(moveToInprogress(item));

    } catch (error) {
      console.error("Failed to parse dropped item:", error);
    }
  };

  // hadler2
  const handleComplitionDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const itemData = e.dataTransfer.getData("text/plain");

    if (!itemData) {
      console.warn("Dropped item has no data.");
      return;
    }

    try {
      const item: Item & { source: string } = JSON.parse(itemData);

      if (item.source === "backlog") {
        alert("You cannot move tasks directly from Backlog to completed.");
        return;
      }
      dispatch(moveToCompleted(item));
    } catch (error) {
      console.error("Failed to parse dropped item:", error);
    }
  };

  return (
    <div className="w-screen h-screen overflow-auto md:overflow-hidden bg-gray-4 ">
      {/* <div className="flex flex-col justify-center items-center mx-5 mt-4 ">
        <h1 className="w-full md:w-6/12 text-center mb-2 bg-white p-4 rounded-lg shadow-lg text-2xl font-semibold text-green-700 tracking-wide border border-green-200">
          Task Management App
        </h1>
      </div> */}

      <div className="mx-5">

        <div className="flex h-[90vh] flex-col md:flex-row justify-between gap-4 mt-8 ">
          
          <Backlog />
          <Inprogress completedItems={inProgressItems} onDrop={handleInProgressDrop} />
          <Completion completedItems2={completedItems} onDrop={handleComplitionDrop} />
        </div>
      </div>
    </div>
  );
};

export default App;
