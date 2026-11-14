import React from 'react';
import { imgProps } from '../lib/images';
import { useI18n } from '../i18n';
import { Card, ButtonLink } from './ui';

// Feed posts (src/data/posts.js) rendered as white cards matching the page
// design system: serif title, gold date, readable body, rounded images and
// pill CTA buttons. Posts are English-only for now (see FeedPost below).

const img = (post, className, sizes) => imgProps(post.imageUrl, {
  alt: post.title,
  className,
  sizes,
  loading: 'lazy',
});

// Donation-type CTAs get the primary red button; everything else green.
const isDonateCta = (post) => /donat/i.test(`${post.ctaLink} ${post.ctaText}`);

function Cta({ post }) {
  if (!post.ctaText || !post.ctaLink) return null;
  return (
    <ButtonLink
      to={post.ctaLink}
      variant={isDonateCta(post) ? 'red' : 'green'}
      className="mt-4 w-full sm:w-auto"
    >
      {post.ctaText}
    </ButtonLink>
  );
}

function PostDate({ date }) {
  if (!date) return null;
  const [year, month, day] = date.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  return (
    <time dateTime={date} className="block text-sm sm:text-base font-semibold text-pp-gold-text mb-3">
      {dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
    </time>
  );
}

// Body blocks: bare strings (legacy) and {type:'paragraph'} are paragraphs;
// 'bold-paragraph' and 'list' only appear in text posts.
function Blocks({ content, rich = true }) {
  if (!content) return null;
  return content.map((item, index) => {
    if (typeof item === 'string' || item.type === 'paragraph') {
      return (
        <p key={index} className="mb-3 last:mb-0 leading-relaxed">
          {typeof item === 'string' ? item : item.text}
        </p>
      );
    }
    if (!rich) return null;
    if (item.type === 'bold-paragraph') {
      return (
        <p key={index} className="mb-3 last:mb-0 leading-relaxed font-bold">
          {item.text}
        </p>
      );
    }
    if (item.type === 'list') {
      return (
        <ul key={index} className="mb-3 last:mb-0 leading-relaxed list-disc ps-6 space-y-1">
          {item.items.map((listItem, liIndex) => (
            <li key={liIndex}>{listItem}</li>
          ))}
        </ul>
      );
    }
    return null;
  });
}

const FeedPostBody = ({ post, headingLevel }) => {
  // createElement: this repo's ESLint config doesn't mark JSX-only
  // identifiers as used, so no <Heading> variable.
  const title = React.createElement(
    `h${headingLevel}`,
    { className: 'font-serif font-bold text-xl sm:text-2xl leading-snug mb-1 text-pp-ink' },
    post.title,
  );
  const cardCls = 'text-start overflow-hidden';

  switch (post.type) {
    case 'poster':
    case 'announcement':
      // Title on top; small image floated beside the text even on phones so
      // the card stays short (text wraps under it).
      return (
        <Card as="article" accent="green" className={`${cardCls} flow-root`}>
          {title}
          <PostDate date={post.date} />
          {post.imageUrl && (
            <img {...img(post, 'float-start me-4 sm:me-6 mb-3 w-28 sm:w-48 h-auto rounded-lg', '(max-width: 640px) 112px, 192px')} />
          )}
          {post.description && <p className="mb-3 leading-relaxed">{post.description}</p>}
          <Blocks content={post.content} rich={false} />
          {/* Cleared below the image so the button never squeezes into the
              narrow column beside it on phones. */}
          <div className="clear-both sm:clear-none">
            <Cta post={post} />
          </div>
        </Card>
      );

    case 'text':
      return (
        <Card as="article" accent="green" className={`${cardCls} flow-root`}>
          {title}
          <PostDate date={post.date} />
          {post.imageUrl && (
            <img
              {...img(post, 'float-end ms-4 mb-3 w-28 sm:w-44 h-auto rounded-lg shadow-sm', '(max-width: 640px) 112px, 176px')}
            />
          )}
          <Blocks content={post.content} />
          <Cta post={post} />
        </Card>
      );

    case 'video':
    case 'image':
      return (
        <Card as="article" accent="green" className={cardCls}>
          {title}
          <PostDate date={post.date} />
          {post.type === 'video' ? (
            <div className="relative w-full aspect-video">
              <iframe
                src={post.videoUrl}
                title={post.title}
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-lg"
                frameBorder="0"
              />
            </div>
          ) : (
            <img {...img(post, 'w-full h-auto rounded-lg', '(max-width: 800px) 100vw, 720px')} />
          )}
          {post.caption && (
            <div className="mt-4 leading-relaxed">
              {post.caption.split(' | ').map((line, i) => (
                <p key={i} className={i === 0 ? 'mb-2' : 'mb-1 font-semibold'}>{line}</p>
              ))}
            </div>
          )}
          <Cta post={post} />
        </Card>
      );

    default:
      return null;
  }
};

// Posts are English-only for now (Farsi posts are a follow-up). On Farsi pages
// keep them left-to-right and tagged lang="en" so layout and screen readers
// stay correct, and say so rather than silently mixing languages.
// `headingLevel`: 2 on the News page, 3 under History's year headings.
const FeedPost = ({ post, headingLevel = 2 }) => {
  const { lang, t } = useI18n();
  // id lets home-page news cards deep-link to /news#post-<id>.
  if (lang === 'en') {
    return (
      <div id={`post-${post.id}`} className="w-full scroll-mt-24">
        <FeedPostBody post={post} headingLevel={headingLevel} />
      </div>
    );
  }
  return (
    <div id={`post-${post.id}`} className="w-full scroll-mt-24 text-start">
      <p className="text-sm text-stone-600 mb-1">{t('lang.englishOnly')}</p>
      <div lang="en" dir="ltr">
        <FeedPostBody post={post} headingLevel={headingLevel} />
      </div>
    </div>
  );
};

export default FeedPost;
