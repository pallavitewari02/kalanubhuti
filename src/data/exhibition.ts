export type ExhibitionPiece = {
  title: string;
  image: string;
};

export const exhibition: ExhibitionPiece[] = Array.from({ length: 11 }, (_, index) => ({
  title: `Exhibition photo ${index + 1}`,
  image: `/exhibition/${index + 1}.jpg`,
}));
