import React from 'react';

const FeedPost = ({ post }) => {
  // Outer container stays the same
  const baseContainerClasses = "w-full max-w-[90vw] md:max-w-5xl lg:max-w-6xl p-4 bg-green-700 rounded shadow-md mx-auto my-4 post";

  switch (post.type) {
    case 'poster':
      return (
        <div className={baseContainerClasses}>
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full rounded"
          />
          <h3 className="mt-2 text-lg font-semibold text-black">{post.title}</h3>
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
        <div className={baseContainerClasses}>
          {/* White box behind text */}
          <article className="bg-white p-6 rounded text-black">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">{post.title}</h1>
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
        <div className={baseContainerClasses}>
          {/* White box behind video title and container */}
          <article className="bg-white p-6 rounded text-black">
            <h1 className="text-xl font-bold mb-4">{post.title}</h1>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={post.videoUrl}
                title={post.title}
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded"
                frameBorder="0"
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
