import React from 'react';
import useSWR from 'swr';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router-dom';

const ChannelList = () => {
  const { workspace } = useParams<{ workspace: string }>();

  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const { data: channelData } = useSWR<IChannel[]>(
    // 내가 로그인 한 상태에 채널을 가져온다.
    userData ? `/api/workspaces/${workspace}/channels` : null,
    fetcher,
  );

  return (
    <div>
      <header>Channel</header>
      {channelData?.map((channel) => {
        return <div>#{channel.name}</div>;
      })}
    </div>
  );
};

export default ChannelList;
