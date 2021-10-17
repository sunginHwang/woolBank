import { ComponentProps } from 'react';
import styled from 'styled-components';
import { Meta, Story } from '@storybook/react';

import Image from './index';
import bmoPng from './storybookImg/bmo.png';
import bmoWebp from './storybookImg/bmo.webp';

const meta: Meta = {
  title: 'Component/atoms/Image',
  component: Image
};
export default meta;

type T = ComponentProps<typeof Image>;
const Template: Story<T> = (args) => <Image {...args} />;

export const Base: Story<T> = Template.bind({});

Base.args = {
  src: bmoPng,
  webpSrc: bmoWebp
};

export const DiffFallbackImg: Story<T> = Template.bind({});

DiffFallbackImg.args = {
  src: 'https://cdn-images.farfetch-contents.com/16/78/05/21/16780521_36226882_480.jpg',
  webpSrc: bmoWebp,
  alt: 'webp 지원 테스트 입니다.'
};

const StyledTemplate: Story<T> = () => (
  <StyledImg src='https://cdn-images.farfetch-contents.com/16/78/05/21/16780521_36226882_480.jpg' webpSrc={bmoWebp} />
);

const StyledImg = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 8px;
`;

export const ImageWithStyle: Story<T> = StyledTemplate.bind({});
