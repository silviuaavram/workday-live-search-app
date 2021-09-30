import * as React from "react";
import "./App.css";
import { useData } from "./data.utils";
import { getNextIndex } from "./App.utils";

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const [inputValue, setInputValue] = React.useState("");
  const { data: unfilteredUsers, errorMessage, isError, isLoading } = useData();

  // used to determine if the input was blurred after a toggle button click.
  const toggleButtonClickedRef = React.useRef(false);
  const highlightedIndexChangeByKeyRef = React.useRef(false);
  const toggleButtonRef = React.useRef<HTMLButtonElement>();
  const inputRef = React.useRef<HTMLInputElement>();

  // filter the users only when unfilter users or input change.
  const users = React.useMemo(() => {
    const regexp = new RegExp([...inputValue].join(".*"), "i");

    return unfilteredUsers.filter((user) => regexp.test(user.name));
  }, [unfilteredUsers, inputValue]);

  React.useEffect(() => {
    if (
      isOpen &&
      toggleButtonRef.current === document.activeElement &&
      inputRef.current
    ) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen && users[highlightedIndex]) {
      // do not scroll into view if highlight comes from mouse
      if (!highlightedIndexChangeByKeyRef.current) {
        return;
      } else {
        highlightedIndexChangeByKeyRef.current = false;
      }

      const element = document.getElementById(users[highlightedIndex].id);

      if (element) {
        element.scrollIntoView(false);
      }
    }
  }, [highlightedIndex, users, isOpen]);

  if (isLoading) {
    return <div role="alert">Loading ...</div>;
  }

  if (isError) {
    return <div role="alert">Error retrieving the users: {errorMessage}</div>;
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleToggleButtonClick() {
    toggleButtonClickedRef.current = true;
    setIsOpen(!isOpen);
  }

  function handleInputFocus() {
    setIsOpen(true);
  }

  function handleInputBlur() {
    if (toggleButtonClickedRef.current) {
      toggleButtonClickedRef.current = false;
    } else {
      setIsOpen(false);
    }
  }

  function handleOptionMouseOver(index: number) {
    setHighlightedIndex(index);
  }

  function handleInputKeyDown(event: React.KeyboardEvent) {
    if (["ArrowDown", "ArrowUp", "End", "Home"].indexOf(event.key) > -1) {
      highlightedIndexChangeByKeyRef.current = true;
      setHighlightedIndex(
        getNextIndex(highlightedIndex, users.length, event.key)
      );
    }

    if (event.key === "Enter") {
      setInputValue(users[highlightedIndex].name);
      setHighlightedIndex(-1);
      setIsOpen(false);
    }
  }

  function handleItemClick(index: number) {
    setInputValue(users[index].name);
    setHighlightedIndex(-1);
    setIsOpen(false);
  }

  return (
    <div className="app-container">
      <label htmlFor="search-box">Manager</label>
      <div className="search-wrapper">
        <input
          type="text"
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-controls="suggestions-list"
          aria-expanded={isOpen}
          aria-activedescendant={users[highlightedIndex]?.id ?? ""}
          id="search-box"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          ref={inputRef}
        />
        <button
          type="button"
          aria-controls="suggestions-list"
          tabIndex={-1}
          aria-expanded={isOpen}
          aria-label={`${isOpen ? "hide" : "show"} results`}
          onClick={handleToggleButtonClick}
          ref={toggleButtonRef}
        >
          <svg
            className={isOpen ? "toggle-icon-rotated" : undefined}
            width="18"
            height="16"
            aria-hidden="true"
            focusable="false"
          >
            <polygon points="1,4 17,4 9,15"></polygon>
            <polygon points="3,5 15,5 9,13"></polygon>
          </svg>
        </button>
      </div>
      <ul id="suggestions-list" role="listbox" aria-label="suggestions list">
        {isOpen
          ? users.map((user, index) => (
              <li
                key={user.id}
                id={user.id}
                role="option"
                aria-selected={index === highlightedIndex}
                onMouseEnter={() => handleOptionMouseOver(index)}
                className={
                  index === highlightedIndex ? "active-option" : undefined
                }
                onClick={() => handleItemClick(index)}
              >
                <div>{user.name}</div>
                <div>{user.email || "--"}</div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

export default App;
