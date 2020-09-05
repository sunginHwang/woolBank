import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import PhaseTemplate from '../../common/PhaseTemplate';
import IcoCamera from '../../icon/IcoCamera';
import colors from '../../../style/colors';
import IcoImage from '../../icon/IcoImage';
import BottomButton from '../../common/BottomButton';
import { IPhase } from '../../../models/phase/IPhase';
import LabelText from '../../common/LabelText';
import BucketListPrevImage from './BucketListPrevImage';
import ImageCrop from '../../common/ImageCrop';
import { dataURLtoFile, getExtensionByDataURL, resizeImage } from '../../../support/util/file';
import { useToggle } from '../../../support/hooks/useToggle';
import { parseDate } from '../../../support/util/date';

interface BucketListPicturePhaseProps extends IPhase {
  mainImgFile: File | null;
  onCompletePhaseThree: (mainImgFIle: File) => void;
}

function BucketListPicturePhase({
  mainImgFile,
  isActivePhase,
  onCompletePhaseThree,
  goPrevPhase,
  goNextPhase
}: BucketListPicturePhaseProps) {
  const [file, setFile] = useState<File | null>(mainImgFile);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [useCrop, onCrop, offCrop] = useToggle(false);

  const inputAlbumRef = useRef<HTMLInputElement>(null);
  const inputCameraRef = useRef<HTMLInputElement>(null);

  /**
   * 이미지 변경 이벤트
   */
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const uploadFile = e.target.files && e.target.files[0];
    // 사진 파일 저장 및 미리보기(크롭포함) 랜더링
    reader.onloadend = () => {
      onCrop();
      setPreviewUrl(String(reader.result));
    };
    uploadFile && reader.readAsDataURL(uploadFile);
  };

  /**
   * 이미지 입력 초기화
   */
  const onInitImage = () => {
    setFile(null);
    setPreviewUrl('');
    if (inputAlbumRef && inputAlbumRef.current) {
      inputAlbumRef.current.value = '';
    }

    if (inputCameraRef && inputCameraRef.current) {
      inputCameraRef.current.value = '';
    }
  };

  /**
   * 사진 촬영 클릭
   */
  const onPictureClick = () => {
    if (inputCameraRef.current) {
      onInitImage();
      inputCameraRef.current.click();
    }
  };

  /**
   * 앨범 선택 클릭
   */
  const onAlbumClick = () => {
    if (inputAlbumRef.current) {
      onInitImage();
      inputAlbumRef.current.click();
    }
  };

  /**
   * 다음 페이즈 이동
   */
  const onNextPhaseClick = () => {
    file && onCompletePhaseThree(file);
    goNextPhase && goNextPhase();
  };

  /**
   * 이미지 영역 크롭
   */
  const onImageCrop = async (cropUrl: string) => {
    const fileName = `${parseDate(new Date())}_${Math.random() * Math.random()}.${getExtensionByDataURL(cropUrl)}`;
    const originImage = dataURLtoFile(cropUrl, fileName);

    const resizeImageDataUrl = await resizeImage(originImage, 720, 600);

    offCrop();
    // resize 된 이미지 preview로 다시 전환
    setPreviewUrl(resizeImageDataUrl);
    setFile(dataURLtoFile(resizeImageDataUrl, fileName));
  };

  const showPrevImage = !useCrop && previewUrl.length > 0;

  return (
    <PhaseTemplate useScroll title='이미지 설정' rightMessage='3/4' active={isActivePhase} onBackClick={goPrevPhase}>
      <S.BucketListPicturePhase>
        <LabelText>
          이루고 싶은 목표가 연상되는 <br />
          사진을 넣어보세요.
        </LabelText>
        <S.SubLabel>
          눈으로 보는 목표야 말로 가장 큰 원동력이 될 수 있습니다.
          <br /> 목표를 이루어 지는 멋진 이미지를 상상해 보세요.
        </S.SubLabel>
        <S.ImgWrapper>
          <S.Img>
            <div onClick={onPictureClick}>
              <IcoCamera width={40} height={40} fill={colors.colors.navyD1} />
            </div>
            <input type='file' ref={inputCameraRef} onChange={onChangeImage} accept='image/*' capture='camera' />
          </S.Img>
          <S.Img>
            <div onClick={onAlbumClick}>
              <IcoImage width={40} height={40} fill={colors.colors.navyD1} />
            </div>
            <input
              ref={inputAlbumRef}
              type='file'
              onChange={onChangeImage}
              accept='image/gif, image/jpeg, image/png, image/jpg'
            />
          </S.Img>
        </S.ImgWrapper>
      </S.BucketListPicturePhase>
      {useCrop && <ImageCrop onCrop={onImageCrop} url={previewUrl} onBackClick={offCrop} />}
      {showPrevImage && <BucketListPrevImage previewUrl={previewUrl} onInitClick={onInitImage} />}
      <BottomButton message='다음단계' isShow={isActivePhase} onClick={onNextPhaseClick} />
    </PhaseTemplate>
  );
}

const S: {
  BucketListPicturePhase: any;
  ImgWrapper: any;
  SubLabel: any;
  Img: any;
} = {
  BucketListPicturePhase: styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
  `,
  ImgWrapper: styled.div`
    display: flex;
  `,
  SubLabel: styled.p`
    font-size: 1.2rem;
    margin: -1rem 0 2.5rem 0;
    color: ${(props) => props.theme.colors.greyD2};
  `,
  Img: styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.white};

    > div {
      border: 0.1rem solid ${(props) => props.theme.colors.navyD1};
      padding: 1rem 0.5rem;
      width: 7rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.8rem;
      margin-right: 1rem;
    }

    > input {
      display: none;
    }
  `
};

export default React.memo(BucketListPicturePhase);
