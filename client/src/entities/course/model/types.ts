export type Course = {
  _id: string;
  title: string;
  instructor: {
    name: string;
  };
  thumbnail?: string;
  price: number;
  isFree: boolean;
  category?: string;
};
