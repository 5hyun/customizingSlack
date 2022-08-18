import React, { FC, useCallback, useState } from 'react';
import useSWR from 'swr';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router-dom';
import { Header} from '@components/DMList/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import EachChannel from "@components/EachChannel";

const ChannelList: FC = () => {
  const { workspace } = useParams<{ workspace: string }>();

  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const { data: channelData } = useSWR<IChannel[]>(
    // 내가 로그인 한 상태에 채널을 가져온다.
    userData ? `/api/workspaces/${workspace}/channels` : null,
    fetcher,
  );

  const [ChannelCollapse, setChannelCollapse] = useState(true);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  return (
    <>
      <Header onClick={toggleChannelCollapse}>
        <FontAwesomeIcon
          icon={faCaretUp}
          className={['collapseBtn', ChannelCollapse ? `collapseClick` : ``].join(' ')}
        />
        <span>Channel</span>
      </Header>
      <div>
        {ChannelCollapse &&
          channelData?.map((channel) => {
              return <EachChannel key={channel.id} channel={channel} />
            // return <div>#{channel.name}</div>;
          })}
      </div>
    </>
  );
};

export default ChannelList;
