import React from 'react';
import './ChartTitle.css';
import moment from 'moment';

function ChartTitle(props) {

  return (
    <article className='ChartTitle'>
      <h1>{props.title.title} {props.title.code}（{props.title.type}）</h1>
      <p>basetime : {moment.utc(props.title.basetime).format()}</p>
      <p>validtime : {moment.utc(props.title.validtime).format()}</p>
    </article>
  );
}

export default ChartTitle;
