import { useSelector } from "react-redux";

const TopicList = () => {
  const topics = useSelector((state) => state.sheet.topics);

  return (
    <div style={{ padding: "20px" }}>
      {topics.map((topic) => (
        <div 
          key={topic.id} 
          style={{ 
            border: "1px solid #ccc", 
            padding: "10px", 
            marginBottom: "10px" 
          }}
        >
          <h2>{topic.title}</h2>

          {topic.subTopics.length === 1 &&
          topic.subTopics[0].title === "DSA" ? (
            // Show questions directly
            <ul>
              {topic.subTopics[0].questions.map((q) => (
                <li key={q.id}>
                  {q.title} — <b>{q.difficulty}</b>
                </li>
              ))}
            </ul>
          ) : (
            // If multiple subtopics exist
            topic.subTopics.map((st) => (
              <div key={st.id}>
                <h4>{st.title}</h4>
                <ul>
                  {st.questions.map((q) => (
                    <li key={q.id}>{q.title}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default TopicList;
