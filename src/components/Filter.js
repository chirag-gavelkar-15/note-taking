const Filter = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categoriesList }) => {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
           placeholder="Search notes by title"
          className="border rounded-md p-2 w-full sm:w-1/2"
           value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border rounded-md p-2 w-full sm:w-1/2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categoriesList.map(category => (
             <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default Filter;
  