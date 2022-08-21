// Sidebar.tsx
// Matt

import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';

const Container = styled.div`
  width: 250px;
  background: #ffffff;
  height: 100%;
`

const SidebarTitle = styled.div`
  font-size: x-large;
  margin: 2rem;
  font-weight: bold;
`

const ButtonFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 80px;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 30px;
`

interface SideBarButtonProps {
  bgcolor: string;
  Color: string;
}

const SidebarButton = styled(Button) <SideBarButtonProps>`
  && {
    width: 160px;
    /* variant: contained; */
    background-color: ${props => props.bgcolor};
    color: ${props => props.Color};
    border-radius: 20px;
    text-transform: none;
  }
`

interface SideBarProps {

}

// Wrapper component ${props => props.color}
const SideBar: React.FC<SideBarProps> = () => {
  return (
    <Container>
      <SidebarTitle>
        Groundstation control
      </SidebarTitle>
      <ButtonFlex>
        <ButtonGroup>

          <SidebarButton bgcolor="#F88282" Color="#000000">
            What&apos;s up
          </SidebarButton>
          <SidebarButton bgcolor="#F88282" Color="#000000">
            Find by ID
          </SidebarButton>
        </ButtonGroup>
        <ButtonGroup>
          <SidebarButton bgcolor="#82A3F8" Color="#000000">
            Calculate encounter
          </SidebarButton>
        </ButtonGroup>
      </ButtonFlex>
    </Container>
  )
}

export default SideBar;
