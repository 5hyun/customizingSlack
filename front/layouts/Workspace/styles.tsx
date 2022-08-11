import styled from '@emotion/styled';

export const Header = styled.header`
  background-color: #00bcd4;
  opacity: 0.9;
  height: 38px;
  border-bottom: 0.6px solid white;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > button {
    margin-right: 13px;
    border: none;
    cursor: pointer;
  }
`;

export const ProfileModal = styled.div`
  position: absolute;
  top: 38px;
  right: 0;
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

    .user-info__left-detail__nickname {
      font-size: 18px;
    }
    .user-info__left-detail__active {
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
  background-color: #85d7e5;
  width: 60px;

  border-right: 0.6px solid white;
`;

export const Workspaces = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WorkspaceButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 5px;
  border: none;
  margin: 10px 0;

  font-size: 22px;
  font-weight: 600;

  background-color: #ffffff;
`;

export const AddButton = styled.button`
  background-color: inherit;
  border: none;
  color: black;
  font-size: 25px;
  font-weight: 600;

  cursor: pointer;
`;

export const Modal = styled.button`
  position: absolute;
  width: 450px;
  height: 290px;
  top: 200px;
  left: 325px;
  background-color: #f8f8f8;

  border: none;
  border-radius: 10px;
  box-shadow: 1px 1px 3px;

  display: flex;
  flex-direction: column;
  align-items: center;

  .x-bar {
    font-size: 25px;

    border: none;
    align-self: flex-end;
    margin-right: 20px;
    margin-top: 15px;
    background-color: inherit;

    cursor: pointer;
  }
  
  .createBtn {
    padding: 10px 162px ;
    
    font-size: 16px;
    font-weight: 600;
    color: white;
    background-color: #6F84B7;
    border: none;
    border-radius: 5px;
  }
  
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  
  margin-bottom: 20px;

  & > span {
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    align-self: flex-start;

    margin-bottom: 10px;
  }

  & > input {
    width: 370px;
    height: 45px;
    
    font-size: 20px;
  }
`;

export const ChannelSelctor = styled.div`
  background-color: #85d7e5;
  width: 260px;
`;

export const ChannelLabel = styled.label`
  & > div > button {
    border: none;
    padding-top: 15px;
    padding-right: 100%;
    padding-left: 15px;
    padding-bottom: 12px;

    color: white;
    background-color: inherit;
    font-size: 30px;
    font-weight: 600;

    border-bottom: 1px solid white;

    cursor: pointer;
  }
`;

export const ChannelModal = styled.div`
  position: absolute;
  top: 95px;
  left: 75px;

  width: 350px;
  height: 130px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;

  background-color: #f8f8f8;

  .top {
    display: flex;
    justify-content: space-between;

    padding: 15px 15px;
    font-weight: 600;
  }

  .x-bar {
    cursor: pointer;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > div {
      width: 100%;
      border-top: 1px solid black;
      text-align: center;
      margin: 3px 0;

      font-size: 15px;
      opacity: 0.7;

      cursor: pointer;
    }
  }
`;

export const Message = styled.div``;
