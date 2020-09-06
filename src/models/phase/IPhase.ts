export interface IPhase {
  maxPhase?: number;
  isActivePhase: boolean;
  goNextPhase?: () => void;
  goPrevPhase: () => void;
}
