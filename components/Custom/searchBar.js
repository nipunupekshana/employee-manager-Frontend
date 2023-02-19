import { Form } from "react-bootstrap";

function SearchBar({ onSearch, filters }) {

  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  };

  const handleSearch = debounce((searchText) => {
    onSearch(searchText);
  }, 200);

  return (
    <Form.Control
        type="text"
        placeholder={`Search by ${filters.slice(0, -1).join(" or ")}`}
        onChange={(event) => handleSearch(event.target.value)}
      />
  );
}

export default SearchBar;
