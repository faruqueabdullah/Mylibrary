
import { UseThemeContext } from "../../Context/ThemeProvider";
import { UseFirebaseContext } from "../../Context/Firebaseprovider";
import { useState } from "react";

export default function Settings() {
  const { theme, setTheme } = UseThemeContext();
  const { logout } = UseFirebaseContext();

  const [settingsSections, SetsettingsSections] = useState([
    {
      title: "Appearance",
      items: [
        {
          id: "label5",
          label: "Dark Mode",
          description: "Enable dark theme for the dashboard",
          type: "toggle",
        },
        {
          id: "label6",
          label: "Compact Layout",
          description: "Reduce spacing in tables and cards",
          type: "toggle",
          enabled: false,
        },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          id: "label1",
          label: "Email Notifications",
          description: "Receive updates about issued books",
          type: "toggle",
          enabled: true,
        },
        {
          id: "label2",
          label: "Due Date Reminders",
          description: "Send reminders before return date",
          type: "toggle",
          enabled: true,
        },
      ],
    },
    {
      title: "Library Preferences",
      items: [
        {
          id: "label3",
          label: "Borrow Limit",
          description: "Maximum books per member",
          type: "input",
          value: "3 Books",
        },
        {
          id: "label4",
          label: "Late Fine",
          description: "Charge per delayed return",
          type: "input",
          value: "₹5 / Day",
        },
      ],
    },
  ]);


  function handleClick(clickedItem) {
    // console.log(clickedItem)
    if (clickedItem.label === "Dark Mode") {
      setTheme((prev) => !prev);
      return;
    }

    SetsettingsSections((prev) =>
      prev.map((section) => ({
        ...section,
        items: section.items.map((item) => {
          return clickedItem.id === item.id
            ? {
                ...item,
                enabled: !item.enabled,
              }
            : item;
        }),
      })),
    );
  }

  //   console.log('rendering')

  return (
    <div
      className={`${
        theme ? "bg-dark text-softwhite" : "bg-[#f9fafb] text-dark"
      } min-h-screen w-full p-4 sm:p-6 lg:p-8 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Settings</h1>
          <p
            className={`${
              theme ? "text-gray-400" : "text-gray-600"
            } text-sm sm:text-base`}
          >
            Manage your library dashboard preferences and configurations.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div
            className={`${
              theme
                ? "bg-softdark border border-gray-700"
                : "bg-softwhite border border-gray-200"
            } rounded-2xl p-4 h-fit`}
          >
            <div className="flex flex-col gap-2">
              {[
                "General",
                "Appearance",
                "Notifications",
                "Security",
                "Library",
              ].map((item, index) => (
                <button
                  key={index}
                  className={`${
                    index === 0
                      ? "bg-main text-white"
                      : theme
                        ? "hover:bg-[#374151]"
                        : "hover:bg-gray-100"
                  } px-4 py-3 rounded-xl text-left transition-all duration-200 text-sm sm:text-base`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Main Settings Content */}
          <div className="xl:col-span-3 flex flex-col gap-6">
            {/* Profile Card */}
            <div
              className={`${
                theme
                  ? "bg-softdark border border-gray-700"
                  : "bg-softwhite border border-gray-200"
              } rounded-2xl p-5 sm:p-6`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src="https://i.pravatar.cc/100"
                    alt="profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />

                  <div>
                    <h2 className="text-xl font-semibold">Faruque</h2>
                    <p
                      className={`${
                        theme ? "text-gray-400" : "text-gray-500"
                      } text-sm`}
                    >
                      Admin • Library Manager
                    </p>
                  </div>
                </div>

                <button className="bg-main hover:bg-blue-700 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Dynamic Sections */}
            {settingsSections.map((section, index) => (
              <div
                key={index}
                className={`${
                  theme
                    ? "bg-softdark border-gray-700"
                    : "bg-softwhite border border-gray-200"
                } rounded-2xl p-5 sm:p-6`}
              >
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-1">
                    {section.title}
                  </h2>
                  <p
                    className={`${
                      theme ? "text-gray-400" : "text-gray-500"
                    } text-sm`}
                  >
                    Customize your {section.title.toLowerCase()} settings.
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  {section.items.map((item, itemIndex) => {
                    const isEnabled =
                      item.label === "Dark Mode" ? theme : item.enabled;
                    return (
                      <div
                        key={itemIndex}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b ${
                          theme ? "border-gray-700" : "border-gray-200"
                        } last:border-none last:pb-0`}
                      >
                        <div>
                          <h3 className="font-medium text-base sm:text-lg">
                            {item.label}
                          </h3>
                          <p
                            className={`${
                              theme ? "text-gray-400" : "text-gray-500"
                            } text-sm mt-1`}
                          >
                            {item.description}
                          </p>
                        </div>

                        {item.type === "toggle" ? (
                          <div
                            id={item.id}
                            onClick={() => handleClick(item)}
                            className={`${
                              isEnabled ? "bg-main" : "bg-gray-400"
                            } w-14 h-7 rounded-full p-1 flex items-center transition-all duration-300 cursor-pointer`}
                          >
                            <div
                              className={`${
                                isEnabled ? "translate-x-7" : "translate-x-0"
                              } w-5 h-5 bg-softwhite rounded-full transition-all duration-300`}
                            ></div>
                          </div>
                        ) : (
                          <input
                            type="text"
                            value={item.value}
                            readOnly
                            className={`${
                              theme
                                ? "bg-softdark border-gray-700 text-white"
                                : "bg-softwhite border-gray-300 text-black"
                            } border px-4 py-2.5 rounded-xl outline-none w-full sm:w-[220px] text-sm`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Security Card */}
            <div
              className={`${
                theme
                  ? "bg-softdark border border-gray-700"
                  : "bg-softwhite border border-gray-200"
              } rounded-2xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5`}
            >
              <div>
                <h2 className="text-xl font-semibold mb-1">Security</h2>
                <p
                  className={`${
                    theme ? "text-gray-400" : "text-gray-500"
                  } text-sm`}
                >
                  Update your password and secure your account.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  className={`${
                    theme
                      ? "bg-softdark hover:bg-[#161e29] border border-gray-700"
                      : "bg-softwhite hover:bg-gray-200 border border-gray-300"
                  } px-5 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium`}
                >
                  Change Password
                </button>

                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 px-5 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
