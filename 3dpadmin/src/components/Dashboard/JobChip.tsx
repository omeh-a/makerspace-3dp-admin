// Chip representing an item in one of the dashboard lists.
// Matt Rossouw (omeh-a)
// 08/22

import React from 'react';
import { Chip, Tooltip, Typography } from '@mui/material';
import { Job } from '../../logic/job';

interface ListItemProps {
    job : Job,
}

const JobChip : React.FC<ListItemProps> = ({job}) => {
    return (
        <Tooltip title = {
            <React.Fragment>
                <Typography> {job.getName()} </Typography>
                {/* Show machine name, if this job has a machine assigned */}
                <p>
                    Machine: {job.getMachine() && <Typography> {job.getMachine().getName()} </Typography>}
                </p>
                <p>
                    {job.getPath()}
                </p>
            </React.Fragment>    
            } arrow >
            <Chip
                label = {`${job.getOnlineCode()}: ${job.getDate().toLocaleString()}`}
                onClick = {() => {alert("TODO")}}
                style = {{margin: "3px", width: "340px"}}
            />
        </Tooltip>
    )
}


export default JobChip;