import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { saveData } from "../actions/setData";


let autoComplete;

function handleScriptLoad(updateQuery, autoCompleteRef, dispatch) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    {}
  );
  autoComplete.setFields(["address_components", "formatted_address", "geometry"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery, dispatch)
  );
}
async function handlePlaceSelect(updateQuery, dispatch) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  dispatch(
    saveData({ name: addressObject.formatted_address, places: addressObject })
  );
}

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};
function SearchLocationInput() {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=APIKEY&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef, dispatch)
    );
  }, []);
 
  return (
    <>
      <label>
        Place:
        <input
          ref={autoCompleteRef}
          onChange={(event) => setQuery(event.target.value)}
          value={query}
        />
      </label>

    </>
  );
}

export default SearchLocationInput;
