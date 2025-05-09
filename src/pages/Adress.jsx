import React from "react";
import { APP_ROUTES } from "../utils/constants";
import Navbar from "../components/NavBar";

const Adress = () => {

    return(
<>
<Navbar />

<script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCrddWCojVRtJkn1RCAaHX6NpCAgffB4ks&callback=Function.prototype&loading=async&libraries=maps,marker&v=beta"></script>

<div class="Adress-container" className="p-20">
<h1 className="titulo">Conheça nossa loja física</h1>

<div id="map_canvas" style= {{width:700, height:500}}className="m-auto p-5">

<gmp-map center="-8.022706985473633,-34.91827392578125" zoom="17" map-id="DEMO_MAP_ID">
    <gmp-advanced-marker position="-8.022706985473633,-34.91827392578125" title="Nossa loja"></gmp-advanced-marker>
</gmp-map>
    
</div>

<div className="flex justify-center bg-amber-300 p-5 mx-100">
  <div className="flex flex-col md:flex-row justify-center items-start gap-8 max-w-6xl w-full">
    <div className="p-5 text-lg md:w-1/3 w-full">
      <p>Sua loja esportiva no coração da cidade! Desfrute da conveniência e acessibilidade de nossa localização privilegiada.</p>
    </div>

    <div className="p-5 text-lg md:w-1/3 w-full">
      <p><b>Horário de Funcionamento</b></p>
      <p>Seg-Sex: 9h às 18h</p>
      <p>Sábado:  9h às 14h</p>
      <p>Domingo: Fechado</p>
    </div>

    <div className="p-5 text-lg md:w-1/3 w-full">
      <p>Nossa localização facilita o acesso aos recursos e serviços essenciais para uma experiência esportiva completa.</p>
    </div>
  </div>
</div>

</div>
</>
    );
}

export default Adress;
