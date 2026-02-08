import { useSelector } from "react-redux";
import TopicCard from "./TopicCard";

const TopicList = () => {
  const topics = useSelector((state) => state.sheet.topics);

  return (
     <div className="sheet-shell">
      {topics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
};

export default TopicList;
