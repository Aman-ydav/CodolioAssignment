import { useDispatch } from "react-redux";
import { deleteTopic } from "../../store/sheetSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteTopicModal = ({ topicId, topicTitle }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTopic(topicId));
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
          <DialogTitle>Delete Topic</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-700">
          Are you sure you want to delete
          <strong className="ml-1">{topicTitle}</strong>?
          <br />
          This will remove all its subtopics and questions.
        </p>

        <DialogFooter className="mt-4">
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTopicModal;

