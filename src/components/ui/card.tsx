// src/components/ui/card.tsx
import React from 'react';

interface CardProps {
  title: string; // Ensure the title prop is defined here
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default Card;
