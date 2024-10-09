import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, CardContent, CssBaseline, FormControl, FormLabel, Stack, styled, TextField, Typography } from '@mui/material';
import MuiCard from '@mui/material/Card';
import Header from '../../Components/Header';
import {getPontos} from '../../Services/backend';
import { TuristPoint } from '../../Services/types';
import SummarizedPoint from '../../Components/SummarizedPoint';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '80%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
      boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
  }));

export default function ListPoints() {

    const navigate = useNavigate();
    const [points, setPoints] = React.useState<TuristPoint[] | undefined>();

    React.useEffect(()=>{
        (async () => {
            try{
                const response = await getPontos();
                setPoints(response)
            } catch(e) {
                console.log(e);
            }
        })();
    });

    function createPoint() {
        navigate('/point', { state: { actionType: 'create', pointId: 0 } });

    }

    return <>
        <CssBaseline enableColorScheme />
        <Box display={'flex'} flexDirection='column' justifyContent={'flex-start'} alignItems={'center'} height={'100vh'}>
            <Header/>
            <Box display={'flex'} width={'100vw'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}  flex={'100'}>
                <Card variant="outlined">
                    <CardContent>
                        {
                            points === undefined ? 
                            <p>Loading...</p>
                            :
                            points.map((point,index)=>(
                                <SummarizedPoint point={point} key={index}/>
                            ))
                        }
                        <Button startIcon={<AddCircleOutlineIcon/>} onClick={createPoint}>
                            Criar novo ponto
                        </Button>
                    </CardContent>
                </Card>

            </Box>
            <Box flexDirection={'row'} width={'100vw'} justifyContent={'flex-start'} alignItems='center' borderTop={'1px solid black'} flex={'1'}>
                <Typography>
                    Made by Me
                </Typography>
            </Box>
        </Box>
    </>
  }
