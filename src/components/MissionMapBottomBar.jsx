import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import CachedIcon from '@mui/icons-material/Cached';
import FunctionsIcon from '@mui/icons-material/Functions';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';

const MissionMapBottomBar = (props) => {
  const [value, setValue] = React.useState(0);
  return (
    <Box sx={{ 
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      width: '600px',
      mx: 'auto',
      marginBottom: '20px'
    }}>
      <BottomNavigation
        sx={{ borderRadius: '15px', backgroundColor: 'rgba(0, 0, 0, 0.80)', color: '#FFF' }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction sx={{color: '#ffffff'}} onClick={props.handleMapTypeChange} label="Sattelite" icon={<LocationOnIcon />} />
        <BottomNavigationAction sx={{color: '#ffffff'}} onClick={props.handleMissionDisplay} label="Mission" icon={<LocationOnIcon />} />
        <BottomNavigationAction sx={{color: '#ffffff'}} onClick={props.handleMissionObjective} label="Objectives" icon={<MilitaryTechIcon />} />
        <BottomNavigationAction sx={{color: '#ffffff'}} onClick={props.handleToggleCommandPanel} label="Command" icon={<LocalPoliceIcon />} />
        <BottomNavigationAction sx={{color: '#ffffff'}} onClick={props.handleModifier} label="Modifiers" icon={<FunctionsIcon />} />
        <BottomNavigationAction sx={{color: '#ffffff'}} onClick={props.handleMissionStatus} label="Status" icon={<CachedIcon />} />
        <BottomNavigationAction sx={{color: '#ffffff'}} onClick={props.handleMissionShutdown} label="Shutdown" icon={<PowerSettingsNewIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default MissionMapBottomBar;