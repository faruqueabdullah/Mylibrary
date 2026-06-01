import { UseThemeContext } from "../../Context/ThemeProvider";

export default function UserHelp() {

    const{theme} = UseThemeContext();

  const faqs = [
    {
      question: "How do I borrow a book?",
      answer:
        "Go to the Books section, search for a book, and click the issue button if it is available.",
    },
    {
      question: "How can I return a book?",
      answer:
        "Visit the My Books section and select the book you want to return.",
    },
    {
      question: "How do I update my profile?",
      answer:
        "Open Settings and edit your profile information.",
    },
    {
      question: "What happens if I miss a return date?",
      answer:
        "You may receive reminders or penalties depending on the library rules.",
    },
  ];

  return (
    <div className={`${theme?'bg-dark text-softwhite':'bg-softwhite text-dark'} w-full min-h-screen p-4 md:p-6`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">
          Help Center
        </h1>
        <p className="text-gray-500 mt-2">
          Find answers to common questions and learn how to use the system.
        </p>
      </div>

      {/* Quick Guide */}
      <div className={`${theme?'bg-softdark':'bg-softwhite'} rounded-xl shadow p-5 mb-6`}>
        <h2 className="text-lg font-semibold mb-4">
          Quick Start Guide
        </h2>

        <div className="space-y-3">
          <div>
            <span className="font-medium">
              1. Browse Books
            </span>
            <p className="text-sm text-gray-500">
              Search and explore available books.
            </p>
          </div>

          <div>
            <span className="font-medium">
              2. Issue Books
            </span>
            <p className="text-sm text-gray-500">
              Request or issue books from the library.
            </p>
          </div>

          <div>
            <span className="font-medium">
              3. Manage Account
            </span>
            <p className="text-sm text-gray-500">
              Update profile and view borrowing history.
            </p>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className={`${theme?'bg-softdark':'bg-softwhite'} rounded-xl shadow p-5 mb-6`}>
        <h2 className="text-lg font-semibold mb-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b pb-3 last:border-none"
            >
              <h3 className="font-medium">
                {faq.question}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className={`${theme?'bg-softdark':'bg-softwhite'} rounded-xl shadow p-5 mb-6`}>
        <h2 className="text-lg font-semibold mb-3">
          Need More Help?
        </h2>

        <p className="text-gray-500 mb-4">
          If you cannot find the answer you're looking for,
          contact the library administrator.
        </p>

        <div className="space-y-2">
          <p>
            <span className="font-medium">Email:</span>{" "}
            support@library.com
          </p>

          <p>
            <span className="font-medium">Phone:</span>{" "}
            +91 98765 43210
          </p>
        </div>
      </div>
    </div>
  );
}