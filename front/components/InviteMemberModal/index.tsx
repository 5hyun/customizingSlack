import React, { FC, useCallback, useState } from 'react';
import { InviteModal } from '@pages/Channel/styles';
import { Label } from '@layouts/Workspace/styles';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { toast } from 'react-toastify';

interface Props {
  onCloseModal: () => void;
  setMemberPlus: (frag: boolean) => void;
}

const InviteMemberModal: FC<Props> = ({ setMemberPlus, onCloseModal }) => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

  const [member, onChangeMember, setMember] = useInput('');

  const { data: userData } = useSWR<IUser>('/api/users', fetcher);
  const { mutate: revalidateMembers } = useSWR<IUser[]>(
    userData && channel ? `/api/workspaces/${workspace}/channels/${channel}/members` : null,
    fetcher,
  );

  const onInviteMember = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!member || !member.trim()) return;

      axios
        .post(`/api/workspaces/${workspace}/channels/${channel}/members`, {
          email: member,
        })
        .then((response) => {
          revalidateMembers(response.data, false);
          setMemberPlus(false);
          setMember('');
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [member],
  );

  return (
    <InviteModal>
      <form onSubmit={onInviteMember}>
        <Label>
          <span>채널 멤버 초대</span>
          <input value={member} onChange={onChangeMember} />
        </Label>
        <button type="submit">초대하기</button>
        <span onClick={onCloseModal}>X</span>
      </form>
    </InviteModal>
  );
};

export default InviteMemberModal;
