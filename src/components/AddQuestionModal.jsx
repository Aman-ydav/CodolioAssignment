import { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuestion } from "../store/sheetSlice";
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

const AddQuestionModal = ({ topicId, subTopicId }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");

  const handleAdd = () => {
    dispatch(
      addQuestion({
        topicId,
        subTopicId,
        title,
        url,
        difficulty,
      })
    );

    setTitle("");
    setUrl("");
    setDifficulty("Medium");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="
            bg-(--sheet-card)
            text-(--sheet-ink)
            border border-(--sheet-line)
            hover:bg-[#fff6e9]
          "
        >
          + Add Question
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          bg-(--sheet-card)
          border border-(--sheet-line)
          text-(--sheet-ink)
          rounded-xl
        "
      >
        <DialogHeader>
          <DialogTitle className="text-(--sheet-ink)">
            Add New Question
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          <Input
            placeholder="Question title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
              bg-white
              border-(--sheet-line)
              focus:border-(--sheet-accent)
            "
          />

          <Input
            placeholder="Problem link (optional)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="
              bg-white
              border-(--sheet-line)
              focus:border-(--sheet-accent)
            "
          />

          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger
              className="
                bg-white
                border-(--sheet-line)
                focus:border-(--sheet-accent)
              "
            >
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>

            <SelectContent className="bg-(--sheet-card)">
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleAdd}
            className="
              w-full
              bg-(--sheet-accent)
              hover:bg-[#d65314]
              text-white
            "
          >
            Add Question
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionModal;
