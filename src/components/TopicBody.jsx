import QuestionRow from "./QuestionRow";

const TopicBody = ({ topic }) => {
  const isSingleDSA =
    topic.subTopics.length === 1 &&
    topic.subTopics[0].title === "DSA";

  if (isSingleDSA) {
    return (
      <div className="space-y-2 pl-2">
        {topic.subTopics[0].questions.map((q) => (
          <QuestionRow key={q.id} question={q} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {topic.subTopics.map((st) => (
        <div key={st.id} className="pl-2">
          <h4 className="font-semibold mb-2 text-sm text-muted-foreground">
            {st.title}
          </h4>
          <div className="space-y-2">
            {st.questions.map((q) => (
              <QuestionRow key={q.id} question={q} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopicBody;
