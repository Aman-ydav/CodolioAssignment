import EditQuestionModal from "./EditQuestionModal";
import DeleteQuestionModal from "./DeleteQuestionModal";

const QuestionRow = ({ question, topicId, subTopicId }) => {
  const difficultyColors = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  };

  return (
    <div className="flex justify-between items-center border-b py-2">
      <a
        href={question.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline text-sm"
      >
        {question.title}
      </a>

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
