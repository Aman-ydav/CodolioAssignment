import EditQuestionModal from "./EditQuestionModal";
import DeleteQuestionModal from "./DeleteQuestionModal";
import { CircleHelp, Grip } from "lucide-react";

const QuestionRow = ({ question, topicId, subTopicId, dragHandleProps }) => {
  const difficultyColors = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  };

  return (
    <div className="flex justify-between items-center border-b py-2 gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="inline-flex items-center justify-center cursor-grab"
          {...(dragHandleProps || {})}
        >
          <Grip className="w-4 h-4 text-gray-500" />
        </span>
        <CircleHelp className="w-4 h-4 text-gray-500 shrink-0" />
        <a
          href={question.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-sm truncate"
        >
          {question.title}
        </a>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            difficultyColors[question.difficulty]
          }`}
        >
          {question.difficulty}
        </span>

        <EditQuestionModal
          topicId={topicId}
          subTopicId={subTopicId}
          question={question}
        />

        <DeleteQuestionModal
          topicId={topicId}
          subTopicId={subTopicId}
          question={question}
        />
      </div>
    </div>
  );
};

export default QuestionRow;
