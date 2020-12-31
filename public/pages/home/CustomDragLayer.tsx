import { useDragLayer } from "react-dnd";

import { ItemTypes } from "./type";

function getItemStyles(initialOffset, currentOffset): React.CSSProperties {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }
  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export const CustomDragLayer = (props) => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));
  function renderItem() {
    switch (itemType) {
      case ItemTypes.PUZZLE:
        return (
          <img
            style={{ width: 150, height: 150, background: "aliceblue" }}
            src={item.imageUrl}
          />
        );
      default:
        return null;
    }
  }
  if (!isDragging) {
    return null;
  }
  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 100,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        willChange: "transform",
      }}
    >
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  );
};
