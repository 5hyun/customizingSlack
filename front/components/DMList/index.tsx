import React, { FC, useCallback, useState } from 'react';
import useSWR from 'swr';
import { IChannel, IUser, IUserWithOnline } from '@typings/db';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import {Header} from "@components/DMList/styles";

const DMList: FC = () => {
  const { workspace } = useParams<{ workspace: string }>();

  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const { data: memberData } = useSWR<IUserWithOnline[]>(
    userData ? `/api/workspaces/${workspace}/members` : null,
    fetcher,
  );

  const [DMCollapse, setDMCollapse] = useState(false);

  const toggleDMCollapse = useCallback(() => {
    setDMCollapse((prev) => !prev);
  }, []);

  return (
    <>
      <Header collapse={DMCollapse} onClick={toggleDMCollapse}>
        <FontAwesomeIcon icon={faCaretUp} className="collapseBtn" />
        Direct Message
      </Header>
      {DMCollapse &&
        memberData?.map((member) => {
          return <div key={member.id}>{member.nickname}</div>;
        })}
    </>
  );
};

export default DMList;
