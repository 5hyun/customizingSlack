import styled from '@emotion/styled';

export const Header = styled.div`
  background-color: white;

  display: flex;
  justify-content: space-between;
  padding: 15px 15px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-weight: 600;

  .status-bar__left {
    display: flex;
    align-items: center;
  }

  .status-bar__right {
    display: flex;
    align-items: center;

    & > span {
      margin-right: 5px;
    }
  }

  .user-plus {
    cursor: pointer;
    padding: 10px;
  }
  .user-plus:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const Content = styled.div`
  overflow: auto;
  position: relative;
  height: 91%;
`;

export const InviteModal = styled.div`
  position: absolute;
  top: 30vh;
  left: 35vw;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 30px 30px;

  background-color: #f8f8f8;

  & > form > button {
    padding: 10px 162px;

    font-size: 16px;
    font-weight: 600;
    color: white;
    background-color: #6f84b7;
    border: none;
    border-radius: 5px;

    cursor: pointer;
  }

  & > form > span {
    position: absolute;
    top: 10px;
    right: 15px;

    cursor: pointer;

    font-size: 18px;
  }
`;

export const Chat = styled.div`
  overflow-y: auto;
  min-height: 71vh;
  max-height: 71vh;
`;
