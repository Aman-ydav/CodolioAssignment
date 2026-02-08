import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import QuestionRow from "./QuestionRow";
import AddQuestionModal from "./AddQuestionModal";
import EditSubTopicModal from "./EditSubTopicModal";
import DeleteSubTopicModal from "./DeleteSubTopicModal";
import { Droppable, Draggable } from "@hello-pangea/dnd";

const SubTopicAccordion = ({ subTopic }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={subTopic.id}>
        <AccordionTrigger className="text-sm font-medium flex justify-between">
          <span>
            {subTopic.title} ({subTopic.questions.length})
          </span>

          <span className="flex gap-2">
            <EditSubTopicModal
              topicId={subTopic.parentTopicId}
              subTopic={subTopic}
            />
            <DeleteSubTopicModal
              topicId={subTopic.parentTopicId}
              subTopic={subTopic}
            />
          </span>
        </AccordionTrigger>

        <AccordionContent className="pl-2 space-y-2">
          <AddQuestionModal
            topicId={subTopic.parentTopicId}
            subTopicId={subTopic.id}
          />

          <Droppable
            droppableId={`q::${encodeURIComponent(
              subTopic.parentTopicId
            )}::${encodeURIComponent(subTopic.id)}`}
            type="QUESTION"
          >
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {subTopic.questions.map((q, idx) => (
                  <Draggable key={q.id} draggableId={`q-${q.id}`} index={idx}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="mb-1"
                      >
                        <QuestionRow
                          question={q}
                          topicId={subTopic.parentTopicId}
                          subTopicId={subTopic.id}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SubTopicAccordion;
