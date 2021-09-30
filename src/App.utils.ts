export function getNextIndex(
  highlightedIndex: number,
  total: number,
  key: string
): number {
  switch (key) {
    case "ArrowUp": {
      if (highlightedIndex === -1 || highlightedIndex === 0) {
        return total - 1;
      }

      return highlightedIndex - 1;
    }
    case "ArrowDown": {
      if (highlightedIndex === -1 || highlightedIndex === total - 1) {
        return 0;
      }

      return highlightedIndex + 1;
    }
    case "End": {
      return total - 1;
    }
    case "Home": {
      return 0;
    }
    default:
    // nothing
  }
}
