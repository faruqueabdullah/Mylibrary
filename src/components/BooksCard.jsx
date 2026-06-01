import { UseThemeContext } from "../Context/ThemeProvider"

export default function BooksCard({title, books, img}) {

  const{theme} = UseThemeContext()
  return (
    <div className={`${theme ? "bg-softdark text-softwhite" : "bg-softwhite text-dark"} border rounded-sm p-5 text-sm flex flex-col justify-between`}>
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
