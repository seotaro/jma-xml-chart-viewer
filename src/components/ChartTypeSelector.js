import React from 'react';
import './ChartTypeSelector.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function ChartTypeSelector(props) {
  const [type, setType] = React.useState(Object.keys(props.types)[0]);

  const items = Object.keys(props.types).map(key => <MenuItem key={key} value={key}>{key}</MenuItem>);

  return (
    <article className='ChartTypeSelector'>
      <FormControl >
        <InputLabel id="chartselector-select-label">jmaxml type</InputLabel>
        <Select labelId="chartselector-select-label"
          value={type}
          onChange={e => { setType(e.target.value); props.handleChangeType(e.target.value) }} >
          {items}
        </Select>
      </FormControl>
    </article>
  );
}

export default ChartTypeSelector;
