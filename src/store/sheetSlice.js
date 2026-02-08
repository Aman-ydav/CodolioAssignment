import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSheet = createAsyncThunk("sheet/fetchSheet", async () => {
  const res = await axios.get(
    "https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/striver-sde-sheet",
  );
  //   console.log(res.data);
  const questions = res.data.data.questions;
  const topicOrder = res.data.data.sheet.config.topicOrder;

  return { questions, topicOrder };
});

const buildHierarchy = (questions, topicOrder) => {
  const topicMap = {};

  // create empty topics in correct order
  topicOrder.forEach((topic) => {
    topicMap[topic] = {
      id: topic,
      title: topic,
      subTopics: {},
    };
  });

  //  place each question into topic → subtopic
  questions.forEach((q) => {
    const topicName = q.topic;
    const subTopicName = q.subTopic || "DSA";

    if (!topicMap[topicName]) return;

    if (!topicMap[topicName].subTopics[subTopicName]) {
      topicMap[topicName].subTopics[subTopicName] = {
        uid: `${topicName}::${subTopicName}`,
        id: subTopicName,
        title: subTopicName,
        questions: [],
      };
    }

    topicMap[topicName].subTopics[subTopicName].questions.push({
      id: q._id,
      title: q.title,
      url: q.questionId?.problemUrl,
      difficulty: q.questionId?.difficulty,
    });
  });

  //convert object map to array

  //   console.log(topicMap);
  return topicOrder.map((t) => ({
    ...topicMap[t],
    subTopics: Object.values(topicMap[t].subTopics),
  }));
};

