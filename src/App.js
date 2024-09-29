import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteItemList from './components/NoteItemList';
import NoteForm from './components/NoteForm';
import './index.css';


function App() {
  return (
 
    <Routes>
      <Route path="/" element={<NoteItemList />} />
        <Route path="/add" element={<NoteForm />} />
      <Route path="/edit/:id" element={<NoteForm />} />
    </Routes>
  );
}

export default App;
