import mongoose from "mongoose";

export const initialBuilderNode = {
  id: new mongoose.Types.ObjectId().toString(),
  position: {
    x: 0,
    y: 0,
  },
  data: {
    label: "Command Triggered",
    key: "command-triggered",
  },
  width: 150,
  height: 39,
  style: {
    border: "1px solid #5a8eff",
  },
  isRoot: true,
};