const createSubTopicUid = () =>
  `sub-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const initialState = {
  topics: [],
  status: "idle",
  error: null,
};

const sheetSlice = createSlice({
  name: "sheet",
  initialState,
  reducers: {
    addTopic: (state, action) => {
      const title = action.payload.trim();

      if (!title) return;

      const exists = state.topics.some(
        (t) => t.title.toLowerCase() === title.toLowerCase(),
      );
      if (exists) return;

      state.topics.push({
        id: title,
        title: title,
        subTopics: [
          {
            uid: createSubTopicUid(),
            id: "DSA",
            title: "DSA",
            questions: [],
          },
        ],
      });
    },
    addSubTopic: (state, action) => {
      const { topicId, title } = action.payload;
      const cleanTitle = title.trim();

      if (!cleanTitle) return;

      const topic = state.topics.find((t) => t.id === topicId);
      if (!topic) return;

      // Prevent duplicate subtopic names inside same topic
      const exists = topic.subTopics.some(
        (st) => st.title.toLowerCase() === cleanTitle.toLowerCase(),
      );
      if (exists) return;

      topic.subTopics.push({
        uid: createSubTopicUid(),
        id: cleanTitle,
        title: cleanTitle,
        questions: [],
      });
    },
    addQuestion: (state, action) => {
      const { topicId, subTopicId, title, url, difficulty } = action.payload;

      const cleanTitle = title.trim();
      if (!cleanTitle) return;

      const topic = state.topics.find((t) => t.id === topicId);
      if (!topic) return;

      const subTopic = topic.subTopics.find((st) => st.id === subTopicId);
      if (!subTopic) return;

      subTopic.questions.push({
        id: Date.now().toString(),
        title: cleanTitle,
        url: url || "",
        difficulty: difficulty || "Medium",
      });
    },
    editTopic: (state, action) => {
      const { topicId, newTitle } = action.payload;
      const topic = state.topics.find((t) => t.id === topicId);
      if (topic) {
        topic.id = newTitle;
        topic.title = newTitle;
      }
    },

    deleteTopic: (state, action) => {
      state.topics = state.topics.filter((t) => t.id !== action.payload);
    },
    editSubTopic: (state, action) => {
      const { topicId, subTopicId, newTitle } = action.payload;
      const cleanTitle = newTitle.trim();
      if (!cleanTitle) return;

      const topic = state.topics.find((t) => t.id === topicId);
      if (!topic) return;

      const sub = topic.subTopics.find((st) => st.id === subTopicId);
      if (!sub) return;

      sub.id = cleanTitle;
      sub.title = cleanTitle;
    },
    deleteSubTopic: (state, action) => {
      const { topicId, subTopicId } = action.payload;

      const topic = state.topics.find((t) => t.id === topicId);
      if (!topic) return;

      topic.subTopics = topic.subTopics.filter((st) => st.id !== subTopicId);
    },

    editQuestion: (state, action) => {
      const { topicId, subTopicId, questionId, updates } = action.payload;

      const topic = state.topics.find((t) => t.id === topicId);
      if (!topic) return;

      const sub = topic.subTopics.find((st) => st.id === subTopicId);
      if (!sub) return;

      const q = sub.questions.find((q) => q.id === questionId);
      if (!q) return;

      Object.assign(q, updates);
    },
    deleteQuestion: (state, action) => {
      const { topicId, subTopicId, questionId } = action.payload;

      const topic = state.topics.find((t) => t.id === topicId);
      if (!topic) return;

      const sub = topic.subTopics.find((st) => st.id === subTopicId);
      if (!sub) return;

      sub.questions = sub.questions.filter((q) => q.id !== questionId);
    },
    reorderTopics: (state, action) => {
  const { sourceIndex, destinationIndex } = action.payload;

  const [moved] = state.topics.splice(sourceIndex, 1);
  state.topics.splice(destinationIndex, 0, moved);
},
    reorderSubTopics: (state, action) => {
  const { topicId, sourceIndex, destinationIndex } = action.payload;

  const topic = state.topics.find(t => t.id === topicId);
  if (!topic) return;

  const [moved] = topic.subTopics.splice(sourceIndex, 1);
  topic.subTopics.splice(destinationIndex, 0, moved);
},
moveSubTopic: (state, action) => {
  const { fromTopicId, toTopicId, sourceIndex, destinationIndex } = action.payload;

  const fromTopic = state.topics.find(t => t.id === fromTopicId);
  const toTopic = state.topics.find(t => t.id === toTopicId);
  if (!fromTopic || !toTopic) return;

  const [moved] = fromTopic.subTopics.splice(sourceIndex, 1);
  if (!moved) return;

  const insertIndex =
    typeof destinationIndex === "number"
      ? destinationIndex
      : toTopic.subTopics.length;
  toTopic.subTopics.splice(insertIndex, 0, moved);
},

moveQuestion: (state, action) => {
  const {
    fromTopicId,
    fromSubTopicId,
    toTopicId,
    toSubTopicId,
    questionIndex,
    destinationIndex,
  } = action.payload;

  const fromTopic = state.topics.find(t => t.id === fromTopicId);
  const toTopic = state.topics.find(t => t.id === toTopicId);
  if (!fromTopic || !toTopic) return;

  const fromSub = fromTopic.subTopics.find(st => st.id === fromSubTopicId);
  const toSub = toTopic.subTopics.find(st => st.id === toSubTopicId);
  if (!fromSub || !toSub) return;

  if (
    fromTopicId === toTopicId &&
    fromSubTopicId === toSubTopicId &&
    questionIndex === destinationIndex
  ) {
    return;
  }

  const [moved] = fromSub.questions.splice(questionIndex, 1);
  const insertIndex =
    typeof destinationIndex === "number"
      ? destinationIndex
      : toSub.questions.length;
  toSub.questions.splice(insertIndex, 0, moved);
},


  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSheet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSheet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSheet.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { questions, topicOrder } = action.payload;
        state.topics = buildHierarchy(questions, topicOrder);
      });
  },
});

export const {
  addTopic,
  addSubTopic,
  addQuestion,
  editTopic,
  deleteTopic,
  editSubTopic,
  deleteSubTopic,
  editQuestion,
  deleteQuestion,

} = sheetSlice.actions;
export const {
  reorderTopics,
  reorderSubTopics,
  moveSubTopic,
  moveQuestion,
} = sheetSlice.actions;

export default sheetSlice.reducer;
