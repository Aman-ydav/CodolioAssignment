import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import QuestionRow from "./QuestionRow";
import AddQuestionModal from "./AddQuestionModal";

const SubTopicAccordion = ({ subTopic }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={subTopic.id}>
        <AccordionTrigger className="text-sm font-medium">
          {subTopic.title} ({subTopic.questions.length})
        </AccordionTrigger>

        <AccordionContent className="pl-2 space-y-2">
          <AddQuestionModal
            topicId={subTopic.parentTopicId}
            subTopicId={subTopic.id}
          />

          <div className="space-y-2 mt-2">
            {subTopic.questions.map((q) => (
              <QuestionRow key={q.id} question={q} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SubTopicAccordion;
