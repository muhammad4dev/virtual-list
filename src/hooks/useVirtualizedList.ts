import { useEffect, useMemo, useState } from "react";

type VirtualizedListProps<T> = {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  searchQuery?: string;
  searchKey?: keyof T;
};

export const useVirtualizedList = <T>({
  items,
  itemHeight,
  containerHeight,
  searchQuery,
  searchKey,
}: VirtualizedListProps<T>) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  const totalVisibleItems = Math.ceil(containerHeight / itemHeight);

  // Filtered items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;

    const lowerCaseQuery = searchQuery.toLowerCase();

    return items.filter((item) => {
      if (searchKey) {
        const value = item[searchKey];
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(lowerCaseQuery)
        );
      }

      return Object.values(item as Record<string, unknown>).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(lowerCaseQuery)
      );
    });
  }, [items, searchQuery, searchKey]);

  useEffect(() => {
    setEndIndex(totalVisibleItems);
  }, [containerHeight, itemHeight, totalVisibleItems]);

  const handleScroll = (scrollTop: number) => {
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    setStartIndex(newStartIndex);
    setEndIndex(newStartIndex + totalVisibleItems);
  };

  const visibleItems = filteredItems.slice(startIndex, endIndex);

  const offsetTop = startIndex * itemHeight;
  const offsetBottom =
    (filteredItems.length - visibleItems.length) * itemHeight - offsetTop;

  return { visibleItems, offsetTop, offsetBottom, handleScroll, filteredItems };
};
