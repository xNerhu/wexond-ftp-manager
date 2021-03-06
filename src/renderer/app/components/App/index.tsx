import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { createGlobalStyle } from 'styled-components';

import { Titlebar } from '../Titlebar';
import { Activitybar } from '../Activitybar';
import { Sidebar } from '../Sidebar';
import { Content } from '../Content';
import { ContextMenu } from '../ContextMenu';
import { DragThumb } from '../DragThumb';
import { Dialog } from '../Dialog';
import { Style } from '../../style';
import { StyledApp, Container } from './style';

const GlobalStyle = createGlobalStyle`${Style}`;

const App = () => {
  return (
    <StyledApp>
      <GlobalStyle />
      <Titlebar />
      <Container>
        <Activitybar />
        <Sidebar />
        <Content />
        <DragThumb />
      </Container>
      <ContextMenu />
      <Dialog />
    </StyledApp>
  );
};

export default hot(App);
