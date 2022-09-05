// List of jobs in the print queue for dashboard.
// Matt Rossouw (omeh-a)
// 08/22

import React from 'react';
import JobChip from './JobChip';
import { Queue } from '../../logic/queue';
import { Job } from '../../logic/job';
import { Stack } from '@mui/material';

interface QueueListProps {
    jobs: Array<Job>;
}

const QueueList: React.FC<QueueListProps> = ({jobs}) => {
    return (
        <Stack>
            
            {jobs.map((job: Job) => (
                <JobChip job={job} />
            ))}
        </Stack>
    )
}

export default QueueList;