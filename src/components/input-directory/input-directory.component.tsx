import React, {FunctionComponent, PropsWithChildren, useState} from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import {Button} from '@mui/material';
import electron from 'electron';

const remote = window.require('@electron/remote');
const dialog: electron.Dialog = remote.dialog;

interface InputDirectoryProps extends PropsWithChildren<any> {
    setPath: (path: string) => void;
}

const InputDirectoryComponent: FunctionComponent<InputDirectoryProps> = ({ setPath }): JSX.Element => {
    const [downloadPath, setDownloadPath] = useState('Click to select file');

    const openDialog = async () => {
        const {filePaths} = await dialog.showOpenDialog({properties: ['openDirectory']});
        const path = filePaths[0];
        if (path) {
            setPath(path);
            const shortPath = path.split('/').pop();
            setDownloadPath(shortPath);
        }
    }

    return (
        <Button
            onClick={openDialog}
            sx={{
                width: '100%'
            }}
            variant="outlined"
            startIcon={<DownloadIcon />}
        >
            {downloadPath}
        </Button>
    )
}

export default InputDirectoryComponent;
