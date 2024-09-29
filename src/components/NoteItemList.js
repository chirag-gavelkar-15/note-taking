import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import Filter from "./Filter";

const NoteItemList = () => {
  const [notes, setNotes] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1); 
   const notesPerPage = 6; 

  const categoriesList = ["All", "Work", "Personal", "Urgent", "Other"]; 

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  const handleDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

 
  const filteredNotes = notes.filter(note => selectedCategory === "All" || note.category === selectedCategory)
    .filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()));

 
  const indexOfLastNote = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
   const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);

  return (
    <div className="max-w-4xl mx-auto p-4">
     
      <Filter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categoriesList={categoriesList}
      />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Notes</h1>
        <Link
          to="/add"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300"
        >
          Add New Note
        </Link>
      </div>

   
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentNotes.map((note) => (
            <div
              key={note.id}
              className="p-6  bg-blue-50 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
             <h2 className="text-xl font-semibold text-gray-900 mb-2">{note.title}</h2>
            <p className="text-gray-700">{note.content}</p>
                    <p className="text-sm text-gray-500 mt-4">Category: {note.category}</p>

              <div className="mt-4 flex justify-between items-center">
              <Link
                  to={`/edit/${note.id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
                 >
                 Edit
                 </Link>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      ) : (
          <p className="mt-4 text-center text-gray-500">No Notes Available.</p>
      )}

     
         {filteredNotes.length > 0 && (
        <Pagination
          currentPage={currentPage}
            totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default NoteItemList;
