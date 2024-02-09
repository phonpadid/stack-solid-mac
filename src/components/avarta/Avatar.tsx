import { Avatar } from "@ark-ui/solid";
import { JSX, ParentProps, Show, onMount } from "solid-js";

import { Dynamic } from "solid-js/web";
import "./Avatar.scss";

interface AvatarType {
  imageUrl?: string;
  name: string;
  size: "bar" | "list" | "profile";
  status?: "online" | "offline";
  notification?: number;
  action?: {
    icon: (
      props: ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>>
    ) => JSX.Element;
    onAction: () => void;
  };
  class?: string;
}

export default (props: ParentProps<AvatarType>) => {
  let fallback: HTMLSpanElement | undefined;

  function convertToInitials(name: string): string {
    const nameParts = name.split(" ");

    const initials = nameParts.map((part) => part.charAt(0));

    const result = initials.join("");

    return result.toUpperCase();
  }

  onMount(() => {
    if (fallback && fallback.dataset.label) {
      const charCodeRed = fallback.dataset.label.charCodeAt(0);
      const charCodeGreen = fallback.dataset.label.charCodeAt(1) || charCodeRed;

      const red = Math.pow(charCodeRed, 7) % 200;
      const green = Math.pow(charCodeGreen, 7) % 200;
      const blue = (red + green) % 200;

      fallback.style.background = `rgb(${red}, ${green}, ${blue})`;
    }
  });

  return (
    <Avatar.Root class={props.class}>
      <Avatar.Fallback
        class={`avatar-fallback avatar-size-${props.size}`}
        data-label={convertToInitials(props.name)}
        ref={fallback}
      />
      <Avatar.Image
        class={`avatar-image avatar-size-${props.size}`}
        src={props.imageUrl}
        alt="avatar"
      />

      <Show when={props.status}>
        <span class={`avatar-status avatar-status-${props.status}`}></span>
      </Show>

      <Show when={props.notification}>
        <span class={`avatar-badges`}>{props.notification}</span>
      </Show>

      <Show when={props.action}>
        <span class={`avatar-action`} onClick={() => props.action?.onAction()}>
          <Dynamic class="avatar-action-icon" component={props.action?.icon} />
        </span>
      </Show>
    </Avatar.Root>
  );
};
