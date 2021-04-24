import React, { useState } from 'react';

import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ThemeProvider, withStyles, makeStyles } from "@material-ui/core/styles";
import { theme } from '../styles/theme'

import { settings } from '../settings'

import moment from 'moment';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: 80,
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
  },
  box: {
    paddingRight: 20,
    paddingLeft: 20,
    margin: theme.spacing(2),
    height: 40,

    background: theme.palette.primary.background,
    opacity: theme.palette.primary.opacity,
  },
  select: {
    marginTop: theme.spacing(0.5),
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  slider: {
    marginTop: theme.spacing(0.5),
    color: theme.palette.primary.main,
  }
}));

const TimelineSlider = withStyles({
  root: {
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: theme.palette.primary.background,
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  rail: {
    height: 8,
  },
  mark: {
    height: 8,
    width: 1,
    marginTop: 0,
  },
})(Slider);


function ChartPanel(props) {
  const classes = useStyles();
  const [type, setType] = useState(props.type);

  const items = Object.keys(settings.chartTypes).map(key => <MenuItem key={key} value={key}>{key}</MenuItem>);

  const label = ((index) => {
    return props.timeline ? moment(props.timeline[index].datetime).format() : '';
  })

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <Box className={classes.box}>
          <Grid container >

            <Grid item xs={2} >
              <FormControl >
                <Select className={classes.select}
                  value={type}
                  onChange={e => {
                    setType(e.target.value);
                    props.handleChangeType(e.target.value);
                  }} >
                  {items}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={10} >
              <TimelineSlider className={classes.slider}
                defaultValue={settings.timeline.count - 1}
                value={props.index}
                onChange={(e, newIndex) => { props.handleChangeIndex(newIndex) }}
                step={1}
                marks={true}
                track={false}
                min={0}
                max={settings.timeline.count - 1}
                disabled={props.timeline ? false : true}
              />
            </Grid>
          </Grid>

        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ChartPanel;
