import QuestionRow from "./QuestionRow";
import AddSubTopicBar from "./AddSubTopicBar";
import SubTopicAccordion from "./SubTopicAccordion";

const TopicBody = ({ topic }) => {

  return (
    <div className="space-y-4">
      <AddSubTopicBar topicId={topic.id} />

      {topic.subTopics.map((st) => (
        <div key={st.id} className="pl-2">
          <SubTopicAccordion subTopic={st} />
        </div>
      ))}
    </div>
  );
};

export default TopicBody;
