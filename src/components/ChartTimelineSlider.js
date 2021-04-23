import React from 'react';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { settings } from '../settings'
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    position: 'absolute',
    bottom: 10,
    zIndex: 10,
    height: 30,
  },
}));


function ChartTimelineSlider(props) {
  const classes = useStyles();

  const onChange = (e, newIndex) => {
    return props.handleChange(newIndex)
  }

  const label = ((index) => {
    return props.timeline ? moment(props.timeline[index].datetime).format() : '';
  })

  return (
    <article className={classes.root}>
      <Grid container >
        <Grid item xs={4} >
        </Grid>

        <Grid item xs={8} >
          <Slider
            defaultValue={settings.timeline.count - 1}
            value={props.index}
            onChange={onChange}
            step={1}
            marks={true}
            min={0}
            max={settings.timeline.count - 1}
            disabled={props.timeline ? false : true}
          />
        </Grid>
      </Grid>
    </article >
  );
}

export default ChartTimelineSlider;
