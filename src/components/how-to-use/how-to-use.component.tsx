import React, {FunctionComponent, PropsWithChildren, useState} from 'react';
import {Container, Icon} from '@mui/material';
import Typography from '@mui/material/Typography';
import {jsx} from '@emotion/react';
import JSX = jsx.JSX;

interface HowToUseProps extends PropsWithChildren<any>{
    description: string;
}

const HowToUseComponent: FunctionComponent<HowToUseProps> = ({description}): JSX.Element => {
    const [showDescription, setShowDescription] = useState(false);

    const toggleShowDescription = () => {
        setShowDescription(!showDescription);
    }

    return (
        <Container sx={{
            margin: '0, 50px'
        }}>
            <Typography sx={{
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
                    <h2>¿Cómo se usa?</h2> {showDescription ? <Icon>keyboard_arrow_up</Icon> :
                    <Icon>keyboard_arrow_down</Icon>}
                </div>

                {showDescription && description}

            </Typography>
        </Container>
    )
}

export default HowToUseComponent;
