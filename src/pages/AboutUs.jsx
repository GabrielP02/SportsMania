import React, { useState } from 'react';
import '../Styles/AboutUs.css'; // Importando o CSS para estilização

const AboutUs = () => {
    const [activeIndex, setActiveIndex] = useState(null); // Estado para controlar qual bloco está ativo

    const toggleBlock = (index) => {
        setActiveIndex(activeIndex === index ? null : index); // Alterna a exibição do bloco
    };

    return (
        <div className="sobre-nos-container">
            <h1 className="titulo">SportsMania</h1>
            <div className="blocos-container">
                <div className="bloco">
                    <h2><b>Quem Somos</b></h2>
                    <p>
                        A SportsMania é uma plataforma dedicada a todos os amantes de esportes. 
                        Nossa missão é conectar pessoas através do esporte, oferecendo conteúdo 
                        relevante, dicas e uma comunidade vibrante para compartilhar experiências.
                    </p>
                </div>
                <div className="bloco">
                    <h2><b>Nossa Visão</b></h2>
                    <p>
                        Acreditamos que o esporte tem o poder de transformar vidas. 
                        Nossa visão é ser a principal fonte de informação e inspiração 
                        para atletas e entusiastas, promovendo um estilo de vida ativo e saudável.
                    </p>
                </div>
            </div>

            <div className="DuvidasContainer">
                <h1 className="duvidas-titulo">Dúvidas Frequentes</h1>
                <div className="duvidas-blocos">
                    {['Quais tipos de produtos esportivos vocês vendem?', 'Como faço para saber o tamanho certo do produto?',
                     'Vocês oferecem garantia nos produtos?', 'Pergunta 4'].map((pergunta, index) => (
                        <div key={index} className="duvida-bloco" onClick={() => toggleBlock(index)}>
                            <h2>{pergunta}</h2>
                            {activeIndex === index && (
                                <p className="resposta">
                                    Esta é a resposta para {pergunta}. Aqui você pode adicionar mais informações relevantes.
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;