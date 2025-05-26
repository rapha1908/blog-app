import React, { FC } from 'react';
import Card from './Card';
import { Post } from '../types';

interface CardListProps {
  items: Post[];
}

const CardList: FC<CardListProps> = ({ items }) => (
  <main className="p-6">
    {items.map((item, i) => (
      <Card
        key={i}
        title={item.title}
        author={item.author}
        description={item.description}
        isAuthenticated={true}
      />
    ))}
  </main>
);

export default CardList;
