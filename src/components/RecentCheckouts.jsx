import { checkoutsArray } from "../../data"
import { UseFirebaseContext } from "../Context/Firebaseprovider"
import Table from "./Table"

export default function RecentCheckouts() {
    const columns = [...checkoutsArray]
    const {checkOuts} = UseFirebaseContext()
  return (
    <div>
     <Table columns={columns} rows={checkOuts} />
    </div>
  )
}
