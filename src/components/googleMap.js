import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useState} from "react";

function GetMap({center, width, isLoaded} ) {
    const [map, setMap] = useState(null)
    const google = window.google;

    const onLoad = useCallback(function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map)
    }, [])
  
    const onUnmount = useCallback(function callback(map) {
      setMap(null)
    }, [])
   
    return (
      <>
       {isLoaded ?<GoogleMap
          mapContainerStyle={{...containerStyle,width: width }}
          center={center}
          zoom={9}
          onLoad={onLoad}
          onUnmount={onUnmount}
        /> : <></>}
      </>
    );
  }

  const containerStyle = {
    // width: width,
    height: '400px'
  };
  
  export default GetMap;