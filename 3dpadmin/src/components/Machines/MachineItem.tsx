// Display element for the Machines page showing the overview of a single 3d printer.
// Matt Rossouw (omeh-a)
// 09/22

import React from 'react';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { Machine, Model } from '../../logic/machine';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';



interface MachineItemProps {
    machine: Machine;
}

const MachineItem: React.FC<MachineItemProps> = ({machine}) => { 


    return (
        <Box sx={{width: "180px"}}>
            <Paper elevation={2}>
                <Stack sx={{padding: "4px"}}>
                    <Stack direction="row" >
                        <ExpandCircleDownOutlinedIcon sx={{padding:"5px"}}/>
                        <Typography variant={"h6"}>
                            {machine.getName()}
                        </Typography>
                    </Stack>
                    <Stack sx={{padding: "4px"}}>
                        {/* Show a different model string based on Model enum */}
                        <Typography variant={"body1"}>
                            {machine.getModelString()}
                        </Typography>
                        <Typography>
                            IPv4: {machine.getIp()}
                        </Typography>
                    </Stack>
                    <Stack sx={{padding:"4px"}}>
                        <Button variant="contained" sx={{margin: "1px", width:"100%"}}>
                            View machine
                        </Button>
                        {/* Show digital factory button if this machine is an ultimaker */}
                        {machine.getModel() === Model.UM3 || machine.getModel() === Model.UMS3 || machine.getModel() === Model.UMS5 ? 
                            <div>
                                <Button variant="contained" sx={{margin: "1px", width:"100%"}} onClick={() => {
                                    window.open(`http://${machine.getIp()}/print_jobs`, "_blank");
                                }}>
                                    Digital factory
                                </Button>
                                <Button variant="contained" sx={{margin: "1px", width:"100%"}} onClick={() => {
                                    window.open(`http://${machine.getIp()}/?action=stream`, "_blank");
                                }}>
                                    Camera feed
                                </Button>
                            </div>
                        : null}
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    )

}

export default MachineItem;