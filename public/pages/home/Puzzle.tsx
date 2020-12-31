import { useEffect } from "preact/hooks";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ItemTypes } from "./type";

export default function Puzzle(props: { url: string }) {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.PUZZLE, imageUrl: props.url },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <img
      ref={drag}
      src={props.url}
      style={{
        width: 150,
        height: 150,
        boxSizing: "border-box",
        opacity: isDragging ? 0.7 : 1,
        cursor: "pointer",
        borderRadius: "4px",
        border: "4px solid salmon",
      }}
    />
  );
}
