import { useState } from 'react';
import {
  Pane, SearchInput, Text, Heading, Alert,
} from 'evergreen-ui';
import ModalVideo from 'react-modal-video';
import Skeleton from 'react-loading-skeleton';

import youtubeInstance from './utils/axios';
import Image from './Components/Image';

import './app.scss';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalShown, setIsModalShown] = useState(false);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await youtubeInstance.get(`/search?q=${searchValue}`);
      setVideos(res.data.items);
      setLoading(false);
    } catch (err) {
      setError(err.response.data.error.message);
      setLoading(false);
    }
  };

  const handleThumbnailClick = (selectedVideoId) => {
    setIsModalShown(true);
    setSelectedVideo(selectedVideoId);
  };

  return (
    <Pane padding={30} marginX={60}>
      <Pane>
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isModalShown}
          videoId={selectedVideo}
          onClose={() => setIsModalShown(false)}
        />
      </Pane>
      <Pane>
        <Heading as="h3" marginY={5}>Youtube search</Heading>
        <form onSubmit={handleSubmit}>
          <SearchInput
            width="100%"
            height={40}
            placeholder="Search for videos..."
            value={searchValue}
            onChange={handleChange}
          />
        </form>
        {error && (
          <Alert
            marginY={5}
            intent="danger"
            title={error}
          />
        )}
      </Pane>
      <Pane>
        <Pane
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(200px,1fr))"
          gap={20}
          justifyContent="center"
          paddingY={20}
        >
          {videos && (
            videos.map((item) => (
              <Pane
                key={item.id.videoId}
                elevation={1}
                backgroundColor="white"
                cursor="pointer"
                onClick={handleThumbnailClick}
              >
                <Pane>
                  <Image url={item.snippet.thumbnails.medium.url} />
                </Pane>
                <Pane padding={5}>
                  <Text>{item.snippet.title}</Text>
                </Pane>
              </Pane>
            ))
          )}

          {
            loading && (
              <>
                <Skeleton width="100%" height="180px" />
                <Skeleton width="100%" height="180px" />
                <Skeleton width="100%" height="180px" />
                <Skeleton width="100%" height="180px" />
                <Skeleton width="100%" height="180px" />
                <Skeleton width="100%" height="180px" />
                <Skeleton width="100%" height="180px" />
                <Skeleton width="100%" height="180px" />
                <Skeleton width="100%" height="180px" />
                <Skeleton width="100%" height="180px" />
              </>
            )
          }
        </Pane>
      </Pane>
      {
        !videos && (
          <Pane
            height={400}
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="default"
            flexDirection="column"
          >
            <img
              src="https://res.cloudinary.com/dorlzbjs4/image/upload/v1625515643/317714_video_youtube_icon_3_b4seai.png"
              alt="youtube-logo"
            />
            <Heading as="h3">Youtube search</Heading>
          </Pane>
        )
      }
    </Pane>
  );
}

export default App;
