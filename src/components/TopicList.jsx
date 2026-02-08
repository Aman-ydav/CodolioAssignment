import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  reorderTopics,
  reorderSubTopics,
  moveSubTopic,
  moveQuestion,
} from "../store/sheetSlice";

import TopicAccordion from "./TopicAccordion";

const TopicList = () => {
  const topics = useSelector((state) => state.sheet.topics);
  const dispatch = useDispatch();
  const [openTopics, setOpenTopics] = useState({});
  const [isDraggingQuestion, setIsDraggingQuestion] = useState(false);
  const expandTimerRef = useRef(null);
  const lastExpandTargetRef = useRef(null);

  const parseQuestionDroppableId = (droppableId) => {
    if (!droppableId || !droppableId.startsWith("q::")) return null;
    const parts = droppableId.split("::");
    if (parts.length < 3) return null;
    const topicId = decodeURIComponent(parts[1]);
    const subTopicId = decodeURIComponent(parts[2]);
    return { topicId, subTopicId };
  };

  const scheduleTopicOpen = (topicId, delayMs = 450) => {
    if (!topicId) return;
    if (lastExpandTargetRef.current === topicId) return;

    if (expandTimerRef.current) {
      clearTimeout(expandTimerRef.current);
    }

    lastExpandTargetRef.current = topicId;
    expandTimerRef.current = setTimeout(() => {
      setOpenTopics((prev) => ({ ...prev, [topicId]: true }));
    }, delayMs);
  };

  const clearExpandTimer = () => {
    if (expandTimerRef.current) {
      clearTimeout(expandTimerRef.current);
      expandTimerRef.current = null;
    }
    lastExpandTargetRef.current = null;
  };

  const handleDragEnd = (result) => {
    setIsDraggingQuestion(false);
    clearExpandTimer();
    if (!result.destination) return;

    const { source, destination, type } = result;

    // ---- 1) TOPICS ----
    if (type === "TOPIC") {
      dispatch(
        reorderTopics({
          sourceIndex: source.index,
          destinationIndex: destination.index,
        })
      );
    }

    // ---- 2) SUBTOPICS ----
    if (type === "SUBTOPIC") {
      const fromTopicId = source.droppableId.replace("subtopics-", "");
      const toTopicId = destination.droppableId.replace("subtopics-", "");

      if (fromTopicId === toTopicId) {
        dispatch(
          reorderSubTopics({
            topicId: fromTopicId,
            sourceIndex: source.index,
            destinationIndex: destination.index,
          })
        );
      } else {
        dispatch(
          moveSubTopic({
            fromTopicId,
            toTopicId,
            sourceIndex: source.index,
            destinationIndex: destination.index,
          })
        );
      }
    }

    // ---- 3) QUESTIONS
    if (type === "QUESTION") {
      const fromParsed = parseQuestionDroppableId(source.droppableId);
      const toParsed = parseQuestionDroppableId(destination.droppableId);
      if (!fromParsed || !toParsed) return;

      dispatch(
        moveQuestion({
          fromTopicId: fromParsed.topicId,
          fromSubTopicId: fromParsed.subTopicId,
          toTopicId: toParsed.topicId,
          toSubTopicId: toParsed.subTopicId,
          questionIndex: source.index,
          destinationIndex: destination.index,
        })
      );
    }
  };

  const handleDragStart = (start) => {
    clearExpandTimer();
    setIsDraggingQuestion(start.type === "QUESTION");
  };

  const handleDragUpdate = (update) => {
    if (!update.destination) return;
    if (update.type !== "QUESTION") return;
    const parsed = parseQuestionDroppableId(update.destination.droppableId);
    if (parsed?.topicId) {
      scheduleTopicOpen(parsed.topicId, 450);
    }
  };
  return (
    <DragDropContext
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
      onDragEnd={handleDragEnd}
    >
      <Droppable droppableId="topics" type="TOPIC">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-4"
          >
            {topics.map((topic, index) => (
              <Draggable key={topic.id} draggableId={topic.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <TopicAccordion
                      topic={topic}
                      dragHandleProps={provided.dragHandleProps}
                      enableHoverOpen={isDraggingQuestion}
                      isOpen={!!openTopics[topic.id]}
                      onOpenChange={(open) =>
                        setOpenTopics((prev) => ({
                          ...prev,
                          [topic.id]: open,
                        }))
                      }
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TopicList;
