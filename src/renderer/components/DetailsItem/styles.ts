import styled from 'styled-components';
import { robotoMedium } from 'wexond-ui';

export const StyledItem = styled.div`
  padding: 8px 24px;
`;

export const Property = styled.div`
  font-size: 14px;
  ${robotoMedium()};
`;

export const Value = styled.div`
  font-size: 13px;
  margin-top: 4px;
  overflow: hidden;
`;