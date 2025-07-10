// Example usage in a parent component
import React, { useState } from 'react';
import BlogManagement from './BlogManagement';

const ParentComponent = () => {
  const [tags] = useState([
    { id: 1, name: 'React', usage: 25, created: '2024-01-15' },
    { id: 2, name: 'JavaScript', usage: 42, created: '2024-01-12' }
  ]);
  const [categories] = useState([
    { id: 1, category: 'IT & Marketing', date: '2024-01-15', useCount: 45 },
    { id: 2, category: 'Digital Commerce', date: '2024-01-10', useCount: 32 }
  ]);

  return (
    <BlogManagement tags={tags} categories={categories} />
  );
};

export default ParentComponent;