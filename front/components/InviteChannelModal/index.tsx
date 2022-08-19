import React, { FC, useCallback, useEffect } from 'react';
import { Form } from '@components/InviteChannelModal/styles';
import { Label } from '@layouts/Workspace/styles';
import useInput from '@hooks/useInput';
import Menu from '@components/Menu';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';

interface Props {
  show: boolean;
  onCloseModal: (e: any) => void;
  setShowInviteChannelModal: (flag: boolean) => void;
}

const InviteChannelModal: FC<Props> = ({ show, onCloseModal, setShowInviteChannelModal }) => {
  const [MemberEmail, onChangeMemberEmail, setMemberEmail] = useInput('');

  const { workspace } = useParams<{ workspace: string }>();

  const { data: userData } = useSWR<IUser>('/api/users', fetcher);
  const { mutate: revalidateMember } = useSWR<IChannel[]>(
    userData ? `/api/workspaces/${workspace}/members` : null,
    fetcher,
  );

  const onInviteMember = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!MemberEmail || !MemberEmail.trim()) return;

      axios
        .post(`/api/workspaces/${workspace}/members`, { email: MemberEmail })
        .then(() => {
          revalidateMember();
          setShowInviteChannelModal(false);
          setMemberEmail('');
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [workspace, MemberEmail],
  );

  return (
    <div>
      {show && (
        <Menu show={show} onCloseModal={onCloseModal}>
          <Form onSubmit={onInviteMember}>
            <Label>
              <span>이메일</span>
              <input value={MemberEmail} onChange={onChangeMemberEmail} />
            </Label>
            <span onClick={onCloseModal}>X</span>
            <button type="submit">초대하기</button>
          </Form>
        </Menu>
      )}
    </div>
  );
};

export default InviteChannelModal;
