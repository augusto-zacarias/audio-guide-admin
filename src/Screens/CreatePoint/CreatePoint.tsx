import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, CssBaseline, FormControl, FormLabel, Stack, styled, TextField, Typography } from '@mui/material';
import MuiCard from '@mui/material/Card';
import { AndroidMockup } from 'react-device-mockup';
import ReactDom from 'react-dom'
import ReactMarkdown from 'react-markdown'

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '450px',
    },
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
    const [markdown, setMarkdown] = React.useState('');

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data);
    }

    function validateInputs(): void {
        console.log("test")
    }

    return <>
        <CssBaseline enableColorScheme />
        <Box display={'flex'} flexDirection='column' justifyContent={'flex-start'} alignItems={'center'} height={'100vh'}>
            <Box flexDirection={'row'} width={'100vw'} justifyContent={'flex-start'} alignItems={'center'} borderBottom={'1px solid black'} flex={'1'}>
                <Typography>
                    Audio Guide Admin
                </Typography>
            </Box>
            <Box display={'flex'} width={'100vw'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} gap={'10%'} flex={'100'}>
                <Card variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    Create new turist point
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                    }}
                >
                    <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        error={nameError}
                        helperText={nameErrorMessage}
                        id="email"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={nameError ? 'error' : 'primary'}
                        sx={{ ariaLabel: 'email' }}
                    />
                    </FormControl>
                    <FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                    </Box>
                    <TextField
                        error={nameError}
                        helperText={nameErrorMessage}
                        onChange={(val)=>setMarkdown(val.target.value)}
                        name="password"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={nameError ? 'error' : 'primary'}
                    />
                    </FormControl>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={validateInputs}
                    >
                    Create
                    </Button>
                </Box>
                </Card>
                <AndroidMockup screenWidth={300}>
                    <ReactMarkdown children={markdown}/>
                </AndroidMockup>

            </Box>
            <Box flexDirection={'row'} width={'100vw'} justifyContent={'flex-start'} alignItems='center' borderTop={'1px solid black'} flex={'1'}>
                <Typography>
                    Made by Me
                </Typography>
            </Box>
        </Box>
    </>
  }
