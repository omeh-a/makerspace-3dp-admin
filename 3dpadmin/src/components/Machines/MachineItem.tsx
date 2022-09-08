// Display element for the Machines page showing the overview of a single 3d printer.
// Matt Rossouw (omeh-a)
// 09/22

import React from 'react';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { Machine, Ultimaker, Model, IP_NOT_NETWORKED } from '../../logic/machine';
import { Box, Button, ButtonGroup, Paper, Stack, styled, Typography } from '@mui/material';



interface MachineItemProps {
    machine: Machine;
}

// const MachineItemButton = styled(Button)() => ({

// });


const MachineItem: React.FC<MachineItemProps> = ({machine}) => { 


    return (
        <Box sx={{width: "230px", height:"250px"}}>
            {/* Disable if machine is not connected */}
            <Paper elevation={2} sx={{height:"100%", width:"100%"}}>
                <Stack sx={{padding: "4px"}}>
                    <Stack direction="row" >
                        <ExpandCircleDownOutlinedIcon sx={{padding:"5px"}}/>
                        <Typography variant={"h6"}>
                            {machine.getName()}
                        </Typography>
                    </Stack>
                    <Stack sx={{padding: "4px"}}>
                        {/* Show a different model string based on Model enum */}
                        <b>
                            {machine.getStatus()}
                        </b>
                        <Typography variant={"body1"}>
                            {machine.getModelString()}
                        </Typography>
                        {/* <Typography>
                            {machine.getIpString()}
                        </Typography> */}
                    </Stack>
                    <Stack sx={{padding:"4px"}}>
                        <Button variant="contained" sx={{margin: "1px", width:"100%"}}>
                            View machine
                        </Button>
                        {/* Show digital factory button if this machine is an ultimaker */}
                        { (machine instanceof Ultimaker && machine.isConnected())  ? 
                            <div>
                                <ButtonGroup variant="contained" sx={{margin: "1px", width:"100%", height:"5%"}}>
                                    <Button variant="contained" onClick={() => {
                                        window.open(`http://${machine.getIp()}/print_jobs`, "_blank");
                                    }}>
                                        Digital factory
                                    </Button>
                                    <Button variant="contained" onClick={() => {
                                        window.open(`http://${machine.getIp()}:8080/?action=stream`, "_blank");
                                    }}>
                                        Camera feed
                                    </Button>
                                </ButtonGroup>
                            </div>
                        : null}
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    )

}

export default MachineItem;