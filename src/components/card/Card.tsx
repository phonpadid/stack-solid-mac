import { JSX, ParentProps } from "solid-js";
import "./Card.scss";

export default (props: ParentProps<JSX.HTMLAttributes<HTMLElement>>) => {
  return (
    <section {...props} class={`card ${props.class}`}>
      {props.children}
    </section>
  );
};
