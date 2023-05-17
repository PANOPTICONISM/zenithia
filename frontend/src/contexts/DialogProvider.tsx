import { Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, IconButton } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

type DialogContentProps = React.PropsWithChildren<{
    title: React.ReactNode,
    actions?: React.ReactNode,
    close?: () => void,
    overwriteContentAndActions?: React.ReactNode,
} & Pick<DialogProps, 'open'>>;

const CustomDialog = React.forwardRef<HTMLDivElement, React.PropsWithChildren<DialogContentProps>>(({
  children,
  open,
  title,
  actions,
  close,
  overwriteContentAndActions
}, ref) => {

  return (
    <Dialog
      open={open}
      sx={{
        fontSize: '14px',
        lineHeight: '20px',
        fontWeight: 400,
      }}
      onClose={close}
      ref={ref}
    >
      <DialogTitle
        sx={{
          fontSize: '20px',
          lineHeight: '30px',
          fontWeight: 500,
          padding: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 0,
        }}
        noWrap
      >
        {title}
        {close ? (
          <IconButton
            aria-label="close"
            onClick={close}
            sx={{
              color: '#667084',
              marginLeft: '20px',
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      {overwriteContentAndActions !== undefined ? overwriteContentAndActions : (
        <DialogContent sx={{ padding: '24px', maxWidth: '500px', width: '100%', paddingTop: '24px!important' }}>
          {children}
        </DialogContent>
      )}
      {overwriteContentAndActions === undefined && actions !== null && <DialogActions sx={{ padding: '0 24px 24px 24px' }}>{actions}</DialogActions>}
    </Dialog>
  );
});

CustomDialog.displayName = 'Dialog';

type DialogQueueEntry = {
    onOpen?: () => void,
    onClose?: () => void,
    data: (close: () => void) => Omit<DialogContentProps, 'open'>,
};

type DialogContextType = {
    queue: DialogQueueEntry[],
    enqueue: (entry: DialogQueueEntry) => void,
    dialogOpen: boolean,
};
  
export const DialogContext = React.createContext<DialogContextType | null>(null);

export const GLOBAL_DIALOG_CONTEXT = { current: null as DialogContextType | null };
  
export const DialogProvider = (({ children }: { children: React.ReactNode; }) => {
  const [currentDialog, setCurrentDialog] = React.useState(null as null | DialogQueueEntry);
  const [queue, setQueue] = React.useState<DialogQueueEntry[]>([]);

  const enqueue: DialogContextType['enqueue'] = React.useCallback((entry) => {
    setQueue((currentQueue) => [...currentQueue, entry]);
  }, []);

  React.useEffect(() => {
    const firstInQueue = queue[0] || null;
    if (currentDialog === null && firstInQueue !== null) {
      setCurrentDialog(firstInQueue);
      firstInQueue.onOpen?.();
      setQueue((currentQueue) => currentQueue.slice(1));
    }
  }, [currentDialog, queue]);

  const [currentDialogData, setCurrentDialogData] = React.useState(null as null | ReturnType<DialogQueueEntry['data']>);
  const [open, setOpen] = React.useState(false);

  const value = React.useMemo(() => ({ queue, enqueue, dialogOpen: open }), [queue, enqueue, open]);

  React.useEffect(() => {
    if (currentDialog !== null) {
      setCurrentDialogData(currentDialog.data(() => {
        setOpen(false); 
        currentDialog.onClose?.(); 
        setCurrentDialog(null); 
      }));
    }
  }, [currentDialog]);

  React.useEffect(() => {
    if (currentDialogData !== null) {
      setOpen(true);
    }
  }, [currentDialogData]);

  const parentDialogProvider = React.useContext(DialogContext);

  React.useEffect(() => {
    if (parentDialogProvider === null) {
      GLOBAL_DIALOG_CONTEXT.current = value;
    }
  }, [parentDialogProvider, value]);
  
  
  return (
    <DialogContext.Provider value={value}>
      {currentDialogData && (
        <CustomDialog
          key="dialog"
          open={open}
          close={() => {
            setOpen(false); 
            setCurrentDialog(null); 
          }}
          {...currentDialogData}
        />
      )}
      {children}
    </DialogContext.Provider>
  );
});

export const useDialogEnqueue = () => {
  const context = React.useContext(DialogContext);
  if (context === null) {
    throw new Error('useDialogQueue must be used within a DialogProvider');
  }
  return context.enqueue;
};

export const useDialogOpen = () => React.useContext(DialogContext)?.dialogOpen || false;