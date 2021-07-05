/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { useState } from 'react';
import { Pane, SearchInput } from 'evergreen-ui';
import axiosInstance from './utils/axios';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [videos, setVideos] = useState([]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.get('/search', {
        params: {
          q: searchValue,
        },
      });
      setVideos(response.data.items);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="App">
      <Pane padding={30}>
        <form onSubmit={handleSubmit}>
          <SearchInput
            width="100%"
            height={40}
            placeholder="Search for videos..."
            value={searchValue}
            onChange={handleChange}
          />
        </form>
      </Pane>
    </div>
  );
}

export default App;
