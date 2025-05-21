import React from 'react';

const FeedPost = ({ post }) => {
  switch (post.type) {
    case 'poster':
      return (
        <div className="w-[75vw] p-4 bg-white rounded shadow-md post">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full rounded"
          />
          <h3 className="mt-2 text-lg post font-semibold">{post.title}</h3>
          <a
            href={post.ctaLink}
            className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            {post.ctaText}
          </a>
        </div>
      );

    case 'text':
      return (
        <div className="w-[75vw] p-4 bg-white rounded shadow-md post rounded shadow-md">
          <article className="w-[70vw] feed-post p-4 bg-white rounded shadow-md max-w-[70vw] mx-auto my-4">
            <h1 className="text-xl font-bold mb-4">{post.title}</h1>
            {post.content.map((paragraph, index) => (
                <p key={index} className="mb-3 leading-relaxed">
                {paragraph}
                </p>
            ))}
            </article>
        </div>
      );

    case 'video':
      return (
        <div className="w-[75vw] p-4 bg-white rounded shadow-md post rounded shadow-md">
            <article className="w-[70vw] p-4 bg-white rounded shadow-md mx-auto my-4 feed-post">
                <h1 className="text-xl font-bold mb-4">{post.title}</h1>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                    src={post.videoUrl}
                    title={post.title}
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded"
                    />
                </div>
            </article>
        </div>
      );

    default:
      return null;
  }
};

export default FeedPost;
