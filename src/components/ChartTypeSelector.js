import React from 'react';
import './ChartTypeSelector.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function ChartTypeSelector(props) {
  const [type, setType] = React.useState(Object.keys(props.types)[0]);

  const items = [];
  for (const key in props.types) {
    items.push(<MenuItem value={key}>{key}</MenuItem>);
  }

  const onChange = (e) => {
    setType(e.target.value);
    return props.handleChangeType(e.target.value)
  }

  return (
    <article className='ChartTypeSelector'>
      <FormControl >
        <InputLabel id="chartselector-select-label">type</InputLabel>
        <Select labelId="chartselector-select-label"
          id="demo-simple-select"
          value={type}
          onChange={e => onChange(e)} >
          {items}
        </Select>
      </FormControl>
    </article>
  );
}

export default ChartTypeSelector;
