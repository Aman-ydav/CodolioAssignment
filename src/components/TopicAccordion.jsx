import { useEffect, useRef } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import TopicCard from "./TopicCard";
import TopicBody from "./TopicBody";

const TopicAccordion = ({
  topic,
  isOpen,
  onOpenChange,
  dragHandleProps,
  enableHoverOpen,
}) => {
  const hoverTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);
  return (
    <Accordion
      type="single"
      collapsible
      value={isOpen ? topic.id : ""}
      onValueChange={(v) => onOpenChange(v === topic.id)}
    >
      <AccordionItem value={topic.id}>
        <AccordionTrigger
          className="px-2 w-full relative [&>svg]:absolute [&>svg]:right-8 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2"
          onPointerEnter={() => {
            if (!enableHoverOpen) return;
            if (hoverTimerRef.current) {
              clearTimeout(hoverTimerRef.current);
            }
            hoverTimerRef.current = setTimeout(() => {
              onOpenChange(true);
            }, 450);
          }}
          onPointerLeave={() => {
            if (!enableHoverOpen) return;
            if (hoverTimerRef.current) {
              clearTimeout(hoverTimerRef.current);
              hoverTimerRef.current = null;
            }
          }}
        >
          <TopicCard topic={topic} dragHandleProps={dragHandleProps} />
        </AccordionTrigger>

        <AccordionContent className="px-4 pb-2">
          <TopicBody topic={topic} enableHoverOpen={enableHoverOpen} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TopicAccordion;
