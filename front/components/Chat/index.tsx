import React, { FC, memo } from 'react';
import {IChat, IDM, IUser} from '@typings/db';
import { useParams } from 'react-router';
import gravatar from 'gravatar';

interface Props {
  data: IDM | IChat;
}

const Chat: FC<Props> = memo(({ data }) => {
  const { workspace } = useParams<{ workspace: string }>();
  const user: IUser = 'Sender' in data ? data.Sender : data.User;

  return (
    <div>
      {' '}
      <img src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
      {data.content}
    </div>
  );
});

export default Chat;
