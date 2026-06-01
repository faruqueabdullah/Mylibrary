export const menu = [
     {
        id: 1,
        title: "Dashboard",
        url: "/",
        icon: "dashboard.svg",
      },
      {
        id: 2,
        title: "Members",
        url: "/members",
        icon: "member.svg",
      },
      {
        id: 3,
        title: "Books",
        url: "/books",
        icon: "book.png",
      },
      {
        id: 4,
        title: "Check-out books",
        url: "/checkouts",
        icon: "checkout.svg",
      },
      {
        id: 5,
        title: "Setting",
        url: "/setting",
        icon: "setting.svg",
      },
      {
        id: 6,
        title: "Help",
        url: "/userhelp",
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

]
