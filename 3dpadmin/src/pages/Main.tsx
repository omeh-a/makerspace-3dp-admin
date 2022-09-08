// Main window component. UI elements for navigating between subpages contained within.
// Matt Rossouw (omeh-a)
// 08/22

// React imports
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Dashboard from './Dashboard';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Jobs from './Jobs';
import Machines from './Machines';
import { Paper, Stack } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Logic imports
import { Machine, sampleMachines1 } from '../logic/machine';
import { Job, JobStatus, sampleJobs1, sampleJobs2, sampleJobs3 } from '../logic/job';
import { getQueuedJobs } from '../logic/dbmanager';


// Tab panel code here is heavily borrowed from the sample code from MUI (for now).
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


const Main: React.FC = () => {
    const [tab, setTab] = React.useState(2);

    const [printQueue, setPrintQueue] = React.useState(sampleJobs1());
    const [printingQueue, setPrintingQueue] = React.useState(sampleJobs2());
    const [completedQueue, setCompletedQueue] = React.useState(sampleJobs3());
    const [machines, setMachines] = React.useState(sampleMachines1());

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    useEffect(() => { 
        // Get jobs from DB and send them to the appropriate queue.
        setPrintQueue(getQueuedJobs());
    })

    return (
        <Paper elevation={0}>
            <Stack direction="row">
                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224, width: "25%" }}
                >
                    <Stack>
                        <Typography variant="h5" gutterBottom>
                            3D Print Hub
                        </Typography>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={tab}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            <Tab label="Dashboard" {...a11yProps(0)} />
                            <Tab label="Jobs" {...a11yProps(1)} />
                            <Tab label="Machines" {...a11yProps(2)} />
                        </Tabs>
                    </Stack>
                </Box>
                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', width: "75%" }}
                >
                    <TabPanel value={tab} index={0}>
                        <Dashboard printQueue={printQueue} printingQueue={printingQueue}
                            completedQueue={completedQueue} />
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <Jobs />
                    </TabPanel>
                    <TabPanel value={tab} index={2}>
                        <Machines machines={machines} />
                    </TabPanel>
                </Box>
            </Stack>
        </Paper>
    )
}

export default Main;