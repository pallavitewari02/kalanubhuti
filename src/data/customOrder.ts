import types from './painting-types.json';

export type PaintingType = {
  id: string;
  name: string;
};

export const paintingTypes: PaintingType[] = types;
