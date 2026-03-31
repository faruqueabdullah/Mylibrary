import { UseFirebaseContext } from "../Context/Firebaseprovider";
import Table from "./Table";

export default function Overdue() {
  const columnHeading = [
    { field: "memberId", headerName: "Member ID", width: 100 },
    {
      field: "title",
      headerName: "Title",
      type: "text",
      width: 100,
      editable: false,
    },
    {
      field: "isbn",
      headerName: "ISBN",
      type: "text",
      width: 80,
      editable: false,
    },
    {
      field: "duesDate",
      headerName: "Due Date",
      type: "text",
      width: 80,
      editable: false,
    },
    {
      field: "fine",
      headerName: "Fine",
      type: "text",
      width: 80,
      editable: false,
    },
  ];

  const { checkOuts } = UseFirebaseContext();

  const overDueBooks = checkOuts
    ?.filter((book) => book.status === "borrowed" && new Date() > new Date(book.dueDate))
    .map((book) => {
      const today = new Date();
      const dueDate = new Date(book.dueDate);
      const NumberOfDays = Math.floor(
        (today - dueDate) / (1000 * 60 * 60 * 24),
      );

      const { memberId, title, isbn } = book;
      return {
        id:title,
        memberId,
        title,
        isbn,
        duesDate: NumberOfDays,
        fine: NumberOfDays * 5,
      };
    });

  console.log(overDueBooks);
  return (
    <div>
      <Table columns={columnHeading} rows={overDueBooks}/>
    </div>
  );
}
