import React from 'react';
import { observer } from 'mobx-react-lite';
import { Selectable } from 'rectangle-selection';

import store from '../../store';
import { File } from '../File';
import { DragDrop, Droppable } from '~/renderer/components/FileDragDrop';
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '~/renderer/components/Skeleton';
import { IFile } from '~/renderer/interfaces';
import { FilesSkeleton } from '~/renderer/components/FilesSkeleton';
import { StyledPage, Grid } from './style';

const Button = observer(({ path }: { path: string }) => {
  const page = store.pages.current;

  const onClick = () => {
    page.history.push(path);
  };

  return <button onClick={onClick}>{path}</button>;
});

export const Page = observer(() => {
  const page = store.pages.current;

  const onMouseDown = React.useCallback((e: React.MouseEvent) => {
    if (!e.ctrlKey && !e.shiftKey) {
      store.pages.current.files.selected = [];
    }
  }, []);

  const onSelection = React.useCallback((selected: IFile[]) => {
    store.pages.current.files.selected = selected;
  }, []);

  const onDrop = React.useCallback((item: IFile) => {
    console.log(item);
  }, []);

  return (
    <StyledPage>
      {page?.loading === false ? (
        <Grid onSelection={onSelection} onMouseDown={onMouseDown}>
          {page?.files.list.map(r => (
            <Selectable key={r.name} data={r}>
              {innerRef => <File ref={innerRef} data={r} />}
            </Selectable>
          ))}
        </Grid>
      ) : (
        <FilesSkeleton />
      )}
    </StyledPage>
  );
});

/*      <DragDrop onDrop={onDrop} selected={page?.selectedFiles}>
        {page?.files.map(r => (
          <Selectable key={r.name} data={r}>
            {innerRef => (
              <Droppable data={r}>
                {provided => <File ref={innerRef} data={r} {...provided} />}
              </Droppable>
            )}
          </Selectable>
        ))}
      </DragDrop>
      */
