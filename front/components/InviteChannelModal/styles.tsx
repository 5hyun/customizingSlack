import styled from '@emotion/styled';

export const Form = styled.form`
  position: absolute;
  top: 30vh;
  left: 30vw;

  background-color: #f8f8f8;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 20px 30px;

  & > button {
    padding: 10px 162px;

    font-size: 16px;
    font-weight: 600;
    color: white;
    background-color: #6f84b7;
    border: none;
    border-radius: 5px;

    cursor: pointer;
  }

  & > span {
    position: absolute;
    top: 10px;
    right: 15px;

    cursor: pointer;

    font-size: 18px;
  }
`;
