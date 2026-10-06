import { publicUrl } from '../lib/publicUrl';

export type ExhibitionPiece = {
  title: string;
  image: string;
};

export const exhibition: ExhibitionPiece[] = Array.from({ length: 18 }, (_, index) => ({
  title: `Exhibition photo ${index + 1}`,
  image: publicUrl(`/exhibition/${index + 1}.jpg`),
}));
