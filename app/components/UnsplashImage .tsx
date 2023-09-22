"use cliente";
import { useState, useEffect } from "react";
import Image from "next/image";

const ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

interface ImageProps {
  query: string;
}

const UnsplashImage = ({ query }: ImageProps) => {
  const [imageUrl, setImageUrl] = useState("/images/card/cover-3.jpg");

  useEffect(() => {
    async function fetchImage() {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${query}&client_id=${ACCESS_KEY}`,
      );
      const data = await response.json();
      setImageUrl(data.urls.regular);
    }

    fetchImage();
  }, [query]);

  return (
    <>
      {imageUrl && (
        <Image src={imageUrl} alt={query} width={500} height={500} />
      )}
    </>
  );
};

export default UnsplashImage;
