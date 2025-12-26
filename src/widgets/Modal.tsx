import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal = ({ open, onClose, title, children }: ModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <div className="relative p-6 flex flex-col">
        <div className="flex justify-end">
          <IconButton
            onClick={onClose}
            size="small"
            className="hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-primary hover:text-primary/80 transition-colors" />
          </IconButton>
        </div>

        {title && (
          <DialogTitle className="p-0 text-2xl font-bold text-gray-900 mb-4" style={{
            fontWeight: 'bold',
            marginTop: '-49px',
          }}>
            {title}
          </DialogTitle>
        )}

        <DialogContent className="p-0">
          {children}
        </DialogContent>
      </div>
    </Dialog>
  );
};