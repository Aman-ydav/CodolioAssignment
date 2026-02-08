import { useDispatch } from "react-redux";
import { deleteSubTopic } from "../../store/sheetSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteSubTopicModal = ({ topicId, subTopic }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      deleteSubTopic({
        topicId,
        subTopicId: subTopic.id,
      })
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span
          className="cursor-pointer text-red-600 hover:text-red-700 text-sm px-2"
          onClick={(e) => e.stopPropagation()}
        >
          Delete
        </span>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Subtopic</DialogTitle>
        </DialogHeader>

        <p>
          Delete <strong>{subTopic.title}</strong>?  
          This will delete all its questions.
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

export default DeleteSubTopicModal;

