import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


// const card = (
//   <React.Fragment>
    // <CardContent>
    //   <Typography variant="h5" component="div">
    //     NPC Generator 1
    //   </Typography>
    //   <Typography color="text.secondary">
    //     tableName: tableValue(s)
    //   </Typography>
    //   <Typography color="text.secondary">
    //     tableName: tableValue(s)
    //   </Typography>
    //   <Typography color="text.secondary">
    //     tableName: tableValue(s)
    //   </Typography>
    //   <Typography color="text.secondary">
    //     tableName: tableValue(s)
    //   </Typography>
    //   <Typography color="text.secondary">
    //     tableName: tableValue(s)
    //   </Typography>
    // </CardContent>
    // <CardActions>
    //   <Button size="small">Generate New</Button>
    // </CardActions>
//   </React.Fragment>
// );

export default function GrayEntityCard(props) {

  const entityData = props.entity.entityData.map((entityData, index) =>
  <Typography key={index} color="text.secondary">
    {entityData.tableName}: {entityData.tableValues.join(", ")}
  </Typography>
  );

  console.log(props.entity.entityData);

  const card = (
    <>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.entity.entityName}
        </Typography>
        {entityData}
      </CardContent>
      <CardActions>
        <Button size="small">Generate New</Button>
      </CardActions>
    </>
  );

  return (
    <Box m={2} pt={3}>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
    </Box>
  );
}
