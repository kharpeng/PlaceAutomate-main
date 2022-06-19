import "./App.css";
import React, { useEffect , useState} from "react";
import SearchLocationInput from "./components/input";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import GetMap from "./components/googleMap";
import { useJsApiLoader } from '@react-google-maps/api';

const { width } = window;

function App() {
  const searchHistory = useSelector((state) => state.searchHistory);
  const google = window.google;
 
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "place", headerName: "Place", width: 200 },
  ];
  let places = searchHistory.name ? searchHistory.name : null;
  let placeArr = places.map((place, index) => {
    return { id: index + 1, place: place };
  });
  const [center, setCenter] = useState({
    lat: 3.1390,
    lng: 101.6869
  });
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyB3nePOgUwmm6hSeKssu-6SERpOl8oR70g"
  })

  useEffect(() => {
     if(searchHistory.places.length>0){
    let loc = searchHistory.places[searchHistory.places.length-1].geometry.location;
    setCenter({
      lat: loc.lat(),
      lng: loc.lng()
    })
  }
  }, [searchHistory]);


  return (
    <div className="app">
      {/* <SearchLocationInput /> */}
      {isLoaded ? <SearchLocationInput /> : <></>}
      <div style={{ height: 400, width: width }}>
        <DataGrid
          rows={placeArr}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
        <GetMap center={center} width={width} isLoaded={isLoaded}/>
 
      </div>
    </div>
  );
}



 


export default App;
