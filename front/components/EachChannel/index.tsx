import React, { FC } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { IChannel } from '@typings/db';
import { Div, List } from '@components/EachDM/styles';

interface Props {
  channel: IChannel;
}

const EachChannel: FC<Props> = ({ channel }) => {
  const { workspace } = useParams<{ workspace: string }>();

  return (
    <Div>
      <NavLink className="navLink" activeClassName="selected" to={`/workspace/${workspace}/channel/${channel.name}`}>
        <List># {channel.name}</List>
      </NavLink>
    </Div>
  );
};

export default EachChannel;
