import React from "react";

const Sobre = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="max-w-4xl mx-[5%] flex-grow">
        {/* Banner Carrossel */}
        <div className="w-full bg-gray-200 h-40 flex items-center justify-center text-black font-bold text-lg">
          banner carrossel automático
        </div>
        
        {/* Seção Sobre */}
        <div className="mt-8 flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <h2 className="text-xl font-bold">SportsMania</h2>
            <p className="mt-2 text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type
              specimen book.
            </p>
          </div>
          <div className="md:w-1/2">
            <p className="mt-2 text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type
              specimen book.
            </p>
          </div>
        </div>
        
        {/* Dúvidas Frequentes */}
        <div className="mt-8">
          <h2 className="text-xl font-bold">Dúvidas Frequentes</h2>
          <div className="mt-4 flex flex-col gap-2">
            {[
              "Quais tipos de produtos esportivos vocês vendem?",
              "Como faço para saber o tamanho certo do produto?",
              "Vocês oferecem garantia nos produtos?",
              "Vocês oferecem garantia nos produtos?"
            ].map((question, index) => (
              <details key={index} className="bg-yellow-400 p-2 rounded cursor-pointer max-w-lg mx-auto">
                <summary className="font-semibold">{question}</summary>
              </details>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sobre;
