import { DataGrid } from "@mui/x-data-grid";
import { UseThemeContext } from "../Context/ThemeProvider";

export default function Table(props) {
  const { theme } = UseThemeContext();

  const isDark = theme; 
  const bgColor = isDark ? "#2d2d2d" : "#f5f5f5";
  const textColor = isDark ? "#ffffff" : "#000000";
  const hoverColor = isDark ? "#3d3d3d" : "#e0e0e0";
  const borderColor = isDark ? "#444444" : "#e0e0e0";

  return (
    <div>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        sx={{
          border: "none",
          backgroundColor: bgColor,
          color: textColor,

          // 1. Target Column Headers
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: isDark ? "#1a1a1a" : "#e9e9e9", // Optional: slightly different header bg
            color: textColor,
            borderBottom: `1px solid ${borderColor}`,
          },

          // 2. Target Column Header Titles and Icons
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
          
          "& .MuiDataGrid-sortIcon": {
            color:  "#1a1a1a",
          },

          // 3. Target Cells & Grid Lines
          "& .MuiDataGrid-cell": {
            color: textColor,
            borderBottom: `1px solid ${borderColor}`,
          },

          // 4. Row Hover States
          "& .MuiDataGrid-row:hover": {
            backgroundColor: hoverColor,
          },

          // 5. Footer Container
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: bgColor,
            color: textColor,
            borderTop: `1px solid ${borderColor}`,
          },

          // 6. Pagination text and dropdown icons
          "& .MuiTablePagination-root": {
            color: textColor,
          },
          "& .MuiTablePagination-selectIcon": {
            color: textColor,
          },
          "& .MuiButtonBase-root": {
            color: textColor, // Fixes pagination arrow colors
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </div>
  );
}
