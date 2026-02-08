import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editSubTopic } from "../../store/sheetSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EditSubTopicModal = ({ topicId, subTopic }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(subTopic.title);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTitle(subTopic.title);
  }, [subTopic.title]);

  const handleSave = () => {
    const newTitle = title.trim();
    if (!newTitle || newTitle === subTopic.title) {
      setOpen(false);
      return;
    }

    dispatch(
      editSubTopic({
        topicId,
        subTopicId: subTopic.id,
        newTitle,
      })
    );

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span
          className="cursor-pointer text-gray-600 hover:text-black text-sm px-2"
          onClick={(e) => e.stopPropagation()}
        >
          Edit
        </span>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Subtopic</DialogTitle>
        </DialogHeader>

        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Subtopic name"
        />

        <Button onClick={handleSave} className="w-full">
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditSubTopicModal;

