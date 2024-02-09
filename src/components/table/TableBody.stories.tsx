import { Meta, StoryObj } from "storybook-solidjs";
import TableBody from "./TableBody";

const meta = {
  title: "Example/Table/TableBody",
  component: TableBody,
  tags: ["autodocs"],
} satisfies Meta<typeof TableBody>;

export default meta;

type Story = StoryObj<typeof meta>;

// export const Default: Story = {
//   render: () => {
//     const data: TableBodyProps[] = [{isTh: true, data: }];

//     return <TableBody></TableBody>;
//   },
// };
