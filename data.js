export const menu = [
     {
        id: 1,
        title: "Dashboard",
        url: "/",
        icon: "dashboard.png",
      },
      {
        id: 2,
        title: "Members",
        url: "app/members",
        icon: "user.png",
      },
      {
        id: 3,
        title: "Add Books",
        url: "/app/books",
        icon: "book.png",
      },
      {
        id: 4,
        title: "Check-out books",
        url: "/app/checkouts",
        icon: "checkout.png",
      },
      {
        id: 5,
        title: "Setting",
        url: "/app/setting",
        icon: "settings.png",
      },
      {
        id: 6,
        title: "Help",
        url: "/add/userhelp",
        icon: "help.png",
      },
]

export const checkoutsArray = [
    { field: "memberId", headerName: "Member ID", width: 100 },
    {
      field: "member",
      headerName: "Member",
      type: "text",
      width: 100,
      editable: false,
    },
    {
      field: "title",
      headerName: "Title",
      type: "text",
      width: 100,
      editable: false,
    },
    {
      field: "author",
      headerName: "Author",
      type: "text",
      width: 130,
      editable: false,
    },
    {
      field: "issueDate",
      headerName: "Borrowed Date",
      type: "text",
      width: 100,
      editable: false,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      type: "text",
      width: 100,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      type: "text",
      width: 100,
      editable: false,
    }
]
