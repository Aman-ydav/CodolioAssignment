import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSheet } from "./store/sheetSlice";
import TopicList from "./components/TopicList";
import AddTopicBar from "./components/AddTopicBar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSheet());
  }, [dispatch]);

  return (
    <div className="app-shell">
      <header className="app-header mx-20">
        <div>
          <p className="app-kicker ">Interactive Question Management Sheet</p>
          <h1>Codolio Sheet Assignment</h1>
          <p className="app-subtitle">
            Curate topics, organize sub-topics, and manage questions with drag-and-drop.
          </p>
        </div>
      </header>
      <main>
        <AddTopicBar />
        <TopicList />
      </main>
    </div>
  );
}

export default App;
