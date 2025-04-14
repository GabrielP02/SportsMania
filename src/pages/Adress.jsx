import React from "react";
import { APP_ROUTES } from "../utils/constants";
import Navbar from "../components/NavBar";

const Adress = () => {

    return(
<>
<Navbar />
<h1>Endereços</h1>

    <script async src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=Function.prototype&loading=async&libraries=maps,marker&v=beta">
    </script>
    <div id="map_canvas" style= {{width:500, height:300}}>
    <gmp-map center="-8.022706985473633,-34.91827392578125" zoom="17" map-id="DEMO_MAP_ID">
    <gmp-advanced-marker position="-8.022706985473633,-34.91827392578125" title="Nossa loja"></gmp-advanced-marker>
</gmp-map>
    </div>

</>
    );
}

export default Adress;
