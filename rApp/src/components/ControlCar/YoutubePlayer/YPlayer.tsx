import React from 'react';

interface YPLayerProps{
  youtubeLink?: string
}

const YPlayer = ({youtubeLink}:YPLayerProps) => {
  return (
    <div>
      {youtubeLink}
    </div>
  );
};

export default YPlayer;
