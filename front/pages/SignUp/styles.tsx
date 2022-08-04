import styled from '@emotion/styled';

export const Header = styled.header`
  text-align: center;
  margin: 50px 0;
  font-size: 50px;
  font-weight: bolder;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > button {
    width: 35%;
    min-width: 300px;
    max-width: 450px;

    padding: 15px 20px;
    margin-top: 20px;

    border: none;
    border-radius: 10px;

    background-color: #6e85b7;
    color: #ececec;
    font-size: 20px;
  }
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  font-size: 20px;
  width: 35%;
  min-width: 300px;
  max-width: 450px;

  & > span {
    margin-bottom: 10px;
  }

  & > input {
    padding: 10px 15px;
    font-size: 20px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  & > input::placeholder {
    font-size: 15px;
  }
`;

export const LinkContainer = styled.div`
  width: 35%;
  min-width: 300px;
  max-width: 450px;

  justify-content: flex-start;
  margin-top: 15px;

  & > span {
    opacity: 0.5;
  }
  & > a {
    text-decoration: none;
    color: #1263A3;
  }
`;

export const Error = styled.span`
  color: red;
  width: 35%;
  min-width: 300px;
  max-width: 450px;
`;

export const Success = styled.span`
  color: Green;
  width: 35%;
  min-width: 300px;
  max-width: 450px;
`;
