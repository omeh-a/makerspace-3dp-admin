// List of jobs in the print queue for dashboard.
// Matt Rossouw (omeh-a)
// 08/22

import React from 'react';
import JobChip from './JobChip';
import { Queue } from '../../logic/queue';
import { Job } from '../../logic/job';
import { Paper, Stack, Typography } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


interface QueueListProps {
    jobs: Array<Job>;
    title: string;
}

const QueueList: React.FC<QueueListProps> = ({jobs, title}) => {
    return (
        <Stack sx={{padding:"2px"}}>
            <Paper elevation={1} sx={{padding:"5px"}}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                {jobs.map((job: Job) => (
                    <JobChip job={job} />
                ))}
            </Paper>
        </Stack>
    )
}

export default QueueList;