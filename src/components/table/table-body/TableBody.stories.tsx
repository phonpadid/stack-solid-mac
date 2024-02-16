import { For } from "solid-js";
import { Meta, StoryObj } from "storybook-solidjs";
import TableBody from "../table-body/TableBody";

const meta = {
  title: "Example/Table/TableBody",
  component: TableBody,
  tags: ["autodocs"],
} satisfies Meta<typeof TableBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const data = [
      {
        name: "Apple iMac",
      },
      {
        name: "Apple iPhone 14",
      },
    ];

    return (
      <For each={data}>
        {(data) => (
          <tr class="table-tbody">
            <TableBody data={data.name} />
          </tr>
        )}
      </For>
    );
  },
};

export const Custom: Story = {
  render: () => {
    const data = [
      {
        name: <span class="text-primary-500">Apple iMac</span>,
      },
      {
        name: <span class="text-primary-500 text-sm">Apple iPhone 14</span>,
      },
    ];

    return (
      <For each={data}>
        {(data) => (
          <tr class="table-tbody">
            <TableBody data={data.name} />
          </tr>
        )}
      </For>
    );
  },
};
