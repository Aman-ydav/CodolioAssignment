import { useDispatch } from "react-redux";
import { deleteQuestion } from "../../store/sheetSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteQuestionModal = ({ topicId, subTopicId, question }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      deleteQuestion({
        topicId,
        subTopicId,
        questionId: question.id,
      })
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer text-red-600 hover:text-red-700 px-2">
            Delete
        </span>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Question</DialogTitle>
        </DialogHeader>

        <p>
          Delete <strong>{question.title}</strong>?
        </p>

        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteQuestionModal;

