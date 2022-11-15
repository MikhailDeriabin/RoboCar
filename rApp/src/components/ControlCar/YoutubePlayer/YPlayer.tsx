import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import ReactPlayer from "react-player";

interface YPLayerProps{
  youtubeLink?: string
}

const YPlayer = ({youtubeLink}:YPLayerProps) => {
  return (
    <ReactPlayer url={youtubeLink} />
  );
};

export default YPlayer;
