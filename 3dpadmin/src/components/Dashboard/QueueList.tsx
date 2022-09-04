// List of jobs in the print queue for dashboard.
// Matt Rossouw (omeh-a)
// 08/22

import React from 'react';
import JobChip from './JobChip';
import { Queue } from '../../logic/queue';
import { Job } from '../../logic/job';

interface QueueListProps {
    jobs: Array<Job>;
}

const QueueList: React.FC<QueueListProps> = ({jobs}) => {
    return (
        <div>
            {jobs.map((job: Job) => (
                <JobChip job={job} />
            ))}
        </div>
    )
}

export default QueueList;