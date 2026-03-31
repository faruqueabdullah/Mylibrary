import { Link } from "react-router-dom";
import RecentCheckouts from "../../components/RecentCheckouts";
import { UseFirebaseContext } from "../../Context/Firebaseprovider";
import Overdue from "../../components/Overdue";
import Charts from "../../components/Charts";
import BooksCard from "../../components/BooksCard";

export default function Home() {
  const { books, checkOuts } = UseFirebaseContext();

  const totalBooks = books.reduce((int, book) => {
    return int + Number(book.totalCopies);
  }, 0);

  const borrowedBooks = checkOuts?.filter((book) => book.status === "borrowed");

  const returnedBooks = checkOuts?.filter((book) => book.status === "returned");

  const overDueBooks = checkOuts?.filter(
    (book) =>book.status === "borrowed" && book.dueDate < new Date().toISOString(),
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 auto-rows-[minmax(120px,auto)]">
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

      <div className="box5 sm:col-span-2 sm:row-span-2 border rounded-sm p-5 text-sm flex flex-col justify-between bg-main-color">
        <Charts />
      </div>
      <div className="box6 sm:col-span-2 sm:row-span-2 border rounded-sm p-5 text-sm flex flex-col bg-main-color">
        <h3 className="font-semibold text-lg">Overdue's History</h3>
        <Overdue />
      </div>
      <div className="box7 col-span-1 sm:col-span-2 md:col-span-3 sm:row-span-2 border rounded-sm p-5 text-sm flex flex-col justify-between bg-main-color">
        <div className="header flex items-center justify-between pb-3">
          <h3 className="font-semibold text-lg">Recent CheckOuts</h3>
          <Link to={"app/checkouts"} className="text-green-500">
            View All
          </Link>
        </div>
        <RecentCheckouts />
      </div>
      <div className="box8 overflow-hidden scroll-auto row-span-2 border rounded-sm p-5 text-sm flex flex-col bg-main-color space-y-4">
        <div className="px-2 py-1 text-white text-[12px] border rounded-full bg-green-400 w-fit">
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
