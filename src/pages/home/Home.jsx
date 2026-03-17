import { UseFirebaseContext } from "../../Context/Firebaseprovider";

export default function Home() {
  const { books, checkOuts } = UseFirebaseContext();

  const availabelBooks = books.reduce((int, book) => {
    return int + Number(book.totalCopies);
  }, 0);

  const borrowedBooks = checkOuts?.filter(
    (book) => book.status === "borrowed",
  ).length;
  return (
    <div className="grid grid-cols-4 gap-5 auto-rows-[minmax(120px,auto)]">
      <div className="box1 border rounded-sm p-5 text-sm flex flex-col justify-between bg-main-color">
        <div className="flex gap-2 items-center">
          <img src="./book1.png" alt="book" className="w-6 h-6 bg-cover" />
          <h2>Total Books</h2>
        </div>
        <span className="text-2xl">
          {availabelBooks > 9 ? availabelBooks : `0${availabelBooks}`}
        </span>
      </div>
      <div className="box2 border rounded-sm p-5 text-sm flex flex-col justify-between bg-main-color">
        <div className="flex gap-2 items-center">
          <img src="./book2.png" alt="book" className="w-6 h-6 bg-cover" />
          <h2>Borrowed Books</h2>
        </div>
        <span className="text-2xl">
          {borrowedBooks > 9 ? borrowedBooks : `0${borrowedBooks}`}
        </span>
      </div>
      <div className="box3 border rounded-sm p-5 text-sm flex flex-col justify-between bg-main-color">
        <div className="flex gap-2 items-center">
          <img src="./book3.png" alt="book" className="w-6 h-6 bg-cover" />
          <h2>Overdue Books</h2>
        </div>
        <span className="text-2xl">2435</span>
      </div>
      <div className="box4 border rounded-sm p-5 text-sm flex flex-col justify-between bg-main-color">
        <div className="flex gap-2 items-center">
          <img src="./book4.png" alt="book" className="w-6 h-6 bg-cover" />
          <h2>Returned Books</h2>
        </div>
        <span className="text-2xl">2435</span>
      </div>
      <div className="box5 col-span-2 row-span-2 border rounded-sm p-5 text-sm flex flex-col justify-between bg-main-color">
        box5
      </div>
      <div className="box6 col-span-2 row-span-2 border rounded-sm p-5 text-sm flex flex-col justify-between bg-main-color">
        box6
      </div>
      <div className="box7 col-span-3 row-span-2 border rounded-sm p-5 text-sm flex flex-col justify-between bg-main-color">
        box7
      </div>
      <div className="box8 row-span-2 border rounded-sm p-5 text-sm flex flex-col justify-between bg-main-color">
        box8
      </div>
    </div>
  );
}
