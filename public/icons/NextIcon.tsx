import * as React from "react";
import { SVGProps } from "react";
const NextIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="-4 0 20 20"
    {...props}
  >
    <title>
      {
        "navigation / 1 - navigation, arrow, chevron, direction, forward, move, right icon"
      }
    </title>
    <path
      fill="none"
      fillRule="evenodd"
      stroke="#dedede"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1 1 10.001 9.002L1 19.004"
    />
  </svg>
);
export default NextIcon;
