import { useEffect, useState } from "react";

type VirtualizedListProps<T> = {
  items: T[];
  itemHeight: number;
  containerHeight: number;
};

export const useVirtualizedList = <T>({
  items,
  itemHeight,
  containerHeight,
}: VirtualizedListProps<T>) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  const totalVisibleItems = Math.ceil(containerHeight / itemHeight);

  useEffect(() => {
    setEndIndex(totalVisibleItems);
  }, [containerHeight, itemHeight, totalVisibleItems]);

  const handleScroll = (scrollTop: number) => {
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    setStartIndex(newStartIndex);
    setEndIndex(newStartIndex + totalVisibleItems);
  };

  const visibleItems = items.slice(startIndex, endIndex);

  const offsetTop = startIndex * itemHeight;

  const offsetBottom =
    (items.length - visibleItems.length) * itemHeight - offsetTop;

  return { visibleItems, offsetTop, offsetBottom, handleScroll };
};
