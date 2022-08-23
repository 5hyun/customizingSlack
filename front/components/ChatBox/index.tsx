import React, { useCallback, useEffect, useRef, useState, VFC } from 'react';
import { Mention, SuggestionDataItem } from 'react-mentions';
import { Button, EachMention, Form, MentionsTextarea } from '@components/ChatBox/styles';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IUser } from '@typings/db';
import gravatar from 'gravatar';
import autosize from 'autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

interface Props {
  chat: string;
  onChangeChat: (e: any) => void;
  onSubmitForm: (e: any) => void;
  placeholder?: string;
}

const ChatBox: VFC<Props> = ({ chat, onChangeChat, onSubmitForm, placeholder }) => {
  const { workspace } = useParams<{ workspace: string }>();

  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: memberData } = useSWR<IUser[]>(userData ? `/api/workspaces/${workspace}/members` : null, fetcher);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [chatChk, setChatChk] = useState(false);

  useEffect(() => {
    if (chat !== '') {
      setChatChk(true);
    } else setChatChk(false);
  }, [chat, onChangeChat]);

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);

  const onKeydown = useCallback((e: any) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault();
        onSubmitForm(e);
      }
    }
  }, []);

  const renderSuggestion = useCallback(
    (
      suggestion: SuggestionDataItem,
      search: string,
      highlightedDisplay: React.ReactNode,
      index: number,
      focus: boolean,
    ): React.ReactNode => {
      if (!memberData) return;
      return (
        <EachMention focus={focus}>
          <img
            src={gravatar.url(memberData[index].email, { s: '20px', d: 'retro' })}
            alt={memberData[index].nickname}
          />
          <span>{highlightedDisplay}</span>
        </EachMention>
      );
    },
    [memberData],
  );

  return (
    <div>
      <Form onClick={onSubmitForm}>
        <MentionsTextarea
          id="editor-chat"
          value={chat}
          onChange={onChangeChat}
          onKeyPress={onKeydown}
          placeholder={placeholder}
          inputRef={textareaRef}
          allowSuggestionsAboveCursor
        >
          <Mention
            appendSpaceOnAdd
            trigger="@"
            data={
              memberData?.map((v) => ({
                id: v.id,
                display: v.nickname,
              })) || []
            }
            renderSuggestion={renderSuggestion}
          />
        </MentionsTextarea>

        <Button type="submit" show={chatChk}>
          <FontAwesomeIcon icon={faPlay} className="chatBtn" />
        </Button>
      </Form>
    </div>
  );
};

export default ChatBox;
