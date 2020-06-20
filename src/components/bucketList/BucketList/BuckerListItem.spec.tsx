import React from 'react';
import BucketListItem from './BucketListItem';
import withThemeRender from '../../../support/test/withThemeRender';
import { IBucketList } from '../../../models/IBucketList';

describe('<BucketListItem />', () => {
  const setup = () => {
    const bucketList: IBucketList = {
      title: '버킷리스트',
      percent: 84
    };
    const utils = withThemeRender(<BucketListItem bucketList={bucketList}/>);
    return {
      ...utils
    };
  };

  it('is exist render title', () => {
    const { getByText } = setup();
    expect(getByText('버킷리스트').textContent).toBe('버킷리스트');
  });

  it('is exist render percent', () => {
    const { getByText } = setup();
    expect(getByText('84% 달성').textContent).toBe('84% 달성');
  });
});
