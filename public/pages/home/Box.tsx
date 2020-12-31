import { useState } from "preact/hooks";
import { useDrop } from "react-dnd";
import { ItemTypes, PuzzleType } from "./type";

export default function Box() {
  const [imageUrl, setImageUrl] = useState("");
  const [collectedProps, drop] = useDrop({
    accept: ItemTypes.PUZZLE,
    drop: (item: PuzzleType) => {
      console.log("DROP! item: ", item);
      if (imageUrl) {
        return;
      }
      setImageUrl(item.imageUrl);
    },
    collect: (monitor) => ({
      hover: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        border: "4px solid",
        borderRadius: "4px",
        width: 150,
        height: 150,
        backgroundColor: collectedProps.hover ? "#e1e1dd" : "white",
        backgroundImage: imageUrl ? `url(${imageUrl})` : `none`,
      }}
    />
  );
}
