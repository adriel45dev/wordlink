import * as React from "react";
import { SVGProps } from "react";
const BackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="-4 0 20 20"
    {...props}
  >
    <title>
      {
        "navigation / 2 - navigation, arrow, chevron, direction, forward, move, left icon"
      }
    </title>
    <path
      fill="none"
      fillRule="evenodd"
      stroke="#dedede"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.001 1 1 10.002l10.001 9.002"
    />
  </svg>
);
export default BackIcon;
