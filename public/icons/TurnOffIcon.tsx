import * as React from "react";
import { SVGProps } from "react";
const TurnOffIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M18.364 5.364a9.212 9.212 0 0 1 2.463 4.69 9.31 9.31 0 0 1-.512 5.292A9.127 9.127 0 0 1 17 19.456 8.89 8.89 0 0 1 12 21a8.89 8.89 0 0 1-5-1.544 9.127 9.127 0 0 1-3.315-4.11 9.31 9.31 0 0 1-.512-5.292 9.21 9.21 0 0 1 2.463-4.69"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M12 3v4.727"
    />
  </svg>
);
export default TurnOffIcon;
