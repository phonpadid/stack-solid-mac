import { JSX, Match, ParentProps, Switch } from "solid-js";

export interface TableBodyProps {
  isTh?: boolean;
  data: string;
  customData?: JSX.Element;
}

export default (props: ParentProps<TableBodyProps>) => {
  return (
    <>
      <Switch>
        <Match when={props.isTh}>
          <th
            scope="row"
            class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {props.customData ? props.customData : props.data}
          </th>
        </Match>
        <Match when={!props.isTh}>
          <td class="px-4 py-3">
            {props.customData ? props.customData : props.data}
          </td>
        </Match>
      </Switch>
    </>
  );
};
