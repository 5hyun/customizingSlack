import React, { FC, useCallback, useState } from 'react';
import useSWR from 'swr';
import { IUser, IUserWithOnline } from '@typings/db';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { Header } from '@components/DMList/styles';
import EachDM from '@components/EachDM';

const DMList: FC = () => {
  const { workspace } = useParams<{ workspace: string }>();

  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const { data: memberData } = useSWR<IUserWithOnline[]>(
    userData ? `/api/workspaces/${workspace}/members` : null,
    fetcher,
  );

  const [DMCollapse, setDMCollapse] = useState(true);

  const toggleDMCollapse = useCallback(() => {
    setDMCollapse((prev) => !prev);
  }, []);

  return (
    <div>
      <Header onClick={toggleDMCollapse}>
        <FontAwesomeIcon icon={faCaretUp} className={['collapseBtn', DMCollapse ? `collapseClick` : ``].join(' ')} />
        <span>Direct Message</span>
      </Header>
      <div>
        {DMCollapse &&
          memberData?.map((member) => {
            return <EachDM key={member.id} member={member} />;
          })}
      </div>
    </div>
  );
};

export default DMList;
