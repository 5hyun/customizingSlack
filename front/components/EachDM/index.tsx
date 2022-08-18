import React, { useEffect, VFC } from 'react';
import { IUser } from '@typings/db';
import useSWR, { mutate } from 'swr';
import fetcher from '@utils/fetcher';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { Div, List } from '@components/EachDM/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircle} from "@fortawesome/free-regular-svg-icons";

interface Props {
  member: IUser;
}

const EachDM: VFC<Props> = ({ member }) => {
  const { workspace } = useParams<{ workspace: string }>();

  const { data: userData } = useSWR('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  return (
    <Div>
      <NavLink
        key={member.id}
        className="navLink"
        activeClassName="selected"
        to={`/workspace/${workspace}/dm/${member.id}`}
      >
        <List>
          <FontAwesomeIcon icon={faCircle} className="circle" />
          {member.nickname}
          {member.id === userData.id && <span>(나)</span>}
        </List>
      </NavLink>
    </Div>
  );
};

export default EachDM;
