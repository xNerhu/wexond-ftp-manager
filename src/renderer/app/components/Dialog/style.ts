import styled, { css } from 'styled-components';

import { EASING_FUNCTION } from '../../constants';
import { shadows } from '~/renderer/mixins';
import { Button } from '~/renderer/components/Button';

export const StyledDialog = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.54);
  }
`;

export const Container = styled.div`
  width: 344px;
  max-width: 512px;
  height: fit-content;
  background-color: #fff;
  border-radius: 16px;
  z-index: 11;
  transition: 0.15s transform ${EASING_FUNCTION};
  box-shadow: ${shadows(4)};
`;

export const Title = styled.div`
  padding: 16px;
  font-size: 18px;
`;

export const Content = styled.div`
  padding: 0px 16px 8px;
`;

export const Buttons = styled.div`
  width: 100%;
  padding: 12px 4px 16px;
  display: flex;
`;

export const DialogButton = styled(Button)`
  margin-right: 8px;

  &:first-child {
    margin-left: auto;
  }
`