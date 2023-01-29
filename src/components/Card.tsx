import React from 'react';
import { Link } from 'react-router-dom';
import { HomePageVideos } from '../Types';

const Card = ({ data }: { data: HomePageVideos }) => {
  const channelName = data.channelInfo.name.split(' ').join('');

  return (
    <div className="w-64 h-60 flex gap-3 flex-col">
      <div className="relative">
        <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
          {data.videoDuration}
        </span>
        <Link to={`/watch/${data.videoId}`}>
          <img
            src={data.videoThumbnail}
            alt="thumbnail"
            className="h-44 w-72"
          />
        </Link>
      </div>
      <div className="flex gap-2">
        <div className="min-w-fit">
          <Link to={`/@${channelName}`}>
            <img
              src={data.channelInfo.image}
              alt="channel"
              className="h-9 w-9 rounded-full"
            />
          </Link>
        </div>
        <div className="">
          <h3>
            <Link to={`/watch/${data.videoId}`} className="line-clamp-2">
              {data.videoTitle}
            </Link>
          </h3>
          <div className="text-sm text-gray-400">
            <div className="">
              <Link to={`/@${channelName}`} className="hover:text-white">
                {data.channelInfo.name}
              </Link>
            </div>
            <div className="">
              <span className="after:content-['•'] after:mx-1">
                {data.videoViews} views
              </span>
              <span>{data.videoAge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
