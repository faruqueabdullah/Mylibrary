import React, { createContext, useContext, useState } from 'react'

const ThemeContext = createContext(null)

export const UseThemeContext = () => useContext(ThemeContext);

export default function ThemeProvider({children}) {
  const[theme, setTheme] = useState(JSON.parse(localStorage.getItem('isDark')) || false)

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}
