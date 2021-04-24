import React from 'react';

import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { theme } from '../styles/theme'

import moment from 'moment';

const useStyles = makeStyles(() => ({
  root: {
    display: 'inline-block',
    height: 150,
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
  box: {
    padding: 10,
    margin: theme.spacing(2),

    background: theme.palette.primary.background,
    opacity: theme.palette.primary.opacity,
  },
}));


function ChartTitle(props) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <Box className={classes.box}>
          <Typography variant="h1" color="primary" >
            {props.title.title} {props.title.code}（{props.title.type}）
          </Typography>
          <Box p={0.5}>
            <Typography variant="body1" color="primary" >
              basetime : {moment.utc(props.title.basetime).format()}
            </Typography>
            <Typography variant="body1" color="primary"  >
              validtime : {moment.utc(props.title.validtime).format()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ChartTitle;
