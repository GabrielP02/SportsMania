import React from "react";
import { APP_ROUTES } from "../utils/constants";
import '../Styles/Adress.css'; // Importando o CSS para estilização
import Navbar from "../components/NavBar";

const Adress = () => {

    return(
<>
<Navbar />

<script async src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=Function.prototype&loading=async&libraries=maps,marker&v=beta"></script>

<div className="Adress-container">
<h1 className="titulo">Conheça nossa loja física</h1>

<div id="map_canvas" style= {{width:700, height:500}}>

<gmp-map center="-8.022706985473633,-34.91827392578125" zoom="17" map-id="DEMO_MAP_ID">
    <gmp-advanced-marker position="-8.022706985473633,-34.91827392578125" title="Nossa loja"></gmp-advanced-marker>
</gmp-map>
    
</div>

<div className="blocos-container">
<div className="bloco">
    <p>Sua loja esportiva no coração da cidade! Desfrute da conveniência e acessibilidade de nossa localização privilegiada.</p>
    </div>

    <div className="bloco">
    <h2><b>Horário de Funcionamento</b></h2>
    <p>Seg-Sex: 9h às 18h</p>
    <p>Sábado:  9h às 14h</p>
    <p>Domingo: Fechado</p>
    </div>

    <div className="bloco">
    <p>Nossa localização facilita o acesso aos recursos e serviços essenciais para uma experiência esportiva completa.</p>
    </div>
    </div>
    </div>
</>
    );
}

export default Adress;
