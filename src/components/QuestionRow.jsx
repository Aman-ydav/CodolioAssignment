const difficultyColors = {
  Easy: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Hard: "bg-red-100 text-red-800",
};

const QuestionRow = ({ question }) => {
  return (
    <div className="flex justify-between items-center border-b border-(--sheet-line) py-2">
      <a
        href={question.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline text-sm"
      >
        {question.title}
      </a>

      <span
        className={`text-xs px-2 py-1 rounded-full ${
          difficultyColors[question.difficulty] ||
          "bg-gray-100 text-gray-800"
        }`}
      >
        {question.difficulty}
      </span>
    </div>
  );
};

export default QuestionRow;
