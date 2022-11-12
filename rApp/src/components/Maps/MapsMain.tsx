import React, {useEffect, useState} from 'react';
import Canvas from '../Canvas/Canvas';

const MapsMain = () => {


  const [maps,setMaps] = useState();

  useEffect(()=>{

    //todo get all maps

  },[])




  return (
    <div className='d-flex  flex-column align-items-center mt-5 '>


      {/*give params in Cms*/}
     {/*<Canvas  width={200} height={100}/>*/}
     <Canvas  width={2000} height={2000} maxSideSizeInPx={400}/>


     {/*<Canvas className='mt-5'  width={400} height={400}/>*/}

     {/*<Canvas className='mt-5'  width={100} height={100}/>*/}
    </div>
  );
};

export default MapsMain;
