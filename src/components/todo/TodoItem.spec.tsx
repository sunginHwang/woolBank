import React from 'react';
import { render } from '@testing-library/react';
import TodoItem from './TodoItem';

describe('<TodoItem />', () => {
  it('only title props render', () => {
    const title = '제목';
    const { getByText, container } = render(<TodoItem title={title} />);
    const titleTag = getByText(title);
    const contentTag = container.querySelector('p');
    expect(titleTag.textContent).toBe(title);
    expect(contentTag?.innerHTML).toBe('');
  });

  it('render all props', () => {
    const title = '제목';
    const content = '콘텐츠';
    const { getByText } = render(<TodoItem title={title} content={content} />);
    const titleTag = getByText(title);
    const contentTag = getByText(content);
    expect(titleTag.textContent).toBe(title);
    expect(contentTag.textContent).toBe(content);
  });
});
