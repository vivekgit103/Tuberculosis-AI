import { useMemo, useState, useCallback } from 'react';
import { getItem, setItem } from '../utils/storage.js';
import { mockHistory } from '../data/mockHistory.js';

const historyKey = 'tbGuardianHistory';

export const useHistory = () => {
  const [filter, setFilter] = useState({ search: '', category: '' });

  const loadHistory = useCallback(() => {
    const stored = getItem(historyKey, null);
    if (stored && stored.length) return stored;
    setItem(historyKey, mockHistory);
    return mockHistory;
  }, []);

  const history = useMemo(() => {
    const data = loadHistory();
    return data.filter((item) => {
      const searchMatch = [item.name, item.date, item.email].some((value) => value.toLowerCase().includes(filter.search.toLowerCase()));
      const categoryMatch = filter.category ? item.category === filter.category : true;
      return searchMatch && categoryMatch;
    });
  }, [filter]);

  const clearFilter = () => setFilter({ search: '', category: '' });

  return { history, filter, setFilter, clearFilter, loadHistory };
};
