import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

// CustomTooltip component
const CustomTooltip = ({
  title,
  children,
  onClick,
  placement = "top",
  offsetX = 0,
  offsetY = -16,
}) => {
  return (
    <Tooltip
      title={title}
      placement={placement}
      PopperProps={{
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [offsetX, offsetY],
            },
          },
        ],
      }}
    >
      <span>
        {" "}
        {/* Wrap IconButton with a span to prevent button inside button HTML structure */}
        <IconButton aria-label={title.toLowerCase()} onClick={onClick}>
          {children}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default CustomTooltip;
