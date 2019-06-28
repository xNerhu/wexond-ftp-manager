import * as React from 'react';
import { observer } from 'mobx-react';
import { IFileType } from 'qusly-core';

import store from '~/renderer/store';
import { File } from '~/renderer/models';
import { StyledFile, Icon, Label, Input } from './styles';

const onDoubleClick = (type: IFileType, name: string) => () => {
  if (type !== 'directory') return;

  const page = store.pages.current;
  page.location.push(name);
};

const selectGroup = (file: File) => {
  const page = store.pages.current;
  const fileIndex = page.files.indexOf(file);
  const focusedFileIndex = page.files.indexOf(page.focusedFile);

  const bigger = fileIndex >= focusedFileIndex;

  const start = bigger ? focusedFileIndex : fileIndex;
  const end = !bigger ? focusedFileIndex : fileIndex;

  for (let i = 0; i < page.files.length; i++) {
    page.files[i].selected = i >= start && i <= end;
  }
};

const focusFile = (file: File) => {
  const page = store.pages.current;

  page.unselectFiles();
  page.focusedFile = file;
  file.selected = true;
};

const onClick = (file: File) => (e: React.MouseEvent) => {
  if (e.ctrlKey) {
    file.selected = true;
  } else if (e.shiftKey) {
    selectGroup(file);
  } else {
    focusFile(file);
  }
};

const onContextMenu = (file: File) => (e: React.MouseEvent) => {
  if (!file.selected) {
    focusFile(file);
  }

  store.fileMenu.show(e);
};

const onKey = (e: React.KeyboardEvent) => {
  const target = e.target as HTMLTextAreaElement;

  if (e.key === 'Enter') {
    e.stopPropagation();
    e.preventDefault();
    store.pages.current.rename(target.value.trim());
  }

  target.style.height = '0px';

  requestAnimationFrame(() => {
    target.style.height = `${target.scrollHeight}px`;
  });
};

const onInputClick = (e: React.MouseEvent) => {
  e.stopPropagation();
};

const onInputBlur = (e: any) => {
  store.pages.current.rename(e.target.value.trim());
};

export default observer(({ data }: { data: File }) => {
  const { name, type, selected, renaming } = data;
  const { icon, opacity } = store.favicons.get(data);

  return (
    <StyledFile
      onClick={onClick(data)}
      onDoubleClick={onDoubleClick(type, name)}
      selected={selected}
      onContextMenu={onContextMenu(data)}
    >
      <Icon icon={icon} style={{ opacity }} />
      {!renaming && <Label>{name}</Label>}
      {renaming && (
        <Input
          onKeyDown={onKey}
          onMouseDown={onInputClick}
          onDoubleClick={onInputClick}
          defaultValue={name}
          autoFocus
          onBlur={onInputBlur}
        />
      )}
    </StyledFile>
  );
});
