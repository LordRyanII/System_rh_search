/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from 'react';

type UserContextType = {
  loggedUserEmail: string;
  linkedinEmail: string;
  updateCredentials: (email: string, password: string) => void;
  updateLoggedUser: (email: string) => void;
};

export const UserContext = createContext<UserContextType>({
  loggedUserEmail: '',
  linkedinEmail: '',
  updateCredentials: () => {},
  updateLoggedUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [linkedinEmail, setLinkedinEmail] = useState(
    localStorage.getItem('linkedinEmail') || ''
  );
  const [loggedUserEmail, setLoggedUserEmail] = useState(
    localStorage.getItem('loggedUserEmail') || ''
  );

  const updateCredentials = (email: string, password: string) => {
    setLinkedinEmail(email);
    localStorage.setItem('linkedinEmail', email);

    fetch('http://localhost:4000/auth/linkedin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const updateLoggedUser = (email: string) => {
    setLoggedUserEmail(email);
    localStorage.setItem('loggedUserEmail', email);
  };
  return (
    <UserContext.Provider
      value={{
        updateCredentials,
        linkedinEmail,
        loggedUserEmail,
        updateLoggedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
