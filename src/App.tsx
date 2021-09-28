import * as React from "react";
import "./App.css";
import { Employee, getData } from "./data.utils";
import { Status } from "./App.types";

function App() {
  const [users, setUsers] = React.useState<Employee[]>([]);
  const [status, setStatus] = React.useState<Status>(Status.Loading);
  const [isOpen, setIsOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    getData()
      .then((data) => {
        setUsers(data);
        setStatus(Status.Idle);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
  }, []);

  if (status === Status.Loading) {
    return <div role="alert">Loading ...</div>;
  }

  if (status === Status.Error) {
    return <div role="alert">Error retrieving the users.</div>;
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  return (
    <div>
      <label htmlFor="search-box">Manager</label>
      <div>
        <input
          role="combobox"
          aria-autocomplete="list"
          aria-controls="suggestions-list"
          aria-expanded={isOpen}
          aria-activedescendant={users[highlightedIndex]?.id ?? ""}
          id="search-box"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          type="button"
          aria-controls="suggestions-list"
          tabIndex={-1}
          aria-expanded={isOpen}
          aria-label={`${isOpen ? "hide" : "show"} results`}
        ></button>
      </div>
      <ul
        id="suggestions-list"
        role="listbox"
        aria-label="suggestions list"
      ></ul>
      {isOpen
        ? users.map((user: Employee, index: number) => (
            <li
              key={user.id}
              id={user.id}
              role="option"
              aria-selected={index === highlightedIndex}
            ></li>
          ))
        : null}
    </div>
  );
}

export default App;
