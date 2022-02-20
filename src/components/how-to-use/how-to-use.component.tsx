import React, {FunctionComponent, PropsWithChildren, useState} from 'react';
import {Container, Icon} from '@mui/material';
import Box from '@mui/material/Box/Box';

interface HowToUseProps extends PropsWithChildren<any>{
    headerTitle?: string;
}

const HowToUseComponent: FunctionComponent<HowToUseProps> = ({children, headerTitle}): JSX.Element => {
    const [showDescription, setShowDescription] = useState(false);

    const toggleShowDescription = () => {
        setShowDescription(!showDescription);
    }

    return (
        <Container sx={{
            margin: '0, 50px'
        }}>
            <Box sx={{
                textAlign: 'justify',
            }}>
                <div
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                    onClick={toggleShowDescription}
                >
                    <h2>{headerTitle}</h2> {showDescription ? <Icon>keyboard_arrow_up</Icon> :
                    <Icon>keyboard_arrow_down</Icon>}
                </div>

                {showDescription && children}

            </Box>
        </Container>
    )
}

export default HowToUseComponent;
