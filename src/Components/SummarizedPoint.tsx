import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, CssBaseline, FormControl, FormLabel, IconButton, Stack, styled, TextField, Typography } from '@mui/material';
import { TuristPoint } from '../Services/types';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { deletePonto } from '../Services/backend';
export default function SummarizedPoint({ point }:{point:TuristPoint}) {

    const navigate = useNavigate();

    function seePoint() {
        navigate('/point', { state: { actionType: 'check', pointId: point.id ?? 0 } });
    }
    function editPoint() {
        navigate('/point', { state: { actionType: 'edit', pointId: point.id ?? 0 } });
    }
    async function deletePoint() {
        try{
            await deletePonto(point.id ?? 0);
        } catch(e) {
            console.log("failed to delete");
        }
    }

    return <>
        <CssBaseline enableColorScheme />
        <Box display={'flex'} flexDirection={'row'} gap={'20px'}  justifyContent={'space-evenly'} alignItems={'center'}>
            <Box display={'flex'} flexDirection={'row'} gap={'10px'}>
                <Typography>
                    <b>Name:</b> {point.name}
                </Typography>
                <Typography>
                    <b>Address:</b> {point.address}
                </Typography>
                <Typography>
                    <b>Latitude:</b> {point.latitude}
                    <b>Longitude:</b> {point.longitude}
                </Typography>
            </Box>
            <Box display={'flex'} flexDirection={'row'} gap={'10px'}>
                <IconButton onClick={seePoint} color='primary'>
                    <VisibilityIcon />
                </IconButton>
                <IconButton onClick={editPoint} color='warning'>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={deletePoint} color='error'>
                    <DeleteForeverIcon />
                </IconButton>
            </Box>
        </Box>
    </>
  }
