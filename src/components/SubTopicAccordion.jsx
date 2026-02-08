import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import QuestionRow from "./question/QuestionRow";
import AddQuestionModal from "./question/AddQuestionModal";
import EditSubTopicModal from "./subtopic/EditSubTopicModal";
import DeleteSubTopicModal from "./subtopic/DeleteSubTopicModal";
import { Grip } from "lucide-react";
import { Droppable, Draggable } from "@hello-pangea/dnd";

const SubTopicAccordion = ({ subTopic, dragHandleProps }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={subTopic.id}>
        <AccordionTrigger className="text-sm font-medium flex justify-between items-center">
          <span className="flex items-center gap-2">
            <span
              className="inline-flex items-center justify-center cursor-grab"
              {...(dragHandleProps || {})}
            >
              <Grip className="w-4 h-4 text-gray-500" />
            </span>
            <span>{subTopic.title}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-medium">
              {subTopic.questions.length}
            </span>
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
                        className="mb-1"
                      >
                        <QuestionRow
                          question={q}
                          topicId={subTopic.parentTopicId}
                          subTopicId={subTopic.id}
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SubTopicAccordion;
