import React from 'react';

import './index.scss';

function Image({ url }) {
  return (
    <img className="image" src={url} />
  );
}

export default Image;
