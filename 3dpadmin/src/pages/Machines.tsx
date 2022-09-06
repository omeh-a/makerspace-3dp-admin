// Subpage listing all 3D printers known to the program.
// Matt Rossouw (omeh-a)
// 08/22

import { Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { Machine } from '../logic/machine';
import MachineItem from '../components/Machines/MachineItem';


interface MachinesProps {
    machines: Array<Machine>;
}

const Machines: React.FC<MachinesProps> = ({machines}) => {


    return(
        <Box sx={{width:"100%"}}>
            <Grid2 container spacing={2}>
                {/* Map all machines into MachineItems */}
                {machines.map((machine: Machine) => (
                    <Grid2> 
                        <MachineItem machine={machine} />
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    )
}

export default Machines;