type SaveRegularForm = {
  title: string;
  regularDate: number;
  amount: number;
  useAutoExpenditure: boolean;
  expenditureType: string;
};

interface ISaveRegularExpenditure {
  openModalName: string;
  form: SaveRegularForm;
}

type Action =
  | { type: 'SET_SAVE_FORM'; payload: { type: string; value: string | number | boolean } }
  | { type: 'CLOSE_MODAL' }
  | { type: 'OPEN_MODAL'; payload: string }
  | { type: 'RESET_SAVE_FORM'; payload: string };

function reducer(state: ISaveRegularExpenditure, action: Action): ISaveRegularExpenditure {
  switch (action.type) {
    case 'SET_SAVE_FORM': {
      const form = Object.assign(state.form, { [action.payload.type]: action.payload.value });
      return { ...state, form };
    }
    case 'RESET_SAVE_FORM': {
      const isNumberInit = action.payload === 'regularDate' || action.payload === 'amount';
      const resetValue = isNumberInit ? 0 : '';
      const form = Object.assign(state.form, { [action.payload]: resetValue });
      return { ...state, form };
    }
    case 'CLOSE_MODAL': {
      return { ...state, openModalName: '' };
    }
    case 'OPEN_MODAL': {
      return { ...state, openModalName: action.payload };
    }
    default:
      throw new Error('Unhandled action');
  }
}

export const initialState: ISaveRegularExpenditure = {
  openModalName: '',
  form: {
    title: '',
    regularDate: 0,
    amount: 0,
    useAutoExpenditure: false,
    expenditureType: ''
  }
};

export default reducer;
