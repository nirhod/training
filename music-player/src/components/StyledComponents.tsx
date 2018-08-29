import styled from 'styled-components';
import { Button, List } from 'antd';
import * as React from 'react';

export const ListItem = styled<any>(List.Item)``;

export const SongButton = styled<any>(props => <Button {...props} />)`
  && {
    transition-delay: 0s;
    transition-duration: 0s;
    visibility: hidden;
    ${ListItem}:hover & {
      visibility: visible;
    }
  }
`;
