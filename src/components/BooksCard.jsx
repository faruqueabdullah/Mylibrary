
export default function BooksCard({title, books, img}) {
  return (
    <div className="box1 border rounded-sm p-5 text-sm flex flex-col justify-between bg-main-color">
        <div className="flex gap-2 items-center">
          <img src={img} alt="book" className="w-6 h-6 bg-cover" />
          <h2>{title}</h2>
        </div>
        <span className="text-2xl">
          {books > 9 ? books : `0${books}`}
        </span>
      </div>
  )
}
