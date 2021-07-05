/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Pane, SearchInput, Text } from 'evergreen-ui';

import axiosInstance from './utils/axios';
import fetchVideos from './utils/api';
import Image from './Components/Image';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [videos, setVideos] = useState([]);

  const { data, refetch } = useQuery(['phases', searchValue], fetchVideos, {
    retry: false,
    enabled: false,
  });

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    refetch();
  };

  console.log(data);

  return (
    <Pane padding={30}>
      <Pane>
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
      <Pane>
        <Pane clearfix>
          {data && (
            data.map((item) => (
              <Pane
                key={item.id.videoId}
                elevation={1}
                backgroundColor="white"
                float="left"
                margin={24}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Pane
                  width={320}
                  height={180}
                >
                  <Image url={item.snippet.thumbnails.medium.url} />
                </Pane>
                <Pane
                  width={320}
                  padding={10}
                >
                  <Text>{item.snippet.title}</Text>
                </Pane>

              </Pane>
            ))
          )}
        </Pane>
      </Pane>
    </Pane>
  );
}

export default App;
