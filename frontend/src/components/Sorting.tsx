import React from 'react';

interface SortOrderSelectProps {
  sortOrder: string;
  onSortOrderChange: (value: string) => void;
}

const SortOrderSelect: React.FC<SortOrderSelectProps> = ({ sortOrder, onSortOrderChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-base">Sort Order:</label>
      <select
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value)}
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="asc">Ascending (A-Z)</option>
        <option value="desc">Descending (Z-A)</option>
      </select>
    </div>
  );
};

export default SortOrderSelect;
