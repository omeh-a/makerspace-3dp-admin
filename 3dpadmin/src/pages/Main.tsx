// Main window component. UI elements for navigating between subpages contained within.
// Matt Rossouw (omeh-a)
// 08/22

import React from 'react';
import styled from 'styled-components';
import Dashboard from './Dashboard';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Jobs from './Jobs';
import Machines from './Machines';
import { Job, sampleJobs } from '../logic/job';
import { Queue } from '../logic/queue';


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
    const [tab, setTab] = React.useState(0);

    const [printQueue, setPrintQueue] = React.useState(sampleJobs());
    const [printingQueue, setPrintingQueue] = React.useState(new Array<Job>());
    const [completedQueue, setCompletedQueue] = React.useState(new Array<Job>());

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                3D Print Hub
            </Typography>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
            >
                
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
                <TabPanel value={tab} index={0}>
                    <Dashboard printQueue={printQueue} printingQueue={printingQueue} 
                    completedQueue={completedQueue}/>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <Jobs/>
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <Machines/>
                </TabPanel>
            </Box>
        </div>
    )
}

export default Main;