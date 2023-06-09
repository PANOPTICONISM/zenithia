import { useMediaQuery } from '@mui/material';
import React from 'react';

type SidebarContextValues = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
  
const SidebarContext = React.createContext<SidebarContextValues | null>(null);
  
export const SidebarProvider = (({ children }: { children: React.ReactNode; }) => {
  const tabletBreakpoint = useMediaQuery('(max-width:900px)');
  const [isOpen, setIsOpen] = React.useState<boolean>(tabletBreakpoint ? false : true);
  
  const value = React.useMemo(() => (
    {
      isOpen,
      setIsOpen,
    }
  ), [isOpen]);
  
  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
});

const useNullableSidebar = () => {
  const context = React.useContext(SidebarContext);

  if (context === null) {
    throw new Error('SidebarContext is missing');
  }
  return context;
};
  
export const useIsSidebarOpen = () => {
  const { isOpen, setIsOpen } = useNullableSidebar();
  return React.useMemo(() => [isOpen, setIsOpen] as const, [isOpen, setIsOpen]);
};