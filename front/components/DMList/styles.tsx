import styled from '@emotion/styled';

export const Header = styled.header`
  display: flex;
  align-items: center;

  margin-left: 10px;
  color: white;
  cursor: pointer;

  .collapseBtn {
    font-size: 26px;
    transform: rotate(90deg);

    margin-right: 5px;
  }

  .collapseClick {
    transform: rotate(180deg);
  }

  & > span {
    font-size: 22px;
  }
`;

