import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editTopic } from "../../store/sheetSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EditTopicModal = ({ topic }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(topic.title);
  const [open, setOpen] = useState(false);

  // Keep input in sync if topic name changes in Redux
  useEffect(() => {
    setTitle(topic.title);
  }, [topic.title]);

  const handleSave = () => {
    const newTitle = title.trim();
    if (!newTitle || newTitle === topic.title) {
      setOpen(false);
      return;
    }

    dispatch(
      editTopic({
        topicId: topic.id,
        newTitle,
      }),
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
          <DialogTitle>Edit Topic</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          <Input
            placeholder="Topic name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTopicModal;

