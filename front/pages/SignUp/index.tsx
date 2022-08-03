import React, { useCallback, useState } from 'react';
import { Error, Form, Header, Label, LinkContainer, Success } from '@pages/SignUp/styles';
import useInput from '@hooks/useInput';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';

const SignUp = () => {
  const { data } = useSWR('/api/users', fetcher);

  const [email, onChangeEmail, setEmail] = useInput('');
  const [nickname, onChangeNick, setNick] = useInput('');
  const [password, , setPassword] = useInput('');
  const [passwordCheck, , setPasswordCheck] = useInput('');

  // false일 때 경고 메시지가 나와야됨
  const [mismatchError, setMismatchError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      if (!nickname || !nickname.trim()) {
        return;
      }

      if (!mismatchError) {
        setSuccess(true);

        axios
          .post('/api/users', {
            email,
            nickname,
            password,
          })
          .then(() => {
            setSuccess(true);
          })
          .catch((error) => {
            console.log(error.response?.data);
          });
      }
    },
    [email, nickname, password, passwordCheck, mismatchError],
  );

  const onChangePassword = useCallback(
    (e: any) => {
      setPassword(e.target.value);
      // 여기를 서로 다르게 해줘야 비밀 번호 체크가 가능하다.
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck, setPassword],
  );
  const onChangePasswordCheck = useCallback(
    (e: any) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password, setPasswordCheck],
  );

  return (
    <div>
      <Header>Oleact</Header>

      <Form onSubmit={onSubmit}>
        <Label>
          <span>이메일 주소</span>
          <input required placeholder="이메일" type="email" value={email} onChange={onChangeEmail} maxLength={30} />
        </Label>
        <Label>
          <span>닉네임</span>
          <input required placeholder="닉네임" type="text" maxLength={10} value={nickname} onChange={onChangeNick} />
        </Label>
        <Label>
          <span>비밀번호</span>
          <input type="password" required maxLength={15} value={password} onChange={onChangePassword} />
        </Label>
        <Label>
          <span>비밀번호 확인</span>
          <input type="password" required maxLength={15} value={passwordCheck} onChange={onChangePasswordCheck} />
        </Label>
        {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
        {success && <Success>회원가입에 성공했습니다.</Success>}
        <button type="submit">회원가입</button>
        <LinkContainer>
          <span>이미 회원이신가요&#63;</span> <a href="#">로그인 하러가기</a>
        </LinkContainer>
      </Form>
    </div>
  );
};

export default SignUp;
