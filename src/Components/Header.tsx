import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, CssBaseline, FormControl, FormLabel, Stack, styled, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
export default function Header() {

    return <>
        <CssBaseline enableColorScheme />
        <Box display={'flex'} flexDirection={'row'} gap={'20px'} width={'100vw'} justifyContent={'flex-start'} alignItems={'center'} borderBottom={'1px solid black'} flex={'1'}>
            <Typography>
                Audio Guide Admin
            </Typography>

            <Link to={'/point'}>
                Create point
            </Link>

            <Link to={'/list'}>
                list points
            </Link>
        </Box>
    </>
  }
