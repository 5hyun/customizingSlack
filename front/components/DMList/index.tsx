import React, { FC, useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import { IUser, IUserWithOnline } from '@typings/db';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { Header } from '@components/DMList/styles';
import EachDM from '@components/EachDM';
import useSocket from '@hooks/useSocket';

const DMList: FC = () => {
  const { workspace } = useParams<{ workspace?: string }>();

  const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const { data: memberData } = useSWR<IUserWithOnline[]>(
    userData ? `/api/workspaces/${workspace}/members` : null,
    fetcher,
  );

  const [DMCollapse, setDMCollapse] = useState(true);

  const [onlineList, setOnlineList] = useState<number[]>([]);
  const [socket] = useSocket(workspace);

  const toggleDMCollapse = useCallback(() => {
    setDMCollapse((prev) => !prev);
  }, []);

  useEffect(() => {
    // 누가 로그인했는지 정보 가져옴
    socket?.on('onlineList', (data: number[]) => {
      setOnlineList(data);
    });

    return () => {
      socket?.off('onlineList');
    };
  }, [socket]);

  return (
    <div>
      <Header onClick={toggleDMCollapse}>
        <FontAwesomeIcon icon={faCaretUp} className={['collapseBtn', DMCollapse ? `collapseClick` : ``].join(' ')} />
        <span>Direct Message</span>
      </Header>
      <div>
        {DMCollapse &&
          memberData?.map((member) => {
            const isOnline = onlineList.includes(member.id);
            return <EachDM key={member.id} member={member} isOnline={isOnline} />;
          })}
      </div>
    </div>
  );
};

export default DMList;
