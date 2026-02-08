# Interactive Question Management Sheet

## ?? Overview

This project is a **single-page React application** that allows users to manage a hierarchical question sheet structured as:

```
Topic ? Subtopic ? Questions
```

It is inspired by the **Codolio sheet interface** and fulfills all the functional requirements of the assignment, including:

* Create / Edit / Delete Topics
* Create / Edit / Delete Subtopics
* Create / Edit / Delete Questions
* Drag-and-drop reordering of:

  * Topics
  * Subtopics
  * Questions (even across topics)

The app uses **Redux Toolkit** for state management and **@hello-pangea/dnd** for drag-and-drop interactions.

---

## ??? Tech Stack

| Layer       | Technology                                                   |
| ----------- | ------------------------------------------------------------ |
| Frontend    | React + Vite                                                 |
| Styling     | Tailwind CSS + shadcn/ui                                     |
| State       | Redux Toolkit                                                |
| Drag & Drop | @hello-pangea/dnd                                            |
| API         | Public Codolio sheet API (read-only) + local state mutations |

---

## ?? Data Flow & API Strategy

### 1?? Initial Data Load

On app startup:

* The app fetches data from:

```
https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/striver-sde-sheet
```

* From this response, we extract:

  * `questions`
  * `topicOrder`

* We then transform this into a structured hierarchy inside Redux:

```
state.topics = [
  {
    id: "Arrays",
    title: "Arrays",
    subTopics: [
      {
        id: "DSA",
        title: "DSA",
        questions: [...]
      }
    ]
  }
]
```

This transformation happens in a helper function called `buildHierarchy()` inside `sheetSlice.js`.

---

### 2?? Why Every Topic Starts With One “DSA” Subtopic

Many topics in the dataset do not explicitly define multiple subtopics.

To ensure a consistent UI, we **automatically create one default subtopic named “DSA”** if none exists.

This means:

* Even if the API gives only topic-level questions,
* They appear inside:

```
Topic ? DSA ? Questions
```

This makes:

* Dragging easier
* UI consistent
* Future additions cleaner

---

### 3?? CRUD Without a Real Backend

Since the assignment allows CRUD **without a real database**, we implemented:

| Action          | Where it happens |
| --------------- | ---------------- |
| Add Topic       | Redux            |
| Edit Topic      | Redux            |
| Delete Topic    | Redux            |
| Add Subtopic    | Redux            |
| Edit Subtopic   | Redux            |
| Delete Subtopic | Redux            |
| Add Question    | Redux            |
| Edit Question   | Redux            |
| Delete Question | Redux            |

No POST/PUT requests are sent to the real Codolio API — instead, **all changes live in Redux state.**

This is effectively a **client-side mock API.**

---

## ??? Drag-and-Drop Implementation

We use **@hello-pangea/dnd** with three levels of drag support:

### ? Topics Drag

* You can reorder topics vertically.
* Redux action used:

```js
reorderTopics
```

### ? Subtopics Drag

* You can reorder subtopics inside the same topic.
* Redux action used:

```js
reorderSubTopics
```

### ? Questions Drag (Cross-topic supported)

You can drag a question from:

```
Arrays ? DSA
```

and drop it into:

```
Graph ? BFS
```

When hovering over a topic while dragging a question, **the topic auto-expands** so you can drop inside a subtopic.

Redux action used:

```js
moveQuestion
```

---

## ?? Bonus Improvements Implemented

Beyond the requirements, this project adds:

* Auto-expanding topics when hovering during drag
* Clean card-based UI
* Animated modals using shadcn/ui
* Visual hierarchy (Topic ? Subtopic ? Question)
* Difficulty tagging (Easy / Medium / Hard)

---

## ?? How to Run the Project

### 1?? Clone the repo

```bash
git clone <YOUR_REPO_LINK>
cd your-project-folder
```

### 2?? Install dependencies

```bash
npm install
```

### 3?? Start the app

```bash
npm run dev
```

Then open:

```
http://localhost:5173
```

---

## ?? Key Files (for reviewers)

| File                    | Purpose               |
| ----------------------- | --------------------- |
| `store/sheetSlice.js`   | All CRUD + drag logic |
| `TopicList.jsx`         | Master drag handler   |
| `TopicAccordion.jsx`    | Auto-open logic       |
| `TopicBody.jsx`         | Subtopic drag         |
| `SubTopicAccordion.jsx` | Question drag         |
| `AddQuestionModal.jsx`  | shadcn popup form     |

---

## ?? Submission

GitHub Repository:
?? **PASTE YOUR REPO LINK HERE**

---

### ? What this README proves to evaluators

It clearly shows that you:

* Used React
* Used Redux Toolkit
* Used real API data
* Implemented hierarchical drag-and-drop
* Built structured state
* Did not hardcode everything
* Followed assignment requirements

If you want, I can:

* rewrite this in more formal academic tone, or
* adapt it to match your exact project folder names.
