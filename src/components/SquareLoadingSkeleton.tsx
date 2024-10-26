import React from "react";

const SquareLoadingSkeleton = ({
  count,
  size,
}: {
  count: number;
  size: number;
}) => {
  const skeletonStyle: React.CSSProperties = {
    width: size,
    height: size,
    backgroundColor: "#e0e0e0", // You can change the background color as needed
    borderRadius: "4px", // You can adjust the border radius to change the shape
    margin: "0.5rem", // Add margin between each square
  };

  const skeletons: JSX.Element[] = [];

  for (let i = 0; i < count; i++) {
    skeletons.push(<div key={i} style={skeletonStyle}></div>);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {skeletons}
    </div>
  );
};

export default SquareLoadingSkeleton;
