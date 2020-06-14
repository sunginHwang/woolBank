import React from 'react'
import { render } from '@testing-library/react'
import Test from './Test'

describe('<Test />', () => {
  it('test for render', () => {
    const { getByText } = render(<Test />)
    const pTag = getByText('테스트 값')
    expect(pTag.textContent).toBe('테스트 값')
  })
})
