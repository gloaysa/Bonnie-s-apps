import React, {ChangeEvent, useState} from 'react';
import {Box, Button, TextField} from '@mui/material';
import TableNamesComponent, {TableNamesData} from '../../components/table-names/table-names.component';
import HowToUseComponent from '../../components/how-to-use/how-to-use.component';

const {clipboard} = window.require('electron');

const SplitNamesApp = (): JSX.Element => {

    const [textAreaValue, setTextAreaValue] = useState('');
    const [names, setNames] = useState<string[]>([]);
    const [surnames, setSurnames] = useState<string[]>([]);
    const [table, setTable] = useState<TableNamesData[] | undefined[]>([]);

    const howToUseDescription = () => {
        return (
            <p>
                La función de esta aplicación es convertir una lista de apellidos y nombres separados por comas
                en dos listas. La primera con los nombres y la segunda con los apellidos.
                <br/>
                Para que funcione bien, recuerda que la lista que pegues en el campo de abajo tiene que tener
                cada <code>apellido, nombre</code> separados por una nueva línea.
                <br/>
                <br/>

                <strong>Ejemplo</strong>
                <code>
                    <br/>
                    Gómez, Maria
                    <br/>
                    Palomo, Juan
                </code>
            </p>
        )
    }

    const handleCopyToClipboard = (list: string[]) => {
      clipboard.writeText(list?.toString());
    }

    const handleTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const text: string = event.target.value;
        setTextAreaValue(text);
    }

    let invertedNames: TableNamesData[] = [];

    const splitNames = () => {
        setTable([]);
        const namesArray = textAreaValue.split('\n');
        let namesTemp: string[] = [];
        let surnamesTemp: string[] = [];

        invertedNames = namesArray.map((nameSurname: string, index: number) => {
            const nameSurnameArray = nameSurname.trim().split(',');
            namesTemp = [...namesTemp, nameSurnameArray[1]];
            surnamesTemp = [...surnamesTemp, nameSurnameArray[0]];
            return {name: nameSurnameArray[1], surname: nameSurnameArray[0], id: index.toString()}
        });

        setNames(namesTemp);
        setSurnames(surnamesTemp);
        setTable(invertedNames);
    }

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap'
        }}>
            <HowToUseComponent headerTitle='¿Cómo se usa?'>{howToUseDescription()} </HowToUseComponent>
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
                    label="Apellido, Nombre"
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
                    Convertir!
                </Button>
            </Box>

            <Box sx={{
                margin: '20px 0',
            }}>

                {table.length > 0 && (
                    <>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            marginBottom: '20px',
                        }}>
                            <Button onClick={() => handleCopyToClipboard(names)}>Copiar nombres</Button>
                            <Button onClick={() => handleCopyToClipboard(surnames)}>Copiar apellidos</Button>
                        </div>
                        <TableNamesComponent rows={table}/>
                    </>
                )}
            </Box>
        </Box>
    )
}

export default SplitNamesApp;
