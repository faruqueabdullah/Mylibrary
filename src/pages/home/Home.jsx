import { Link } from "react-router-dom";
import RecentCheckouts from "../../components/RecentCheckouts";
import { UseFirebaseContext } from "../../Context/Firebaseprovider";
import Overdue from "../../components/Overdue";
import Charts from "../../components/Charts";
import BooksCard from "../../components/BooksCard";
import { UseThemeContext } from "../../Context/ThemeProvider";

export default function Home() {
  const { books, checkOuts } = UseFirebaseContext();
  const { theme } = UseThemeContext();

  const totalBooks = books.reduce((int, book) => {
    return int + Number(book.totalCopies);
  }, 0);

  const borrowedBooks = checkOuts?.filter((book) => book.status === "borrowed");

  const returnedBooks = checkOuts?.filter((book) => book.status === "returned");

  const overDueBooks = checkOuts?.filter(
    (book) =>
      book.status === "borrowed" && book.dueDate < new Date().toISOString(),
  );

  // getting most borrowed books
  const resultObj = {};
  borrowedBooks.forEach((book) => {
    if (resultObj[book.title]) {
      resultObj[book.title] += 1;
    } else {
      resultObj[book.title] = 1;
    }
  });

  return (
    <div
      className={`${theme ? "bg-dark text-softwhite" : "bg-softwhite text-dark"} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 auto-rows-[minmax(120px,auto)] p-1`}
    >
      <BooksCard title={"Total Books"} books={totalBooks} img={"./book1.png"} />
      <BooksCard
        title={"Borrowed Books"}
        books={borrowedBooks.length}
        img={"./book2.png"}
      />
      <BooksCard
        title={"Returned Books"}
        books={returnedBooks.length}
        img={"./book4.png"}
      />
      <BooksCard
        title={"Overdue Books"}
        books={overDueBooks.length}
        img={"./book3.png"}
      />

      <div className={`sm:col-span-2 sm:row-span-2 border rounded-sm text-sm flex flex-col justify-between`}>
        <Charts />
      </div>
      <div className={`${theme ? "bg-softdark" : "bg-softwhite"} sm:col-span-2 sm:row-span-2 border rounded-sm p-1.5 text-sm flex flex-col `}>
        <h3 className="font-semibold text-lg">Overdue's History</h3>
        <Overdue />
      </div>
      <div className={`${theme ? "bg-softdark" : "bg-softwhite"}  col-span-1 sm:col-span-2 md:col-span-3 sm:row-span-2 border rounded-sm p-1.5 text-sm flex flex-col justify-between`}>
        <div className="header flex items-center justify-between pb-3">
          <h3 className="font-semibold text-lg">Recent CheckOuts</h3>
          <Link to={"/checkouts"} className="text-green-500">
            View All
          </Link>
        </div>
        <RecentCheckouts />
      </div>
      <div className={`${theme ? "bg-softdark text-softwhite" : "bg-softwhite text-softdark"} overflow-hidden scroll-auto row-span-2 border rounded-sm p-1.5 text-sm flex flex-col space-y-4`}>
        <div className="px-2 py-1 text-softwhite text-[12px] border rounded-full bg-green-400 w-fit">
          Most Read
        </div>
        {Object.entries(resultObj)?.map(([key, value]) => {
          return (
            <div key={key} className="border-b border-b-gray-300 pb-2">
              <p className="text-sm font-semibold">{key}</p>
              <p className="text-[12px]">Borrowed : {value} times</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
