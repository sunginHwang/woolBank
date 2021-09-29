import { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import Input from './index';

const meta: Meta = {
  title: 'Component/atoms/Input',
  component: Input
};
export default meta;

type T = ComponentProps<typeof Input>;
const Template: Story<T> = (args) => <Input {...args} />;

export const Base: Story<T> = Template.bind({});

Base.args = {
  placeholder: '텍스트를 입력해주세요.'
};

export const InputValue: Story<T> = Template.bind({});

InputValue.args = {
  value: 'exist inner value'
};

export const withLabel: Story<T> = Template.bind({});

withLabel.args = {
  label: '레이블',
  value: 'exist inner value'
};

export const withCloseBtn: Story<T> = Template.bind({});

withCloseBtn.args = {
  isShowCloseBtn: true,
  value: 'exist inner value'
};

export const withLabelAndCloseBtn: Story<T> = Template.bind({});

withLabelAndCloseBtn.args = {
  label: '레이블',
  isShowCloseBtn: true,
  value: 'exist inner value'
};
