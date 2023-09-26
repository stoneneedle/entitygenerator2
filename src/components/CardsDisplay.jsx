// import EntityCard2 from "./EntityCard2";

import GrayEntityCard from "./GrayEntityCard";
import Box from '@mui/material/Box';

export default function CardsDisplay(props) {
  const entityCards = props.entities.map((entityObj, index) =>
    <GrayEntityCard key={index} entity={entityObj} />
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        {entityCards}
        {/* <GrayEntityCard /> */}
        {/* <GrayEntityCard />
        <GrayEntityCard /> */}
      </Box>
    </>
  );
}