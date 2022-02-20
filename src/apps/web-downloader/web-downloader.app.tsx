import React, {ChangeEvent, useState} from 'react';
import {Box, Button, TextField} from '@mui/material';
import HowToUseComponent from '../../components/how-to-use/how-to-use.component';
import InputDirectoryComponent from '../../components/input-directory/input-directory.component';

const WebDownloaderApp = (): JSX.Element => {
    const [urlToDownload, setUrlToDownload] = useState('');
    const [domain, setDomain] = useState('');
    const [downloadPath, setDownloadPath] = useState('Click to select file');

    const handleInputDirectory = (path: string) => {
        setDownloadPath(path);
    }

    const getDomainFromUrl = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        const regValidUrl = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
        const validUrl = value.match(regValidUrl);
        if (validUrl) {
            const regMatch = /^(?:http:\/\/|www\.|https:\/\/)([^\/]+)/;
            const matchUrl = value.match(regMatch);
            if (matchUrl) {
                setDomain(matchUrl[1])
                setUrlToDownload(value);
            }
        }
    }

    const inputDisabled = (): boolean => {
        return !!downloadPath && !!urlToDownload && !!domain;
    }


    const howToUseDescription = () => {
        return (
            <p>
                Con esta aplicación podrás descargar la web otorgando una url.
            </p>)
    }

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap'
        }}>
            <HowToUseComponent headerTitle='¿Cómo se usa?'>{howToUseDescription()}</HowToUseComponent>
            <Box sx={{
                display: 'column',
                width: '100%',
                padding: '10px',
                '& > *': {margin: '5px, 0'}
            }}
                 component="form"
            >
                <TextField
                    label='Website a descargar'
                    sx={{
                        width: '100%'
                    }}
                    focused
                    autoFocus
                    size='small'
                    placeholder='https://example.com'
                    onChange={(event) => getDomainFromUrl(event)}
                />

                <InputDirectoryComponent setPath={handleInputDirectory}/>

                <br/>
                <Button
                    sx={{
                        marginTop: '10px',
                        width: '50%'
                    }}
                    type="button"
                    variant="contained"
                    disabled={!inputDisabled()}
                >
                    Descargar!
                </Button>
            </Box>
            {urlToDownload &&
                <HowToUseComponent headerTitle='Vista previa'>
                    <iframe
                        style={{
                            width: '100%',
                            height: '500px'
                        }}
                        src={urlToDownload}
                    />
                </HowToUseComponent>
            }
        </Box>
    )
}

export default WebDownloaderApp;
