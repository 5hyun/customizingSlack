import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Redirect } from 'react-router';
import gravatar from 'gravatar';
import { ChannelSelctor, Content, Header, Message, ProfileModal, WorkspaceSelctor } from '@layouts/Workspace/styles';
import axios from 'axios';

const Workspace = () => {
  const { data: userData, mutate } = useSWR('/api/users', fetcher);

  const [showUserMenu, setShowUserMenu] = useState(false);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
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
          <ProfileModal>
            <div className="user-info">
              <div className="user-info__left">
                <img src={gravatar.url(userData.email, { s: '40px', d: 'retro' })} alt={userData.email} />
                <div className="user-info__left-detail">
                  <span>{userData.nickname}</span>
                  <span>Active</span>
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
        )}
      </Header>
      <Content>
        <WorkspaceSelctor>.</WorkspaceSelctor>
        <ChannelSelctor>.</ChannelSelctor>
        <Message>.</Message>
      </Content>
    </div>
  );
};

export default Workspace;
