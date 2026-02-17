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
        url: "/books/checkout",
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

export const members = [
  {
    id: "LIB-M-1001",
    name: "Faruque Ahmad",
    email: "faruque@gmail.com",
    phone: "9876543210",
    membershipType: "student",
    status: "active",
    booksIssued: 2,
    fine: 50,
    registeredAt: "2025-06-10"
  },
  {
    id: "LIB-M-1002",
    name: "Aman Kumar",
    email: "aman@gmail.com",
    phone: "9123456780",
    membershipType: "student",
    status: "active",
    booksIssued: 1,
    fine: 0,
    registeredAt: "2025-06-12"
  },
  {
    id: "LIB-M-1003",
    name: "Rohit Singh",
    email: "rohit@gmail.com",
    phone: "9001234567",
    membershipType: "public",
    status: "inactive",
    booksIssued: 0,
    fine: 0,
    registeredAt: "2025-05-20"
  },
  {
    id: "LIB-M-1004",
    name: "Neha Verma",
    email: "neha@gmail.com",
    phone: "9812345678",
    membershipType: "student",
    status: "active",
    booksIssued: 3,
    fine: 75,
    registeredAt: "2025-07-01"
  },
  {
    id: "LIB-M-1005",
    name: "Ankit Sharma",
    email: "ankit@gmail.com",
    phone: "9988776655",
    membershipType: "teacher",
    status: "active",
    booksIssued: 1,
    fine: 0,
    registeredAt: "2025-04-15"
  },
  {
    id: "LIB-M-1006",
    name: "Pooja Gupta",
    email: "pooja@gmail.com",
    phone: "9090909090",
    membershipType: "student",
    status: "blocked",
    booksIssued: 2,
    fine: 120,
    registeredAt: "2025-03-28"
  },
  {
    id: "LIB-M-1007",
    name: "Rahul Yadav",
    email: "rahul@gmail.com",
    phone: "9345678123",
    membershipType: "public",
    status: "active",
    booksIssued: 1,
    fine: 10,
    registeredAt: "2025-06-30"
  },
  {
    id: "LIB-M-1008",
    name: "Sneha Patel",
    email: "sneha@gmail.com",
    phone: "9765432109",
    membershipType: "student",
    status: "active",
    booksIssued: 0,
    fine: 0,
    registeredAt: "2025-07-10"
  },
  {
    id: "LIB-M-1009",
    name: "Vikas Mishra",
    email: "vikas@gmail.com",
    phone: "9456123789",
    membershipType: "teacher",
    status: "active",
    booksIssued: 2,
    fine: 0,
    registeredAt: "2025-02-18"
  },
  {
    id: "LIB-M-1010",
    name: "Kajal Singh",
    email: "kajal@gmail.com",
    phone: "9012345671",
    membershipType: "student",
    status: "inactive",
    booksIssued: 0,
    fine: 0,
    registeredAt: "2025-01-25"
  },
  {
    id: "LIB-M-1011",
    name: "Mohit Jain",
    email: "mohit@gmail.com",
    phone: "9823456712",
    membershipType: "public",
    status: "active",
    booksIssued: 1,
    fine: 25,
    registeredAt: "2025-05-05"
  },
  {
    id: "LIB-M-1012",
    name: "Riya Kapoor",
    email: "riya@gmail.com",
    phone: "9876501234",
    membershipType: "student",
    status: "active",
    booksIssued: 2,
    fine: 0,
    registeredAt: "2025-06-08"
  },
  {
    id: "LIB-M-1013",
    name: "Saurabh Rai",
    email: "saurabh@gmail.com",
    phone: "9301234567",
    membershipType: "public",
    status: "blocked",
    booksIssued: 3,
    fine: 200,
    registeredAt: "2025-03-10"
  },
  {
    id: "LIB-M-1014",
    name: "Nisha Kumari",
    email: "nisha@gmail.com",
    phone: "9191919191",
    membershipType: "student",
    status: "active",
    booksIssued: 1,
    fine: 0,
    registeredAt: "2025-07-15"
  },
  {
    id: "LIB-M-1015",
    name: "Aditya Pandey",
    email: "aditya@gmail.com",
    phone: "9887766554",
    membershipType: "teacher",
    status: "active",
    booksIssued: 0,
    fine: 0,
    registeredAt: "2025-06-01"
  }
];


