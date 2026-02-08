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

  // Step 3 — convert object map to array
  console.log(topicMap);
  return topicOrder.map((t) => ({
    ...topicMap[t],
    subTopics: Object.values(topicMap[t].subTopics),
  }));
};

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
            id: "DSA",
            title: "DSA",
            questions: [],
          },
        ],
      });
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

export const { addTopic } = sheetSlice.actions;
export default sheetSlice.reducer;
