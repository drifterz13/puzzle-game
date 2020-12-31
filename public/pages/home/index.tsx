import { useEffect, useState } from "preact/hooks";
import unicornPNG from "./unicorn.png";

import Box from "./Box";
import Puzzle from "./Puzzle";
import { CustomDragLayer } from "./CustomDragLayer";

function shuffle(items: any[]) {
  const result = [];
  let map = {};
  for (let i = 0; i < items.length; i++) {
    map[i] = false;
  }

  const getRandomNumber = () => {
    const rand = Math.floor(Math.random() * items.length);
    if (map[rand]) {
      return getRandomNumber();
    }
    return rand;
  };

  for (let i = 0; i < items.length; i++) {
    const n = getRandomNumber();
    map = { ...map, [n]: true };
    result.push(items[n]);
  }

  return result;
}

export default function Home(props: any) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const resolution = 600;
    const image = new Image();
    image.src = unicornPNG;
    image.width = resolution;
    image.height = resolution;

    image.onload = function () {
      const totalCols = 4;
      const totalRows = 4;
      const imagePieces = [];
      for (let y = 0; y < totalCols; y++) {
        for (let x = 0; x < totalRows; x++) {
          const widthOfOnePiece = resolution / totalCols;
          const heightOfOnePiece = resolution / totalCols;

          const canvas = document.createElement("canvas");
          canvas.width = widthOfOnePiece;
          canvas.height = heightOfOnePiece;
          const context = canvas.getContext("2d");

          context.drawImage(
            image,
            x * widthOfOnePiece,
            y * heightOfOnePiece,
            widthOfOnePiece,
            heightOfOnePiece,
            0,
            0,
            canvas.width,
            canvas.height
          );
          imagePieces.push(canvas.toDataURL());
        }
      }
      setImages(shuffle(imagePieces));
    };
  }, []);

  return (
    <div>
      <CustomDragLayer />
      <h1>Puzzle game 🧩.</h1>
      <div
        style={{
          display: "grid",
          gridTemplate: "repeat(4, 150px) / repeat(4, 150px)",
          gap: "1em",
          marginBottom: 15,
        }}
      >
        {[...Array(16).keys()].map(() => (
          <Box />
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplate: "150px 150px / repeat(5, 150px)",
          gap: "0.5em",
        }}
      >
        {images.map((imageUrl) => (
          <Puzzle url={imageUrl} />
        ))}
      </div>
    </div>
  );
}
