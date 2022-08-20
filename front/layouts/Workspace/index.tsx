import React, { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Redirect, Route, Switch } from 'react-router';
import gravatar from 'gravatar';
import {
  AddButton,
  ChannelLabel,
  ChannelModal,
  ChannelSelctor,
  Content,
  Header,
  Message,
  Modal,
  ProfileModal,
  WorkspaceButton,
  Workspaces,
  WorkspaceSelctor,
  Label,
  List,
} from '@layouts/Workspace/styles';
import axios from 'axios';
import Menu from '@components/Menu';
import { IChannel, IUser } from '@typings/db';
import { Link, useParams } from 'react-router-dom';
import useInput from '@hooks/useInput';
import { toast } from 'react-toastify';
import DMList from '@components/DMList';
import loadable from '@loadable/component';
import ChannelList from '@components/ChannelList';
import InviteChannelModal from '@components/InviteChannelModal';
import CreateChannelModal from '@components/CreateChannelModal';
import useSocket from '@hooks/useSocket';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace = () => {
  const { workspace } = useParams<{ workspace?: string }>();

  const { data: userData, mutate } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: channelData } = useSWR<IChannel[]>(userData ? `/api/workspaces/${workspace}/channels` : null, fetcher);

  const [socket, disconnect] = useSocket(workspace);

  useEffect(() => {
    if (channelData && userData && socket) {
      console.log(socket);
      socket.emit('login', { id: userData.id, channels: channelData.map((v) => v.id) });
    }
  }, [channelData, userData, socket]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [workspace, disconnect]);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showChannelMenu, setShowChannelMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);

  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  const onClickChannelMenu = useCallback(() => {
    setShowChannelMenu((prev) => !prev);
  }, []);

  const onClickModal = useCallback(() => {
    setShowCreateWorkspaceModal((prev) => !prev);
  }, []);

  const onClickCreateChannel = useCallback(() => {
    setShowCreateChannelModal((prev) => !prev);
  }, []);

  const onClickInviteChannelModal = useCallback(() => {
    setShowInviteChannelModal((prev) => !prev);
  }, []);

  const onCloseUserProfile = useCallback((e: any) => {
    e.stopPropagation();
    setShowUserMenu(false);
    setShowChannelMenu(false);
    setShowCreateWorkspaceModal(false);
  }, []);

  const CloseInviteChannelModal = useCallback(() => {
    setShowInviteChannelModal((prev) => !prev);
  }, []);

  const CloseCreateChannelModal = useCallback(() => {
    setShowCreateChannelModal((prev) => !prev);
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

  const onCreateWorkspace = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!newWorkspace || !newWorkspace.trim()) return;
      if (!newUrl || !newUrl.trim()) return;

      axios
        .post(
          'api/workspaces',
          {
            workspace: newWorkspace,
            url: newUrl,
          },
          {
            withCredentials: true,
          },
        )
        .then(() => {
          mutate(false, false);
          setShowCreateWorkspaceModal(false);
          setNewWorkspace('');
          setNewWorkspace('');
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [newWorkspace, newUrl],
  );

  if (!userData) {
    return <Redirect to="/login" />;
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
        <WorkspaceSelctor>
          <Workspaces>
            {userData?.Workspaces?.map((ws) => {
              return (
                <Link key={ws.id} to={`/workspace/${ws.url}/channel/일반`}>
                  <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
                </Link>
              );
            })}
            <AddButton onClick={onClickModal}>+</AddButton>
          </Workspaces>
        </WorkspaceSelctor>
        {showCreateWorkspaceModal && (
          <Menu show={showCreateWorkspaceModal} onCloseModal={onCloseUserProfile}>
            <Modal>
              <button className="x-bar" onClick={onClickModal}>
                X
              </button>
              <form onSubmit={onCreateWorkspace}>
                <Label className="name">
                  <span>워크스페이스 이름</span>
                  <input type="text" value={newWorkspace} onChange={onChangeNewWorkspace} />
                </Label>
                <Label>
                  <span>워크스페이스 url</span>
                  <input type="text" value={newUrl} onChange={onChangeNewUrl} />
                </Label>
                <button className="createBtn" type="submit">
                  생성하기
                </button>
              </form>
            </Modal>
          </Menu>
        )}
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
                  <span className="x-bar" onClick={onCloseUserProfile}>
                    X
                  </span>
                </div>
                <div className="bottom">
                  <div className="inviteWorkspace" onClick={onClickInviteChannelModal}>
                    워크스페이스에 사용자 초대
                  </div>
                  <div className="makeChannel" onClick={onClickCreateChannel}>
                    채널 만들기
                  </div>
                  <div className="logout" onClick={onLogout}>
                    로그아웃
                  </div>
                </div>
              </ChannelModal>
            </Menu>
          )}

          <List>
            <ChannelList />
            <DMList />
          </List>
        </ChannelSelctor>
        <Message>
          <Switch>
            <Route path="/workspace/:workspace/channel/:channel" component={Channel} />
            <Route path="/workspace/:workspace/dm/:id" component={DirectMessage} />
          </Switch>
        </Message>
      </Content>
      <InviteChannelModal
        show={showInviteChannelModal}
        onCloseModal={CloseInviteChannelModal}
        setShowInviteChannelModal={setShowInviteChannelModal}
      />
      <CreateChannelModal
        show={showCreateChannelModal}
        onCloseModal={CloseCreateChannelModal}
        setshowCreateChannelModal={setShowCreateChannelModal}
      />
    </div>
  );
};

export default Workspace;