export const books = [
  {
    id: "BOOK-001",
    title: "The Discovery of India",
    author: "Jawaharlal Nehru",
    isbn: "9780143031031",
    category: "History",
    totalCopies: 6,
    availableCopies: 6
  },
  {
    id: "BOOK-002",
    title: "Wings of Fire",
    author: "A. P. J. Abdul Kalam",
    isbn: "9788173711466",
    category: "Autobiography",
    totalCopies: 10,
    availableCopies: 7
  },
  {
    id: "BOOK-003",
    title: "Gitanjali",
    author: "Rabindranath Tagore",
    isbn: "9788171673094",
    category: "Poetry",
    totalCopies: 5,
    availableCopies: 4
  },
  {
    id: "BOOK-004",
    title: "God of Small Things",
    author: "Arundhati Roy",
    isbn: "9780679457312",
    category: "Fiction",
    totalCopies: 7,
    availableCopies: 5
  },
  {
    id: "BOOK-005",
    title: "Midnight’s Children",
    author: "Salman Rushdie",
    isbn: "9780099592413",
    category: "Fiction",
    totalCopies: 8,
    availableCopies: 6
  },
  {
    id: "BOOK-006",
    title: "Ignited Minds",
    author: "A. P. J. Abdul Kalam",
    isbn: "9780143424123",
    category: "Motivation",
    totalCopies: 9,
    availableCopies: 7
  },
  {
    id: "BOOK-007",
    title: "Train to Pakistan",
    author: "Khushwant Singh",
    isbn: "9780143065883",
    category: "Historical Fiction",
    totalCopies: 6,
    availableCopies: 4
  },
  {
    id: "BOOK-008",
    title: "The White Tiger",
    author: "Aravind Adiga",
    isbn: "9788172238475",
    category: "Fiction",
    totalCopies: 5,
    availableCopies: 3
  },
  {
    id: "BOOK-009",
    title: "Malgudi Days",
    author: "R. K. Narayan",
    isbn: "9788185986173",
    category: "Classic Fiction",
    totalCopies: 8,
    availableCopies: 6
  },
  {
    id: "BOOK-010",
    title: "India After Gandhi",
    author: "Ramachandra Guha",
    isbn: "9780330505549",
    category: "History",
    totalCopies: 6,
    availableCopies: 4
  },
  {
    id: "BOOK-011",
    title: "The Guide",
    author: "R. K. Narayan",
    isbn: "9780143039648",
    category: "Classic Fiction",
    totalCopies: 7,
    availableCopies: 5
  },
  {
    id: "BOOK-012",
    title: "An Era of Darkness",
    author: "Shashi Tharoor",
    isbn: "9789383064650",
    category: "History",
    totalCopies: 5,
    availableCopies: 3
  },
  {
    id: "BOOK-013",
    title: "The Palace of Illusions",
    author: "Chitra Banerjee Divakaruni",
    isbn: "9780333963810",
    category: "Mythological Fiction",
    totalCopies: 8,
    availableCopies: 6
  },
  {
    id: "BOOK-014",
    title: "Raavan: Enemy of Aryavarta",
    author: "Amish Tripathi",
    isbn: "9789352752818",
    category: "Mythology",
    totalCopies: 9,
    availableCopies: 7
  },
  {
    id: "BOOK-015",
    title: "Interpreter of Maladies",
    author: "Jhumpa Lahiri",
    isbn: "9780395927205",
    category: "Short Stories",
    totalCopies: 6,
    availableCopies: 4
  }
];

