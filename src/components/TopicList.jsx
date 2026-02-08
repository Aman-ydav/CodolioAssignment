import { useSelector } from "react-redux";
import TopicAccordion from "./TopicAccordion";

const TopicList = () => {
  const topics = useSelector((state) => state.sheet.topics);

  return (
     <div className="sheet-shell">
      {topics.map((topic) => (
        <TopicAccordion key={topic.id} topic={topic} />
      ))}
    </div>
  );
};

export default TopicList;
