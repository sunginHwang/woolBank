import { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import Button from './Button';

const meta: Meta = {
  title: 'Component/atoms/Button',
  component: Button
};
export default meta;

type T = ComponentProps<typeof Button>;
const Template: Story<T> = (args) => <Button {...args} />;

export const Base: Story<T> = Template.bind({});

Base.args = {
  message: '버튼',
  color: 'red',
  size: 'medium'
};
