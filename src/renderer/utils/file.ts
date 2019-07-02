import { File } from '../models';
import FileComponent from '../components/File';

export const sortFiles = (files: File[]): File[] => {
  if (files == null) return [];

  return files.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (a.type === 'directory' && b.type === 'directory'
      || a.type !== 'directory' && b.type !== 'directory') {
      return nameA.localeCompare(nameB);
    }

    if (b.type === 'directory') {
      return 0;
    }

    if (a.type === 'directory') {
      return -1;
    }

    return 0;
  });
}

export const genFileName = (files: File[], start: string) => {
  let exists = false;
  let index = 0;

  for (let i = files.length - 1; i > 0; i--) {
    const name = files[i].name.toLowerCase();

    if (name.startsWith(start)) {
      exists = true;

      const matches = name.match(/\(([^)]+)\)/);

      if (matches != null) {
        const fileIndex = parseInt(matches[1], 10);

        if (fileIndex > index) {
          index = fileIndex;
        }
      }
    }
  }

  return exists ? `${start} (${index + 1})` : start;
};

const checkRects = (rects: ClientRect, fileRects: ClientRect, horizontal = true) => {
  const sideA = horizontal ? 'left' : 'top';
  const sideB = horizontal ? 'right' : 'bottom';

  return rects[sideA] < fileRects[sideA] && rects[sideB] > fileRects[sideB] ||
    rects[sideA] > fileRects[sideA] && rects[sideB] < fileRects[sideB] ||
    rects[sideA] < fileRects[sideA] && fileRects[sideA] < rects[sideB] ||
    fileRects[sideB] > rects[sideA] && fileRects[sideB] < rects[sideB];
}

export const isFileInArea = (rects: ClientRect, file: FileComponent) => {
  const el = file.ref.current;
  if (!el) return null;

  const fileRects = el.getBoundingClientRect();
  return checkRects(rects, fileRects) && checkRects(rects, fileRects, false);
}
