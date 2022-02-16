import React, {ChangeEvent, useState} from 'react';
import {Box, Button, TextField} from '@mui/material';
import TableNamesComponent, {TableNamesData} from '../../components/table-names/table-names.component';

const SplitNamesApp = (): JSX.Element => {

    const [textAreaValue, setTextAreaValue] = useState('')
    const [table, setTable] = useState<TableNamesData[] | undefined[]>([])

    const handleTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const text: string = event.target.value;
        setTextAreaValue(text);
    }

    let invertedNames: TableNamesData[] = [];

    const splitNames = () => {
        setTable([]);
        const namesArray = textAreaValue.split('\n');

        invertedNames = namesArray.map((nameSurname: string, index: number) => {
            const nameSurnameArray = nameSurname.trim().split(',');
            return {name: nameSurnameArray[1], surname: nameSurnameArray[0], id: index.toString()}
        });

        setTable(invertedNames);
    }

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap'
        }}>
            <Box sx={{
                display: 'column',
                width: '100%'
            }}>
                <TextField
                    sx={{
                        width: '100%'
                    }}
                    name="textarea"
                    id="textarea"
                    onChange={handleTextArea}
                    multiline
                    rows={10}
                />
                <br/>
                <Button
                    sx={{
                        marginTop: '10px',
                        width: '50%'
                    }}
                    type="button"
                    variant="contained"
                    onClick={splitNames}
                >
                    Split
                </Button>
            </Box>

            <Box sx={{
                width: '100%',
                margin: '20px'
            }}>

                {table.length > 0 && <TableNamesComponent rows={table}/>}
            </Box>
        </Box>
    )
}

export default SplitNamesApp;
