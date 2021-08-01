import React from 'react';
import styled from 'styled-components';
import CircleImg from '@components/common/CircleImg';

interface IProps {
  name: string;
  userImgUrl?: string;
  onModifyClick: () => void;
}

/**
 * 마이페이지 - 유저 카드 정보
 * @component
 */

function UserCard({ name, userImgUrl, onModifyClick }: IProps) {
  return (
    <S.UserCardItem onClick={onModifyClick}>
      <div>
        <CircleImg size={3} imgUrl={userImgUrl || ''} alt={`${name}_유저_이미지`} />
        <p>{name}</p>
      </div>
      <p>정보수정 하기 &gt;</p>
    </S.UserCardItem>
  );
}

export default UserCard;

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
