import React from 'react';

const PlayButton = (props) => {
  return (
    <div>
      <button onClick={props.playMap}>Play!</button>
    </div>
  );
};
export default PlayButton;
