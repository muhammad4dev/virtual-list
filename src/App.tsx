import "./App.css";
import tickets from "./utils/fakerData";

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
  },
  th: {
    padding: "10px",
    fontWeight: "bold",
    height: "50px",
  },
  tbodyTr: {
    height: "35px", // Fixed height
    borderBottom: "1px solid #ddd",
  },
  tbodyTrEven: {
    backgroundColor: "#f2f2f2",
  },
  tr: {
    lineHeight: "35px",
  },
  td: {
    padding: "8px",
    color: "black",
    height: "35px", // Fixed height
    overflow: "hidden", // Ensure content is clipped
    textOverflow: "ellipsis", // Show ellipsis for overflowing text
    whiteSpace: "nowrap", // Prevent wrapping
    position: "relative", // For absolute positioning of tooltip
  },
  tooltipContainer: {
    position: "relative",
  },
  tooltip: {
    visibility: "hidden",
    position: "absolute",
    zIndex: "1",
    top: "100%",
    left: "0",
    backgroundColor: "white",
    border: "1px solid #ddd",
    padding: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    whiteSpace: "normal",
    wordWrap: "break-word",
    maxWidth: "300px",
  },
  tdHover: {
    overflow: "visible",
  },
};

function TicketTable() {
  return (
    <table style={tableStyles.table}>
      <thead style={tableStyles.thead}>
        <tr>
          <th style={tableStyles.th}>Id</th>
          <th style={tableStyles.th}>Subject</th>
          <th style={tableStyles.th}>Priority</th>
          <th style={tableStyles.th}>Status</th>
          <th style={tableStyles.th}>Description</th>
          <th style={tableStyles.th}>Assigned To</th>
          <th style={tableStyles.th}>Created At</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket, index) => (
          <tr
            key={ticket.id}
            style={
              index % 2 === 0 ? tableStyles.tbodyTrEven : tableStyles.tbodyTr
            }
          >
            <td style={tableStyles.td}>{ticket.id}</td>
            <td style={tableStyles.td}>{ticket.subject}</td>
            <td style={tableStyles.td}>{ticket.priority}</td>
            <td style={tableStyles.td}>{ticket.status}</td>
            <td style={tableStyles.td}>{ticket.description}</td>
            <td style={tableStyles.td}>{ticket.assignedTo}</td>
            <td style={tableStyles.td}>{ticket.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TicketTable;
