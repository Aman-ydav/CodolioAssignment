import { Droppable, Draggable } from "@hello-pangea/dnd";
import AddSubTopicBar from "./subtopic/AddSubTopicBar";
import SubTopicAccordion from "./SubTopicAccordion";

const TopicBody = ({ topic }) => {
  return (
    <div className="space-y-4">
      <AddSubTopicBar topicId={topic.id} />

      <Droppable droppableId={`subtopics-${topic.id}`} type="SUBTOPIC">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2"
          >
            {topic.subTopics.map((st, index) => (
              <Draggable
                key={st.id}
                draggableId={`sub-${st.id}`}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="pl-2"
                  >
                    <SubTopicAccordion
                      subTopic={{ ...st, parentTopicId: topic.id }}
                      dragHandleProps={provided.dragHandleProps}
                    />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TopicBody;
