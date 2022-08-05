import styled from '@emotion/styled';

export const Header = styled.header`
  background-color: #00bcd4;
  opacity: 0.9;
  height: 38px;
  border-bottom: 0.6px solid white;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  position: relative;
  z-index: 2;

  & > button {
    margin-right: 13px;
    border: none;
    cursor: pointer;
  }
`;

export const ProfileModal = styled.div`
  position: absolute;
  top: 38px;
  box-shadow: 3px 3px 10px black;

  width: 360px;
  height: 120px;
  border-radius: 5px;
  background-color: white;

  .user-info {
    height: 70%;
    border-radius: 5px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user-info__left {
    display: flex;
    margin-left: 20px;
  }

  .user-info__left-detail {
    display: flex;
    flex-direction: column;
    margin-left: 8px;

    & > span:first-child {
      font-size: 18px;
    }
    & > span:last-child {
      font-size: 15px;
      opacity: 0.7;
    }
  }

  .user-info__right {
    margin-right: 15px;
    margin-bottom: 20px;

    & > button {
      font-size: 25px;
      border: none;
      background-color: white;
      cursor: pointer;
    }
  }

  .user-logout {
    border-top: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;

    height: 30%;
    border-radius: 0 0 5px 5px;

    cursor: pointer;

    & > button {
      font-size: 15px;
      border: none;
      background-color: white;
      cursor: pointer;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const WorkspaceSelctor = styled.div`
  background-color: #00bcd4;
  opacity: 0.6;
  width: 60px;

  border-right: 0.6px solid white;
`;

export const ChannelSelctor = styled.div`
  background-color: #00bcd4;
  opacity: 0.6;
  width: 260px;
`;

export const Message = styled.div``;
