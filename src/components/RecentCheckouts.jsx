import { checkoutsArray } from "../../data";
import { UseFirebaseContext } from "../Context/Firebaseprovider";
import Table from "./Table";

export default function RecentCheckouts() {
  const columns = [
    ...checkoutsArray,
    {
      field: "status",
      headerName: "Status",
      type: "text",
      flex:1,
      minWidth: 100,
      editable: false,
    },
  ];
  const { checkOuts } = UseFirebaseContext();
  return (
    <div>
      <Table columns={columns} rows={checkOuts} />
    </div>
  );
}
