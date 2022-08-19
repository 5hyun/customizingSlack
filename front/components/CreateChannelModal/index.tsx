import React, { FC, useCallback } from 'react';
import Menu from '@components/Menu';
import { Form } from '@components/InviteChannelModal/styles';
import { Label } from '@layouts/Workspace/styles';
import useInput from '@hooks/useInput';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IChannel, IUser } from '@typings/db';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setshowCreateChannelModal: (frag: boolean) => void;
}

const CreateChannelModal: FC<Props> = ({ show, onCloseModal, setshowCreateChannelModal }) => {
  const { workspace } = useParams<{ workspace: string }>();

  const [channel, onChangeChannel, setChannel] = useInput('');

  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { mutate: mutateChannel } = useSWR<IChannel[]>(
    userData ? `/api/workspaces/${workspace}/channels` : null,
    fetcher,
  );

  const onCreateChannel = useCallback(
    (e: any) => {
      e.preventDefault();

      if (!channel || !channel.trim()) return;

      axios
        .post(`/api/workspaces/${workspace}/channels`, {
          name: channel,
        })
        .then(() => {
          mutateChannel();
          setshowCreateChannelModal(false);
          setChannel('');
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [workspace, channel],
  );

  return (
    <div>
      {show && (
        <Menu show={show} onCloseModal={onCloseModal}>
          <Form onSubmit={onCreateChannel}>
            <Label>
              <span>채널 이름</span>
              <input value={channel} onChange={onChangeChannel} />
            </Label>
            <span onClick={onCloseModal}>X</span>
            <button type="submit">생성하기</button>
          </Form>
        </Menu>
      )}
    </div>
  );
};

export default CreateChannelModal;
