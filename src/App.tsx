import { useRef } from "react";
import "./App.css";
import { useVirtualizedList } from "./hooks/useVirtualizedList";
import tickets from "./utils/fakerData";

type Ticket = (typeof tickets)[0];

const tableStyles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    margin: "20px 0",
    fontSize: "16px",
    backgroundColor: "#f9f9f9",
  },
  thead: {
    backgroundColor: "#007bff",
    color: "white",
    position: "sticky",
    top: 0,
  },
  th: {
    padding: "10px",
    fontWeight: "bold",
    height: "50px",
  },
  tbodyTr: {
    height: "30px",
    lineHeight: "30px",
  },
  tbodyTrEven: {
    backgroundColor: "#f2f2f2",
  },
  td: {
    padding: "8px",
    color: "black",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
};

function SpacerRow({ height }: { height: number }) {
  return height > 0 ? <tr style={{ height }} /> : null;
}

function App() {
  const rowHeight = 30;
  const containerHeight = 600;

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const {
    visibleItems,
    offsetTop,
    offsetBottom,
    filteredItems,
    handleScroll,
    updateSearchKey,
    updateSearchQuery,
  } = useVirtualizedList({
    items: tickets,
    itemHeight: rowHeight,
    containerHeight,
  });

  const onScroll = () => {
    if (tableContainerRef.current) {
      handleScroll(tableContainerRef.current.scrollTop);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => updateSearchQuery(e.target.value)}
        style={{ padding: "0.5rem", marginRight: "1rem" }}
      />
      <select onChange={(e) => updateSearchKey(e.target.value as keyof Ticket)}>
        <>
          <option value="">All Columns</option>
          {Object.keys(tickets[0]).map((key) => (
            <option key={key} value={key}>
              {" "}
              {key}
            </option>
          ))}
        </>
      </select>

      <div
        ref={tableContainerRef}
        onScroll={onScroll}
        style={{
          overflow: "auto",
          height: containerHeight,
          border: "1px solid #ccc",
        }}
      >
        <table style={tableStyles.table as React.CSSProperties}>
          <thead style={tableStyles.thead as React.CSSProperties}>
            <tr>
              {[
                "Subject",
                "Priority",
                "Status",
                "Description",
                "Assigned To",
                "Created At",
              ].map((header) => (
                <th key={header} style={tableStyles.th}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Spacer row to offset the top */}
            <SpacerRow height={offsetTop} />
            {visibleItems.map((ticket, index) => (
              <tr
                key={ticket.id}
                style={{
                  ...tableStyles.tbodyTr,
                  ...(index % 2 === 0 ? tableStyles.tbodyTrEven : {}),
                }}
              >
                {[
                  ticket.subject,
                  ticket.priority,
                  ticket.status,
                  ticket.description,
                  ticket.assignedTo,
                  ticket.createdAt,
                ].map((cell) => (
                  <td key={cell} style={tableStyles.td}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
            {/* Spacer row to offset the bottom */}
            <SpacerRow height={offsetBottom} />
          </tbody>
        </table>
      </div>
      <p>Total filtered items: {filteredItems.length}</p>
    </>
  );
}

export default App;
