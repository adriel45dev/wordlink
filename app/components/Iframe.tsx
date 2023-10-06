import React, { useState, useEffect } from "react";

const Iframe = ({ src }: { src: string }) => {
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const iframe = document.querySelector("iframe");

    iframe!.onload = () => {
      setCarregado(true);
    };
  }, []);

  return (
    <div>
      <iframe src={src} />

      {carregado ? (
        <p>O iframe foi carregado</p>
      ) : (
        <p>O iframe ainda não foi carregado</p>
      )}
    </div>
  );
};

export default Iframe;
