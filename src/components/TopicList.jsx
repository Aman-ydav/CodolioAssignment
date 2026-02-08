import { useSelector } from "react-redux";

const TopicList = () => {
  const topics = useSelector((state) => state.sheet.topics);

  return (
    <div>
      {topics.map((topic) => (
        <div
          key={topic.id}
          style={{ margin: "10px", padding: "10px", border: "1px solid gray" }}
        >
          <h3>{topic.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default TopicList;
