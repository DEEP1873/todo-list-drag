import React, { useState } from "react";
import Backlog from "./components/Backlog";
import Inprogress from "./components/Inprogress";
import Complition from "./components/Complition";
// import Complition from './components/complition'

type Item = {
  title: string;
  description: string;
};

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [completedItems, setCompletedItems] = useState<Item[]>([]);
  const [completedItems2, setCompletedItems2] = useState<Item[]>([]);


  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const itemData = e.dataTransfer.getData("text/plain");

    if (!itemData) {
      console.warn("Dropped item has no data.");
      return;
    }

    try {
      const item: Item & { source: string } = JSON.parse(itemData);

      // if (completionLimit >= 5) {
      //   alert("Completion list is full (limit = 5)");
      // }

      // if (item.source === "backlog") {
      //   setBacklogLimit((prev) => prev - 1);
      // } else if (item.source === "inprogress") {
      //   setInprogressLimit((prev) => prev - 1);
      // }

      // setCompletionLimit((prev) => prev + 1);
      setCompletedItems([...completedItems, item]);
      setItems(items.filter((i) => i.title !== item.title));
    } catch (error) {
      console.error("Failed to parse dropped item:", error);
    }
  };

  // hadler2
  const handleDrop2 = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const itemData = e.dataTransfer.getData("text/plain");

    if (!itemData) {
      console.warn("Dropped item has no data.");
      return;
    }

    try {
      const item: Item & { source: string }  = JSON.parse(itemData);

      if (item.source === "backlog") {
        alert("You cannot move tasks directly from Backlog to completed.");
        return;
      }
      // if (inprogressLimit >= 5) {
      //   alert("Inprogress list is full (limit = 5)");
      //   return;
      // }
      // if (item.source === "completion") {
      //   setCompletionLimit((prev) => prev - 1);
      // }

      // setInprogressLimit((prev) => prev + 1);
      setCompletedItems2([...completedItems2, item]);

      setCompletedItems(completedItems.filter((i) => i.title !== item.title));
    } catch (error) {
      console.error("Failed to parse dropped item:", error);
    }
  };

  return (
    <div className="w-screen h-screen overflow-auto md:overflow-hidden">
  
      <div className="flex flex-col justify-center items-center bg-black mx-5 ">
        <h1 className="w-6/12 p-3 m-3 flex justify-center rounded-b-lg bg-blue-400 text-black text-sm sm:text-base">
          Task Management App
        </h1>
      </div>
      <div className="mx-5  bg-black">
        <div className="flex flex-col md:flex-row gap-4 ">
          <Backlog
            items={items}
            setItems={setItems}
          />
          <Complition
            completedItems={completedItems}
            onDrop={handleDrop}
          />

          <Inprogress
   
            completedItems2={completedItems2}
            onDrop={handleDrop2}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
