import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSubTopic } from "../../store/sheetSlice";

const AddSubTopicBar = ({ topicId }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addSubTopic({ topicId, title }));
    setTitle("");
  };

  return (
    <div className="flex gap-2 my-3 pl-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add subtopic..."
        className="border rounded-md px-2 py-1 text-sm flex-1"
      />
      <button
        onClick={handleAdd}
        className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm"
      >
        Subtopic
      </button>
    </div>
  );
};

export default AddSubTopicBar;

