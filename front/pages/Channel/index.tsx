import React, { useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IChannel, IChat, IUser } from '@typings/db';
import useInput from '@hooks/useInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Chat, Content, Header } from '@pages/Channel/styles';
import Menu from '@components/Menu';
import InviteMemberModal from '@components/InviteMemberModal';
import ChatBox from '@components/ChatBox';
import useSWRInfinite from 'swr/infinite';
import Scrollbars from 'react-custom-scrollbars';
import axios from 'axios';
import useSocket from '@hooks/useSocket';
import ChatList from '@components/ChatList/ChatList';
import makeSection from '@utils/makeSection';

const Channel = () => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

  const { data: userdata } = useSWR('/api/users', fetcher);
  const { data: channelData } = useSWR<IChannel>(`/api/workspaces/${workspace}/channels/${channel}`, fetcher);
  const { data: channelMemberData } = useSWR<IUser[]>(
    userdata ? `/api/workspaces/${workspace}/channels/${channel}/members` : null,
    fetcher,
  );
  const {
    data: chatData,
    mutate: mutateChat,
    setSize,
  } = useSWRInfinite<IChat[]>(
    (index: number) => `/api/workspaces/${workspace}/channels/${channel}/chats?perPage=20&page=${index + 1}`,
    fetcher,
  );

  const [memberPlus, setMemberPlus] = useState(false);
  const [chat, onChangeChat, setChat] = useInput('');

  const scrollbarRef = useRef<Scrollbars>(null);
  const [socket] = useSocket(workspace);

  const isEmpty = chatData?.[0]?.length === 0;
  const isRechingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < 20) || false;

  const onCloseMemberPlus = useCallback(() => {
    setMemberPlus((prev) => !prev);
  }, []);

  const onSubmitForm = useCallback(
    (e: any) => {
      e.preventDefault();
      if (chat?.trim() && chatData && channelData) {
        const savedChat = chat;

        mutateChat((prevChatData) => {
          prevChatData?.[0].unshift({
            id: (chatData[0][0]?.id || 0) + 1,
            content: savedChat,
            UserId: userdata.id,
            User: userdata,
            ChannelId: channelData.id,
            Channel: channelData,
            createdAt: new Date(),
          });
          return prevChatData;
        }, false).then(() => {
          setChat('');
          scrollbarRef.current?.scrollToBottom();
        });
        axios
          .post(`/api/workspaces/${workspace}/channels/${channel}/chats`, {
            content: chat,
          })
          .then(() => {
            mutateChat();
            setChat('');
          })
          .catch(console.error);
      }
    },
    [chat, chatData, userdata, channelData, workspace, channel],
  );

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

  if (!userdata) return null;

  return (
    <>
      <Header className="status-bar">
        <div className="status-bar__left">
          <span>#{channel}</span>
        </div>
        <div className="status-bar__right">
          <span>{channelMemberData?.length}</span>
          <FontAwesomeIcon icon={faUserPlus} className="user-plus" onClick={onCloseMemberPlus} />
        </div>
      </Header>
      <Content>
        {memberPlus && (
          <Menu show={memberPlus} onCloseModal={onCloseMemberPlus}>
            <InviteMemberModal setMemberPlus={setMemberPlus} onCloseModal={onCloseMemberPlus} />
          </Menu>
        )}
        <Chat>
          <ChatList chatSections={chatSections} ref={scrollbarRef} setSize={setSize} isReachingEnd={isRechingEnd} />
        </Chat>
        <ChatBox
          chat={chat}
          onChangeChat={onChangeChat}
          onSubmitForm={onSubmitForm}
          placeholder={`Message #${channel}`}
        />
      </Content>
    </>
  );
};

export default Channel;
