import React from 'react';
import CircleImg from '@components/common/CircleImg';
import styled from 'styled-components';

interface UserCardItemProps {
  name: string;
  userImgUrl?: string;
  onModifyClick: () => void;
}

function UserCardItem({ name, userImgUrl, onModifyClick }: UserCardItemProps) {
  return (
    <S.UserCardItem onClick={onModifyClick}>
      <div>
        <CircleImg size={3} imgUrl={userImgUrl || ''} alt={`${name}_유저_이미지`} />
        <p>{name}</p>
      </div>
      <p>정보수정 하기 ></p>
    </S.UserCardItem>
  );
}

export default UserCardItem;

const S: {
  UserCardItem: any;
} = {
  UserCardItem: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    height: 4.8rem;

    div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      p {
        margin-left: 0.6rem;
      }
    }
  `
};
