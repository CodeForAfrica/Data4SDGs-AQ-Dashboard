import * as React from 'react';
import Select from './Select';

export default function Filter({ onChange }) {
  const handleChange = (value) => {
    onChange(value);
  };
  return (
    <div>
      <Select onChange={handleChange} />
    </div>
  );
}
