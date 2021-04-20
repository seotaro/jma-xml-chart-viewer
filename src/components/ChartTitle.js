import React from 'react';
import './ChartTitle.css';
import moment from 'moment';

function Title(props) {

  return (
    <article className='ChartTitle'>
      <h1>{props.title.title} {props.title.code}（{props.title.type}）</h1>
      <p>basetime : {moment(props.title.basetime).format()}</p>
      <p>validtime : {moment(props.title.validtime).format()}</p>
    </article>
  );
}

export default Title;
