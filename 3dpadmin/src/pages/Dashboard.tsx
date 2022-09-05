// Dashboard for 3D print hub
// Matt Rossouw (omeh-a)
// 08/22

import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { Queue } from '../logic/queue';
import { Job } from '../logic/job';
import  QueueList  from '../components/Dashboard/QueueList'
import { Typography } from '@mui/material';

interface DashboardProps {
    printQueue: Array<Job>;
    printingQueue: Array<Job>;
    completedQueue: Array<Job>;
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Dashboard: React.FC<DashboardProps> = ({printQueue, printingQueue, completedQueue}) => {
    return (
        <Box sx={{ width: 1 }}>
            <Grid container spacing={3}>
                <Grid lg>
                    <Typography variant="h6" gutterBottom>
                        Print Queue
                    </Typography>
                    <QueueList jobs={printQueue}/>
                </Grid>
                <Grid lg>
                    <Typography variant="h6" gutterBottom>
                        Printing
                    </Typography>
                    <QueueList jobs={printingQueue}/>
                </Grid>
                <Grid lg>
                    <Typography variant="h6" gutterBottom>
                        Completed
                    </Typography>
                    <QueueList jobs={completedQueue}/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Dashboard;