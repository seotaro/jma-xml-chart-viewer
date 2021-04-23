import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from "@material-ui/core/styles";

import moment from 'moment';
import { settings } from '../settings'
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 40,
    position: 'absolute',
    bottom: 10,
    zIndex: 10,
  },
  box: {
    paddingRight: 20,
    paddingLeft: 20,
    marginRight: 20,
    marginLeft: 20,

    background: '#ffffff',
    opacity: 0.75,
  },
}));


function ChartPanel(props) {
  const classes = useStyles();
  const [type, setType] = useState(props.type);

  const items = Object.keys(settings.chartTypes).map(key => <MenuItem key={key} value={key}>{key}</MenuItem>);

  const label = ((index) => {
    return props.timeline ? moment(props.timeline[index].datetime).format() : '';
  })

  return (
    <Box className={classes.root}>
      <Box className={classes.box}>
        <Grid container >

          <Grid item xs={2} >
            <FormControl >
              <Select
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
            <Slider
              defaultValue={settings.timeline.count - 1}
              value={props.index}
              onChange={(e, newIndex) => { props.handleChange(newIndex) }}
              step={1}
              marks={true}
              min={0}
              max={settings.timeline.count - 1}
              disabled={props.timeline ? false : true}
            />
          </Grid>
        </Grid>

      </Box>
    </Box>
  );
}

export default ChartPanel;
