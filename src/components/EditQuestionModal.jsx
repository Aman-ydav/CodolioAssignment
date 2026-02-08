import { useState } from "react";
import { useDispatch } from "react-redux";
import { editQuestion } from "../store/sheetSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditQuestionModal = ({ topicId, subTopicId, question }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(question.title);
  const [url, setUrl] = useState(question.url || "");
  const [difficulty, setDifficulty] = useState(question.difficulty);

  const handleSave = () => {
    dispatch(
      editQuestion({
        topicId,
        subTopicId,
        questionId: question.id,
        updates: {
          title,
          url,
          difficulty,
        },
      })
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer text-gray-600 hover:text-black px-2">
          Edit
        </span>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
        </DialogHeader>

        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Question title"
        />

        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Problem link"
        />

        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSave}>Save</Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuestionModal;

