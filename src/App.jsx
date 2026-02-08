import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSheet } from "./store/sheetSlice";
import TopicList from "./components/TopicList";
import AddTopicBar from "./components/topic/AddTopicBar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSheet());
  }, [dispatch]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-kicker">Interactive Question Management Sheet</p>
          <h1>Codolio Sheet Assignment</h1>
          <p className="app-subtitle">
            Curate topics, organize sub-topics, and manage questions with drag-and-drop.
          </p>
        </div>
        <div className="dev-card">
          <p className="dev-card__label">Developed By</p>
          <p className="dev-card__name">Aman Yadav</p>
          <a
            className="dev-card__mail"
            href="mailto:amanyadav923949@gmail.com"
          >
            amanyadav923949@gmail.com
          </a>
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
