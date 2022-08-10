import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Redirect } from 'react-router';
import gravatar from 'gravatar';
import {
  ChannelLabel,
  ChannelModal,
  ChannelSelctor,
  Content,
  Header,
  Message,
  ProfileModal,
  WorkspaceSelctor,
} from '@layouts/Workspace/styles';
import axios from 'axios';
import Menu from '@components/Menu';
import { IUser } from '@typings/db';

const Workspace = () => {
  const { data: userData, mutate } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showChannelMenu, setShowChannelMenu] = useState(false);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  const onClickChannelMenu = useCallback(() => {
    setShowChannelMenu((prev) => !prev);
  }, []);

  const onCloseUserProfile = useCallback((e: any) => {
    e.stopPropagation();
    setShowUserMenu(false);
    setShowChannelMenu(false);
  }, []);

  const onLogout = useCallback(() => {
    axios
      .post('/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        mutate(false, false);
      });
  }, []);

  if (!userData) {
    return <Redirect to="login" />;
  }

  return (
    <div>
      <Header>
        <button onClick={onClickUserProfile}>
          <img src={gravatar.url(userData.email, { s: '30px', d: 'retro' })} alt={userData.email} />
        </button>
        {showUserMenu && (
          <Menu show={showUserMenu} onCloseModal={onCloseUserProfile}>
            <ProfileModal>
              <div className="user-info">
                <div className="user-info__left">
                  <img src={gravatar.url(userData.email, { s: '40px', d: 'retro' })} alt={userData.email} />
                  <div className="user-info__left-detail">
                    <span className="user-info__left-detail__nickname">{userData.nickname}</span>
                    <span className="user-info__left-detail__active">Active</span>
                  </div>
                </div>
                <label className="user-info__right">
                  <button onClick={onClickUserProfile}>X</button>
                </label>
              </div>

              <label className="user-logout">
                <button onClick={onLogout}>로그아웃</button>
              </label>
            </ProfileModal>
          </Menu>
        )}
      </Header>
      <Content>
        <WorkspaceSelctor>워크스페이스</WorkspaceSelctor>
        <ChannelSelctor>
          <ChannelLabel onClick={onClickChannelMenu}>
            <div>
              <button>Oleact</button>
            </div>
          </ChannelLabel>
          {showChannelMenu && (
            <Menu show={showChannelMenu} onCloseModal={onCloseUserProfile}>
              <ChannelModal>
                <div className="top">
                  <span className="sleact">Sleact</span>
                  <span className="x-bar">X</span>
                </div>
                <div className="bottom">
                  <div className="inviteWorkspace">워크스페이스에 사용자 초대</div>
                  <div className="makeChannel">채널 만들기</div>
                  <div className="logout">로그아웃</div>
                </div>
              </ChannelModal>
            </Menu>
          )}
        </ChannelSelctor>
        <Message>메세지</Message>
      </Content>
    </div>
  );
};

export default Workspace;
