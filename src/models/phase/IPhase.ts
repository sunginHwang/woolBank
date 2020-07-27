export interface IPhase {
  isActivePhase: boolean;
  goNextPhase?: () => void;
  goPrevPhase: () => void;
}
