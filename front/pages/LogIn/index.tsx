import React, { useCallback, useState } from 'react';
import { Error, Form, Header, Label, LinkContainer, Success } from '@pages/SignUp/styles';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { Redirect } from 'react-router';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const LogIn = () => {
  const { data: userData, mutate } = useSWR('/api/users', fetcher);

  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const [logInError, setlogInError] = useState(false);

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      setlogInError(false);
      axios
        .post(
          '/api/users/login',
          {
            email,
            password,
          },
          {
            withCredentials: true,
          },
        )
        .then(() => {
          mutate();
        })
        .catch((error) => {
          setlogInError(true);
        });
    },
    [email, password, mutate],
  );

  if (userData === undefined) {
    return <div>로딩중...</div>;
  }

  if (userData) {
    return <Redirect to="workspace/sleact/channel/일반" />;
  }

  return (
    <div>
      <Header>Oleact</Header>
      <Form onSubmit={onSubmit}>
        <Label>
          <span>이메일 주소</span>
          <input required placeholder="이메일" type="email" value={email} onChange={onChangeEmail} maxLength={30} />
        </Label>
        <Label>
          <span>비밀번호</span>
          <input type="password" required maxLength={15} value={password} onChange={onChangePassword} />
        </Label>
        {logInError && <Error>로그인에 실패하였습니다.</Error>}
        <button type="submit">로그인</button>
        <LinkContainer>
          <span>이직 회원이 아니신가요&#63;</span> <a href="/signup"> 회원가입 하러가기</a>
        </LinkContainer>
      </Form>
    </div>
  );
};

export default LogIn;
