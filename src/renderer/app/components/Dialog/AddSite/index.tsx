import * as React from 'react';
import { IProtocol } from 'qusly-core';

import { ensureValue, getValues } from '~/renderer/app/utils';
import { Dropdown, DropdownItem } from '~/renderer/components/Dropdown';
import { DialogContainer, CloseButton, } from '..';
import { Title, Content, Buttons, DialogButton } from '../style';
import { Input, Row } from './style';

type IInput = HTMLInputElement;

export const AddSite = () => {
  const titleRef = React.useRef<IInput>();
  const protocol = React.useRef<IProtocol>('sftp');
  const portRef = React.useRef<IInput>();
  const hostnameRef = React.useRef<IInput>();
  const userRef = React.useRef<IInput>();
  const passwordRef = React.useRef<IInput>();
  const [disabled, setDisabled] = React.useState(true);

  const onProtocol = React.useCallback((value: IProtocol) => {
    protocol.current = value;
  }, []);

  const onInput = React.useCallback(() => {
    const hasValue = ensureValue(hostnameRef, userRef, passwordRef);
    setDisabled(!hasValue);
  }, []);

  const onAdd = React.useCallback(() => {
    const [title, port, hostname, user, password] = getValues(titleRef, portRef, hostnameRef, userRef, passwordRef);

    console.log(title, port, hostname, user, password);
  }, []);

  return (
    <DialogContainer content='add-site'>
      <Title>New site</Title>
      <Content>
        <Input ref={titleRef} placeholder='Title (optional)' onInput={onInput} />
        <Row>
          <Dropdown onChange={onProtocol} defaultValue={protocol.current} style={{ width: '100%' }}>
            <DropdownItem value='ftp'>FTP</DropdownItem>
            <DropdownItem value='ftps'>FTPS</DropdownItem>
            <DropdownItem value='sftp'>SFTP</DropdownItem>
          </Dropdown>
          <Input ref={portRef} placeholder='Port (optional)' onInput={onInput} style={{ marginLeft: 16, marginTop: 0 }} />
        </Row>
        <Input ref={hostnameRef} placeholder='Hostname' onInput={onInput} />
        <Input ref={userRef} placeholder='User' onInput={onInput} />
        <Input ref={passwordRef} placeholder='Password' onInput={onInput} />
      </Content>
      <Buttons>
        <CloseButton />
        <DialogButton label='Add' disabled={disabled} onClick={onAdd} />
      </Buttons>
    </DialogContainer>
  );
};