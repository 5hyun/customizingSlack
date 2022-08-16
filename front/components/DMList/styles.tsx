import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const CollapseRotate = keyframes`
  from {
    transform: rotate(90deg);
  }

  to {
    transform: rotate(180deg);
  }
`;

export const Header = styled.header<{ collapse: boolean }>`
  .collapseBtn {
    font-size: 100px;
    cursor: pointer;
    transform: rotate(90deg);
  }
  
`;
