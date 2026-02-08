import DeleteTopicModal from "./DeleteTopicModal";
import EditTopicModal from "./EditTopicModal";

const TopicCard = ({ topic }) => {
  return (
    <div className="w-full bg-(--sheet-card) border border-(--sheet-line) rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{topic.title}</h2>
          <p className="text-sm text-[rgba(31,20,13,0.6)] mt-1">
            {topic.subTopics.length} Subtopic
          </p>
        </div>

        <div className="flex gap-4">
          <span className="text-xs px-5 py-1 rounded-full bg-orange-100 text-orange-700 font-medium">
            {topic.subTopics.reduce((sum, st) => sum + st.questions.length, 0)}{" "}
            questions
          </span>
          <EditTopicModal topic={topic} />
          <DeleteTopicModal topicId={topic.id} topicTitle={topic.title} />
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
