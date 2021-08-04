import styled from 'styled-components';

const DepositListWrapper = styled.div`
    margin-top: .5rem;
    padding: 2rem 2rem 10rem 2rem;
    background-color: ${({ theme }) => theme.colors.white};
    >p {
      font-size: 2.2rem;
      color: ${({ theme }) => theme.colors.blackL1};
      font-weight: bold;
    }
  `;

export default DepositListWrapper;
