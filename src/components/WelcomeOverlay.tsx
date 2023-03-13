import { useState } from 'react';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import gruvMachine from '../../public/gameboard.png';
import deathMachine from '../../public/death-machine.png';
import Image from 'next/image'
import { BLANK_COLOR } from "../constants/constants";

function WelcomeOverlay({ onClose, isMobile}) {

  const openTelegram = () => {
    window.open('https://t.me/+o2ukH44rqIczMjgx', '_blank');
  };


 return (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    }}
  >
    <Box
      sx={{
        width: '95%',
        maxWidth: '500px',
        backgroundColor: '#f2f1ed',
        borderRadius: 4,
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundImage: `url(${deathMachine})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '10px 10px 0px #000000',
        margin: '0 auto',
        '@media (min-width: 600px)': {
          width: '100%',
        },
      }}
    >
      <Box sx={{}}>
        <Typography variant="h2" sx={{ fontSize: '2rem', color: 'black', mb: 2, ml: 2, textDecoration: 'underline double' }}>
          DEATH-MACHINE ️
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'black', mb: 2, ml: 2 }}>
          Welcome to Death-Machine! A fully on-chain game that leverages zero-knowledge cryptography to create a novel proof-of-play blockchain.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4,  }}>
        <Image src={deathMachine} alt="deathMachine" width={200} height={200} style={{border: '2px solid #ffffff', borderRadius: '50%', boxShadow: '0px 0px 30px #ffffff'}} />
      </Box>
      <Box sx={{}}>
        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'black', mb: 4, ml: 2 }}>
          We are currently in closed beta testing. To learn more about the project and join our community, please join our Telegram chat!
        </Typography>
        <Button variant="contained" onClick={openTelegram} sx={{ backgroundColor: '#FC72FF', color: 'white', fontWeight: 'bold', ml: 8 }}>
          Join Telegram Chat
        </Button>
      </Box>
    </Box>
  </Box>
);
}

export default function WelcomeApp({generateBoard}: props) {
  const [showWelcome, setShowWelcome] = useState(true);

  function handleWelcomeClose() {
    setShowWelcome(false);
    generateBoard();
  }

  return (
    <>
      {showWelcome && <WelcomeOverlay onClose={handleWelcomeClose} />}
    </>
  );
}
