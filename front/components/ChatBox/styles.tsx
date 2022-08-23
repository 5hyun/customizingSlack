import styled from '@emotion/styled';
import { MentionsInput } from 'react-mentions';

export const Form = styled.form`
  border: 1px solid;
  border-radius: 5px;

  width: 90%;
  margin: 0 auto;
`;

export const MentionsTextarea = styled(MentionsInput)`
  padding: 10px 0;

  width: 100%;
  font-size: 18px;

  //& strong {
  //  background: skyblue;
  //}
  & textarea {
    height: 44px;
    padding: 9px 10px !important;
    outline: none !important;
    resize: none !important;
    line-height: 22px;
    border: none;
  }
  border-radius: 5px 5px 0 0;

  & ul {
    border: 1px solid lightgray;
    max-height: 200px;
    overflow-y: auto;
    padding: 9px 10px;
    background: white;
    border-radius: 4px;
    width: 150px;
  }
`;

export const Button = styled.button<{ show: boolean }>`
  width: 100%;
  background-color: #f8f8f8;
  padding: 7px 0;

  display: flex;
  justify-content: flex-end;

  border-radius: 0 0 5px 5px;

  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  position: relative;

  .chatBtn {
    margin-right: 20px;
    color: rgba(0, 0, 0, 0.2);
    font-size: 18px;
    padding: 5px 7px;
    border-radius: 5px;

    ${({ show }) =>
      show &&
      `
      color: white;
      background-color: green;
      cursor: pointer;

  `};
  }
`;

export const EachMention = styled.button<{ focus: boolean }>`
  padding: 4px 20px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  color: rgb(28, 29, 28);
  width: 100%;
  & img {
    margin-right: 5px;
  }
  //css에서도 변수를 쓸 수 있다.
  //emotion에서는 focus가 true이면 밑에 속성을 추가적으로 해준다.
  ${({ focus }) =>
    focus &&
    `
    background: #1264a3;
    color: white;
  `};
`;
