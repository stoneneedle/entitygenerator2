// Context API & App Data
import { useContext } from 'react';
import { AppContext } from "../AppContext";

// MUI
import { Box } from "@mui/material";
import { Typography } from '@mui/material';

// Components
import CardsDisplay from "../components/CardsDisplay";

export default function Notebook() {
  const { appData } = useContext(AppContext);

  return(
    <>
      <Box flex={1} p={{ xs: 0, md: 2 }}>
        <Typography variant="h3" component="div">
          Notebook
        </Typography>
        <CardsDisplay entities={appData.entityObjects} />
      </Box>
    </>
  );
}
