import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import TopicCard from "./TopicCard";
import TopicBody from "./TopicBody";

const TopicAccordion = ({ topic }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={topic.id}>
        <AccordionTrigger className="px-2">
          <TopicCard topic={topic} />
        </AccordionTrigger>

        <AccordionContent className="px-4 pb-2">
            <TopicBody topic={topic} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TopicAccordion;
