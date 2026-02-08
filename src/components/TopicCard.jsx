import DeleteTopicModal from "./topic/DeleteTopicModal";
import EditTopicModal from "./topic/EditTopicModal";
import { Grip } from "lucide-react";

const TopicCard = ({ topic, dragHandleProps }) => {
  return (
    <div
      className="w-full border rounded-xl p-5 shadow-sm sm:pr-12"
      style={{
        background: "var(--sheet-card)",
        borderColor: "var(--sheet-line)",
      }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span
            className="inline-flex items-center justify-center cursor-grab drag-handle shrink-0"
            {...(dragHandleProps || {})}
          >
            <Grip className="w-6 h-6 text-gray-500" />
          </span>

          <div className="min-w-0">
            <h2 className="text-xl font-semibold break-words">{topic.title}</h2>
            <p className="text-sm text-[rgba(31,20,13,0.6)] mt-1">
              {topic.subTopics.length}{" "}
              {topic.subTopics.length === 1 ? "Subtopic" : "Subtopics"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <span className="text-xs px-4 py-1 rounded-full bg-orange-100 text-orange-700 font-medium">
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
