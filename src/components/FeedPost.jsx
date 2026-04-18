import React from 'react';

const FeedPost = ({ post }) => {
  // Outer container stays the same
  const baseContainerClasses = "w-full max-w-[90vw] md:max-w-5xl lg:max-w-6xl p-4 bg-green-700 rounded shadow-md mx-auto my-4 post";

  const renderDate = () => {
    if (!post.date) return null;
    const [year, month, day] = post.date.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return (
      <p className="text-sm text-gray-600 mb-2">
        {dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </p>
    );
  };

  switch (post.type) {
    case 'poster':
      return (
        <div className="w-full max-w-[90vw] md:max-w-5xl lg:max-w-6xl p-4 bg-green-700 rounded shadow-md mx-auto my-4 post">
          <div className="md:flex gap-4">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full md:w-48 rounded flex-shrink-0"
            />
            <div>
              <h3 className="font-semibold text-black" style={{fontSize: 'clamp(1rem, 4vw, 1.5rem)'}}>{post.title}</h3>
              {renderDate()}
              {post.description && (
                <p className="mt-2 text-white">{post.description}</p>
              )}
              <a
                href={post.ctaLink}
                className="inline-block mt-2 px-4 py-2 bg-blue-600 !text-white rounded hover:bg-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.ctaText}
              </a>
            </div>
          </div>
        </div>
      );

    case 'announcement':
      return (
        <div className={baseContainerClasses}>
          <article className="bg-white p-6 rounded text-black text-left">
            <div className="md:flex gap-6">
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full md:w-64 rounded flex-shrink-0 mb-4 md:mb-0"
                />
              )}
              <div className="flex-1">
            <h1 className="font-bold mb-2 text-center" style={{fontSize: 'clamp(1.25rem, 6vw, 2.25rem)'}}>{post.title}</h1>
                {renderDate()}
                {post.content && post.content.map((item, index) => {
                  if (typeof item === 'string') {
                    return (
                      <p key={index} className="mb-3 leading-relaxed">
                        {item}
                      </p>
                    );
                  } else if (item.type === 'paragraph') {
                    return (
                      <p key={index} className="mb-3 leading-relaxed">
                        {item.text}
                      </p>
                    );
                  }
                  return null;
                })}
                {post.ctaText && post.ctaLink && (
                  <a
                    href={post.ctaLink}
                    className="inline-block mt-4 px-4 py-2 bg-red-600 !text-white rounded hover:bg-red-700"
                  >
                    {post.ctaText}
                  </a>
                )}
              </div>
            </div>
          </article>
        </div>
      );

    case 'text':
      return (
        <div className={baseContainerClasses}>
          {/* White box behind text */}
          <article className="bg-white p-6 rounded text-black text-left">
                <h1 className="font-bold mb-2 text-center" style={{fontSize: 'clamp(1.25rem, 6vw, 2.25rem)'}}>{post.title}</h1>
            {renderDate()}
            {post.content.map((item, index) => {
              if (typeof item === 'string') {
                // Backward compatibility: treat as paragraph
                return (
                  <p key={index} className="mb-3 leading-relaxed">
                    {item}
                  </p>
                );
              } else if (item.type === 'paragraph') {
                return (
                  <p key={index} className="mb-3 leading-relaxed">
                    {item.text}
                  </p>
                );
              } else if (item.type === 'bold-paragraph') {
                return (
                  <p key={index} className="mb-3 leading-relaxed font-bold">
                    {item.text}
                  </p>
                );
              } else if (item.type === 'list') {
                return (
                  <ul key={index} className="mb-3 leading-relaxed list-disc list-inside">
                    {item.items.map((listItem, liIndex) => (
                      <li key={liIndex}>{listItem}</li>
                    ))}
                  </ul>
                );
              }
              return null;
            })}
          </article>
        </div>
      );

    case 'video':
    case 'image':
      return (
        <div className={baseContainerClasses}>
          <article className="bg-white p-6 rounded text-black">
            <h1 className="font-bold mb-2 text-center" style={{fontSize: 'clamp(1.25rem, 6vw, 2.25rem)'}}>{post.title}</h1>
            {renderDate()}
            {post.type === 'video' ? (
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={post.videoUrl}
                  title={post.title}
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded"
                  frameBorder="0"
                />
              </div>
            ) : (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full rounded"
              />
            )}
            {post.caption && (
              <div className="mt-4 text-center text-gray-700">
                {post.caption.split(' | ').map((line, i) => (
                  <p key={i} className="mb-1">{line}</p>
                ))}
              </div>
            )}
          </article>
        </div>
      );

    default:
      return null;
  }
};

export default FeedPost;
