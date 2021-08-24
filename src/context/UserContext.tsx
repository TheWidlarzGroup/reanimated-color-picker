import React, {ReactNode, useContext, useState} from 'react';

type ContextValue = {
  userColor: string;
  setUserColor: React.Dispatch<React.SetStateAction<string>>;
};
type ContextProviderProps = {
  children: ReactNode;
};

const initialValues = {
  setUserColor: () => {},
  userColor: '',
};

export const UserContext = React.createContext<ContextValue>(initialValues);
export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({children}: ContextProviderProps) => {
  const [userColor, setUserColor] = useState('orange');
  return (
    <UserContext.Provider value={{userColor, setUserColor}}>
      {children}
    </UserContext.Provider>
  );
};
