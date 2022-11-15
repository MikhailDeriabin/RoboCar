import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import ReactPlayer from "react-player";

interface YPLayerProps{
  videoLink?: string
}

const VPlayer = ({videoLink}:YPLayerProps) => {
  return (
    <ReactPlayer url={videoLink} />
  );
};

export default VPlayer;
