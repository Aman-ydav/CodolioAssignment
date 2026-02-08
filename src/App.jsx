import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSheet } from "./store/sheetSlice";
import TopicList from "./components/TopicList";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSheet());
  }, []);

  return (
    <>
      <h1 className='text-amber-900'>Question Sheet</h1>
      <TopicList />
    </>
  )
}

export default App
