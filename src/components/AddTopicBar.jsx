import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTopic } from "../store/sheetSlice";

const AddTopicBar = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addTopic(title));
    setTitle("");
  };
//   console.log(addTopic);

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new topic..."
        className="border rounded px-3 py-2 flex-1"
      />
      <button
        onClick={handleAdd}
        className="bg-orange-600 text-white px-4 py-2 rounded"
      >
        Add Topic
      </button>
    </div>
  );
};

export default AddTopicBar;
