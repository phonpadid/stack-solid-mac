import { JSX, ParentProps } from "solid-js";
export default (props: ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="2"
        d="M6 12h0m6 0h0m6 0h0"
      />
    </svg>
  );
};
