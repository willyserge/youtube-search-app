import { useState } from 'react';
import { Pane, SearchInput } from 'evergreen-ui';

function App() {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="App">
      <Pane padding={30}>
        <SearchInput
          width="100%"
          height={40}
          placeholder="Search for videos..."
          value={searchValue}
          onChange={handleChange}
        />
      </Pane>
    </div>
  );
}

export default App;
