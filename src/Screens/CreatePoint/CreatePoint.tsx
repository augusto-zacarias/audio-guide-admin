import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, CssBaseline, FormControl, FormLabel, Checkbox, styled, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import MuiCard from '@mui/material/Card';
import { AndroidMockup } from 'react-device-mockup';
import ReactMarkdown from 'react-markdown'
import Header from '../../Components/Header';
import { EmptyTuristPoint, TuristPoint } from '../../Services/types';
import { useLocation } from 'react-router-dom';
import { createPonto, getPonto, updatePonto } from '../../Services/backend';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    padding: theme.spacing(4),
    boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
      boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
  }));

export default function CreatePoint() {
    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('');

    const {state} = useLocation();

    const [action, setAction] = React.useState<String>("create");
    const [point, setPoint] = React.useState<TuristPoint>(EmptyTuristPoint());

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        switch(action) {
            case "create":
                try {
                    const createResponse = createPonto(point);
                } catch(e:any) {
                    setNameError(true);
                    setNameErrorMessage(e.message);
                }
                break;
            case "edit":
                const reditResponse = updatePonto(point.id ?? 0,point);
                break;
            case "check":
                console.log(point)
                break;
            default:
                console.log(point)
        }
    }

    React.useEffect(()=>{
        (async () => {
            if (state!=null) {
                const { actionType, pointId } = state;
                setAction(actionType);
                if (pointId!=0) {
                    const point = await getPonto(pointId);
                    setPoint(point);
                }
            }
        })();
    },[]);

    return <>
        <CssBaseline enableColorScheme />
        <Box display={'flex'} flexDirection='column' justifyContent={'flex-start'} alignItems={'center'} height={'100vh'}>
            <Header/>

            <Box display={'flex'} width={'100vw'} flexDirection={'row'} paddingLeft={'20px'} justifyContent={'space-evenly'} alignItems={'center'} flex={'100'}>
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        {action === "create" ? "Create new" : action === "edit" ? "Edit existing": "Check"} turist point
                    </Typography>
                    <Grid container spacing={2}
                     component="form" width={'50vw'}
                        onSubmit={handleSubmit}
                        noValidate>
                        <Grid size={6}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <TextField
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    id="name"
                                    type='text'
                                    name="name"
                                    placeholder="Parque do povo"
                                    autoComplete="Parque do povo"
                                    value={point.name}
                                    onChange={newVal=>setPoint({...point,name:newVal.target.value})}
                                    autoFocus
                                    required
                                    variant="outlined"
                                    color={nameError ? 'error' : 'primary'}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={2}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="type">Turist Point Type</FormLabel>
                                <TextField
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    id="type"
                                    type='text'
                                    name="type"
                                    placeholder="Parque"
                                    autoComplete="Parque"
                                    value={point.type}
                                    onChange={newVal=>setPoint({...point,type:newVal.target.value})}
                                    required
                                    variant="outlined"
                                    color={nameError ? 'error' : 'primary'}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={2}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="entryPrice">Entry Price</FormLabel>
                                <TextField
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    id="entryPrice"
                                    type='number'
                                    name="entryPrice"
                                    placeholder="0"
                                    value={point.entryPrice}
                                    onChange={newVal=>setPoint({...point,entryPrice:parseFloat(newVal.target.value)})}
                                    variant="outlined"
                                    color={nameError ? 'error' : 'primary'}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={2}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="accessible">Is wheelchair friendly</FormLabel>
                                <Checkbox
                                    id="accessible"
                                    name="accessible"
                                    checked={point.accessible}
                                    onChange={newVal=>{
                                        setPoint({...point,accessible:!point.accessible});
                                    }}
                                    required
                                    color={nameError ? 'error' : 'primary'}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={6}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="type">Address</FormLabel>
                                <TextField
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    id="address"
                                    type='text'
                                    name="address"
                                    placeholder="R. Sebastião Donato, S/N - Centro, Campina Grande"
                                    autoComplete="Rua ..."
                                    value={point.address}
                                    onChange={newVal=>setPoint({...point,address:newVal.target.value})}
                                    required
                                    variant="outlined"
                                    color={nameError ? 'error' : 'primary'}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={3}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="latitude">Latitude</FormLabel>
                                <TextField
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    id="latitude"
                                    type='text' 
                                    name="latitude"
                                    placeholder="-7.2237449"
                                    value={point.latitude}
                                    onChange={newVal=>setPoint({...point,latitude:parseFloat(newVal.target.value)})}
                                    required
                                    variant="outlined"
                                    color={nameError ? 'error' : 'primary'}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={3}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="longitude">Longitude</FormLabel>
                                <TextField
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    id="longitude"
                                    type='text'
                                    name="longitude"
                                    
                                    placeholder="-35.8901559"
                                    value={point.longitude}
                                    onChange={newVal=>setPoint({...point,longitude:parseFloat(newVal.target.value)})}
                                    required
                                    variant="outlined"
                                    color={nameError ? 'error' : 'primary'}
                                />
                            </FormControl>
                        </Grid>
                        
                        <Grid size={6}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <TextField
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    id="email"
                                    type='text'
                                    name="email"
                                    placeholder="contato@gmail.com"
                                    autoComplete="contato@gmail.com"
                                    value={point.email}
                                    onChange={newVal=>setPoint({...point,email:newVal.target.value})}
                                    required
                                    variant="outlined"
                                    color={nameError ? 'error' : 'primary'}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={6}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="telephone">Telephone</FormLabel>
                                <TextField
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    id="telephone"
                                    type='text'
                                    name="telephone"
                                    placeholder="8391234-5678"
                                    autoComplete="8391234-5678"
                                    value={point.telephone}
                                    onChange={newVal=>setPoint({...point,telephone:newVal.target.value})}
                                    required
                                    variant="outlined"
                                    color={nameError ? 'error' : 'primary'}
                                />
                            </FormControl>
                        </Grid>

                        <Grid size={12}>
                        <FormControl fullWidth>
                                <FormLabel htmlFor="markdown">Transcript</FormLabel>
                                <TextField
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    id="markdown"
                                    type='text'
                                    multiline
                                    rows={5}
                                    name="markdown"
                                    value={point.transcript.text}
                                    onChange={newVal=>setPoint({...point,transcript:{...point.transcript,text:newVal.target.value}})}
                                    required
                                    variant="outlined"
                                    color={nameError ? 'error' : 'primary'}
                                />
                            </FormControl>
                        </Grid>
                        
                        
                        <Grid size={12}>
                            {action!="check" && <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            >
                            {action == 'create'?"Create":"Update"}
                        </Button>}
                        </Grid>
                    </Grid>
                </Card>

                <Box margin={'20px'}>
                    <AndroidMockup screenWidth={300}>
                        <ReactMarkdown children={point.transcript.text}/>
                    </AndroidMockup>
                </Box>
            </Box>

            <Box flexDirection={'row'} width={'100vw'} justifyContent={'flex-start'} alignItems='center' borderTop={'1px solid black'} flex={'1'}>
                <Typography>
                    Made by Me
                </Typography>
            </Box>
        </Box>
    </>
  }
