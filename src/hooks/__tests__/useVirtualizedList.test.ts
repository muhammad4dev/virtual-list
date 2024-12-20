import { act, renderHook } from "@testing-library/react";
import { useVirtualizedList } from "../useVirtualizedList";

describe("useVirtualizedList", () => {
  const items = Array.from({ length: 100 }, (_, i) => `Item ${i}`); // Mock items
  const itemHeight = 30;
  const containerHeight = 120; // Can fit 4 items at a time (120 / 30)

  it("should initialize with the correct visible items and offsets", () => {
    const { result } = renderHook(() =>
      useVirtualizedList({
        items,
        itemHeight,
        containerHeight,
      })
    );

    // Initially, visible items should be the first 4 (due to containerHeight / itemHeight).
    expect(result.current.visibleItems).toEqual([
      "Item 0",
      "Item 1",
      "Item 2",
      "Item 3",
    ]);
    expect(result.current.offsetTop).toBe(0); // No scroll initially
    expect(result.current.offsetBottom).toBe((items.length - 4) * itemHeight); // Remaining items' height
  });

  it("should update visible items and offsets when scrolled", () => {
    const { result } = renderHook(() =>
      useVirtualizedList({
        items,
        itemHeight,
        containerHeight,
      })
    );

    // Simulate scrolling to 90px (scrollTop = 90)
    act(() => {
      result.current.handleScroll(90);
    });

    // After scrolling, visible items should start from Item 3
    expect(result.current.visibleItems).toEqual([
      "Item 3",
      "Item 4",
      "Item 5",
      "Item 6",
    ]);
    expect(result.current.offsetTop).toBe(90); // Top offset should now reflect scrolled height
    expect(result.current.offsetBottom).toBe((items.length - 7) * itemHeight);
  });

  it("should handle empty items gracefully", () => {
    const { result } = renderHook(() =>
      useVirtualizedList({
        items: [],
        itemHeight,
        containerHeight,
      })
    );

    // When there are no items, visibleItems should be empty
    expect(result.current.visibleItems).toEqual([]);
    expect(result.current.offsetTop).toBe(0);
    expect(result.current.offsetBottom).toBe(0);
  });

  it("should handle changes to containerHeight and itemHeight dynamically", () => {
    const { result, rerender } = renderHook(
      (props) => useVirtualizedList(props),
      {
        initialProps: {
          items,
          itemHeight: 30,
          containerHeight: 120,
        },
      }
    );

    // Initially, visible items should match initial props
    expect(result.current.visibleItems).toEqual([
      "Item 0",
      "Item 1",
      "Item 2",
      "Item 3",
    ]);

    // Change containerHeight to 90 (can fit 3 items)
    rerender({ items, itemHeight: 30, containerHeight: 90 });
    expect(result.current.visibleItems).toEqual(["Item 0", "Item 1", "Item 2"]);
  });

  it("should correctly calculate total visible items and offsets", () => {
    const { result } = renderHook(() =>
      useVirtualizedList({
        items,
        itemHeight,
        containerHeight: 150, // Can fit 5 items
      })
    );

    expect(result.current.visibleItems).toEqual([
      "Item 0",
      "Item 1",
      "Item 2",
      "Item 3",
      "Item 4",
    ]);
    expect(result.current.offsetTop).toBe(0);
    expect(result.current.offsetBottom).toBe((items.length - 5) * itemHeight);
  });
});
