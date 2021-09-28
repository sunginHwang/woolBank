import Input from './index';
import { ComponentProps } from 'react';

export default {
  title: 'Component/atoms/Input',
  component: Input
};

type T = ComponentProps<typeof Input>;
const Template = (args: T) => <Input {...args} />;

export const Base = Template.bind({});
//@ts-ignore
Base.args = {
  placeholder: '텍스트를 입력해주세요.'
};
