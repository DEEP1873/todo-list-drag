// src/redux/taskSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import Backlog from "../components/Backlog";

type Item = {
  id: string;
  title: string;
  description: string;
  source?: string;
};

interface TaskState {
  backlog: Item[];
  inProgress: Item[];
  completed: Item[];
}

const initialState: TaskState = {
  backlog: [
    {id:"1",title:"deep",description:"ygdewgd"},
    {id:"2",title:"mansi", description:"hbhfwewwe"},
    {id:"3",title:"mansi", description:"hbhfwe"},
    {id:"4",title:"keyur",description:"hbdiewud"},
    {id:"5",title:"jay",description:"rjfffff"},
  ],
  inProgress: [
    // {id:"",title:"deep",description:"ygdewgd"},
    // {id:"",title:"mansi", description:"hbhfwewwe"},
    // {id:"",title:"mansi", description:"hbhfwe"},
    // {id:"",title:"keyur",description:"hbdiewud"},
    // {id:"",title:"jay",description:"rjfffff"},
  ],
  completed: [
    // {title:"deep",description:"ygdewgd"},
    // {title:"mansi", description:"hbhfwewwe"},
    // {title:"mansi", description:"hbhfwe"},
    // {title:"keyur",description:"hbdiewud"},
    // {title:"jay",description:"rjfffff"},
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTaskToBacklog(state, action: PayloadAction<Omit<Item, "id">>) {
      const newTask: Item = {
        id: Date.now().toString(), // Generate unique id
        ...action.payload,
      };
      state.backlog.push(newTask);
    },
    editBacklogTask(
      state,
      action: PayloadAction<{ index: number; updatedTask: Item }>
    ) {
      state.backlog[action.payload.index] = action.payload.updatedTask;
    },
    moveToInprogress(state, action: PayloadAction<Item>) {
      state.inProgress.push(action.payload);
      if (action.payload.source === "backlog") {
        state.backlog = state.backlog.filter((i) => i.id !== action.payload.id);
      } else {
        state.completed = state.completed.filter(
          (i) => i.id !== action.payload.id
        );
      }
    },
    moveToCompleted(state, action: PayloadAction<Item>) {
      if (action.payload.source === "backlog") return;
      state.completed.push(action.payload);
      state.inProgress = state.inProgress.filter(
        (i) => i.id !== action.payload.id
      );
    },
  },
});

export const {
  addTaskToBacklog,
  editBacklogTask,
  moveToCompleted,
  moveToInprogress,
} = taskSlice.actions;

export default taskSlice.reducer;
