import React from "react";

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = React.useState("");

  const handleSearch = () => {
    onSearch(inputValue);
    setInputValue("");
  };

  return (
    <div className="flex justify-center my-8">
      <input
        type="text"
        className="shadow p-2 border rounded w-1/3"
        placeholder="Search for a city..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
