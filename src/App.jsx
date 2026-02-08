import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSheet } from "./store/sheetSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSheet());
  }, []);

  return (
    <>
      <h1 className='text-amber-900'>Question Sheet</h1>
    </>
  )
}

export default App
