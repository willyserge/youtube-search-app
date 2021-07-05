import React from 'react';

import './index.scss';

function Image({ url }) {
  return (
    <img className="image" src={url} alt="youtube-video-thumbnail" />
  );
}

export default Image;
