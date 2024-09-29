import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const categoriesList = ["Work", "Personal", "Urgent", "Other"]; 

const NoteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
   const [category, setCategory] = useState(""); 
  const [notes, setNotes] = useState([]);
  const [titleError, setTitleError] = useState("");
   const [contentError, setContentError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);

    if (id) {
      const existingNote = storedNotes.find(note => note.id === id);
      if (existingNote) {
          setTitle(existingNote.title);
        setContent(existingNote.content);
          setCategory(existingNote.category); 
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
       setTitleError("");
      setContentError("");
    setCategoryError("");

    let hasError = false;

 
    if (title.trim() === "") {
      setTitleError("Please Enter Title");
      hasError = true;
    }

   
    if (content.trim() === "") {
      setContentError("Please Enter Content");
      hasError = true;
    }

   
    if (category === "") {
      setCategoryError("Please Select Category");
      hasError = true;
    }

    if (hasError) {
      return; 
    }

    
    const duplicateTitle = notes.some(
      (note) => note.title.toLowerCase() === title.toLowerCase() && note.id !== id
    );

    if (duplicateTitle) {
      setTitleError("A note with this title already exists");
      return;
    }

   
    const newNote = { id: id ? id : uuidv4(), title, content, category };
    const updatedNotes = id
      ? notes.map(note => note.id === id ? newNote : note)
      : [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-blue-50 shadow-lg rounded-lg">
  <h1 className="text-3xl font-semibold mb-6 text-gray-900">{id ? "Edit Note" : "Add New Note"}</h1>
  <form onSubmit={handleSubmit}>
    
  
    <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
      <input
        type="text"
        placeholder="Enter Note Title"
        className="border border-gray-300 bg-white rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {titleError && <p className="text-red-500 text-sm mt-1">{titleError}</p>}
    </div>

   
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
      <textarea
        placeholder="Enter Note Content"
        className="border border-gray-300 bg-white rounded-lg p-3 w-full h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {contentError && <p className="text-red-500 text-sm mt-1">{contentError}</p>}
    </div>

  
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
      <select
        className="border border-gray-300 bg-white rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
           <option value="">Select Category</option>
        {categoriesList.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {categoryError && <p className="text-red-500 text-sm mt-1">{categoryError}</p>}
    </div>

  
    <button
      type="submit"
      className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
    >
      {id ? "Update Note" : "Add Note"}
    </button>
  </form>
</div>

  );
};

export default NoteForm;
