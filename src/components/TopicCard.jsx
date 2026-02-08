import DeleteTopicModal from "./DeleteTopicModal";
import EditTopicModal from "./EditTopicModal";
import { GripVertical } from "lucide-react";   

const TopicCard = ({ topic, dragHandleProps }) => {
  return (
    <div
      className="w-full border rounded-xl p-5 pr-12 shadow-sm"
      style={{
        background: "var(--sheet-card)",
        borderColor: "var(--sheet-line)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GripVertical
            className="w-6 h-6 text-gray-500 cursor-grab drag-handle"
            {...(dragHandleProps || {})}
          />

          <div>
            <h2 className="text-xl font-semibold">{topic.title}</h2>
            <p className="text-sm text-[rgba(31,20,13,0.6)] mt-1">
              {topic.subTopics.length}{" "}
              {topic.subTopics.length === 1 ? "Subtopic" : "Subtopics"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs px-5 py-1 rounded-full bg-orange-100 text-orange-700 font-medium">
            {topic.subTopics.reduce(
              (sum, st) => sum + st.questions.length,
              0
            )}{" "}
            questions
          </span>

          <EditTopicModal topic={topic} />
          <DeleteTopicModal
            topicId={topic.id}
            topicTitle={topic.title}
          />
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
