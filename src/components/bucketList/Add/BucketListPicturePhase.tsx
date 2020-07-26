import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import PhaseTemplate from '../../common/PhaseTemplate';
import IcoCamera from '../../icon/IcoCamera';
import colors from '../../../style/colors';
import IcoCloseCircle from '../../icon/IcoCloseCircle';
import IcoImage from '../../icon/IcoImage';

function BucketListPicturePhase() {
  const [file1, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files && e.target.files[0];

    reader.onloadend = () => {
      file && setFile(file);
      setPreviewUrl(String(reader.result));
    }
    file && reader.readAsDataURL(file);
  };
  const inputAlbumRef = useRef<HTMLInputElement>(null);
  const inputCameraRef = useRef<HTMLInputElement>(null);

  const onInitPicture = () => {
    setFile(null);
    setPreviewUrl('');
    if (inputAlbumRef && inputAlbumRef.current) {
      inputAlbumRef.current.value = '';
    }

    if (inputCameraRef && inputCameraRef.current) {
      inputCameraRef.current.value = '';
    }
  }

  const onPictureClick = () => {
    inputCameraRef.current && inputCameraRef.current.click();
  }

  const onAlbumClick = () => {
    inputAlbumRef.current && inputAlbumRef.current.click();
  }

  return (
    <PhaseTemplate
      title='목표일 설정'
      active
      onBackClick={() => console.log('back')}
    >
      <div style={{ marginTop: '2rem', display: 'flex' }}>
        <S.Picture>
          <div onClick={onPictureClick}>
            <IcoCamera width={40} height={40} fill={colors.colors.navyD1} />
          </div>
          <input
            type='file'
            ref={inputCameraRef}
            onChange={onChangePicture}
            accept='image/*'
            capture='camera'
          />
        </S.Picture>
        <S.Picture>
          <div onClick={onAlbumClick}>
            <IcoImage width={40} height={40} fill={colors.colors.navyD1} />
          </div>
          <input
            ref={inputAlbumRef}
            type='file'
            onChange={onChangePicture}
            accept='image/gif, image/jpeg, image/png, image/jpg'
          />
        </S.Picture>
      </div>
      {
        previewUrl !== '' && (
          <S.PrevPicture>
            <img src={previewUrl} />
            <S.PrevPictureDeemed>
              <i onClick={onInitPicture}>
                <IcoCloseCircle width={30} height={30} fill={colors.colors.navyD1} />
              </i>
            </S.PrevPictureDeemed>
          </S.PrevPicture>
        )
      }
    </PhaseTemplate>
  );
}

const S: {
  Picture: any;
  PrevPicture: any;
  PrevPictureDeemed: any;
} = {
  Picture: styled.div`
    
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.white};
    
    > div{
      border: 0.1rem solid ${(props) => props.theme.colors.navyD1};
      padding: 1rem .5rem;
      width: 7rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: .8rem;
      margin-right: 1rem;
    }
    input{
      display: none;
    }
  `,
  PrevPicture: styled.div`
    margin-top: 2rem;
    position: relative;
    > img{
      width: 100%;
      height: auto;
    }
  `,
  PrevPictureDeemed: styled.div`
    position: absolute;
    top: .5rem;
    right: .5rem;
  `
};

export default BucketListPicturePhase;
