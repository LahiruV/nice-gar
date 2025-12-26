

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

interface AlertDialogSlideProps {
    open: boolean;
    handleClose: () => void;
    handleAgree: () => void;
    handleDisagree: () => void;
    onClose: () => void;
    title: string;
    description: string;
    agreeButtonText: string;
    disagreeButtonText: string;
    aVariant?: any;
    aColor?: any;
    aSize?: 'small' | 'medium' | 'large';
    aDisabled?: boolean;
    dVariant?: any;
    dColor?: any;
    dSize?: 'small' | 'medium' | 'large';
    dDisabled?: boolean;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const AlertDialogSlide = ({ open, handleAgree, handleDisagree, onClose, title, description, agreeButtonText, disagreeButtonText, aVariant = 'contained', aColor = 'primary', aSize = 'medium', aDisabled = false, dVariant = 'outlined', dColor = 'secondary', dSize = 'medium', dDisabled = false }: AlertDialogSlideProps) => {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{ color: '#0096C7', fontWeight: 'bold' }}>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" style={{ color: '#333' }}>
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{
                    padding: '12px 12px',
                }}>
                    <Button onClick={handleDisagree} variant={dVariant} color={dColor} size={dSize} disabled={dDisabled}>{disagreeButtonText}</Button>
                    <Button onClick={handleAgree} variant={aVariant} color={aColor} size={aSize} disabled={aDisabled}>{agreeButtonText}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}