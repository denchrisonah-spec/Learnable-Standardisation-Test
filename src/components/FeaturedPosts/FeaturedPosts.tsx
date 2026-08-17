import {
  useGetCommentsByPostQuery,
  useGetPostsQuery,
  useGetUserByIdQuery,
  type Post,
} from "@/store/api/contentApi";
import { Icon } from "../Icon/Icon";
import "./FeaturedPosts.css";

/**
 * /posts carries no imagery, so the cards keep the comp's own photography.
 * Everything else on the card is live: copy, tags, author and comment count.
 */
const CARD_IMAGES = [
  "/images/blog-1.jpg",
  "/images/blog-2.jpg",
  "/images/blog-3.jpg",
];

function PostCard({ post, image }: { post?: Post; image: string }) {
  // Both skip until the post arrives, so no request fires with a bad id.
  const { data: comments } = useGetCommentsByPostQuery(post?.id ?? 0, {
    skip: !post,
  });
  const { data: author } = useGetUserByIdQuery(post?.userId ?? 0, {
    skip: !post,
  });

  const commentCount = comments?.total ?? 0;

  return (
    <article className="post-card">
      <div className="post-card__media">
        <img src={image} alt="" className="img-cover post-card__img" loading="lazy" />
        <span className="t-h6 post-card__tag">NEW</span>
      </div>

      <div className="post-card__body">
        <div className="t-small post-card__chips">
          {(post?.tags ?? []).map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className={
                i === 0
                  ? "post-card__chip post-card__chip--lead"
                  : "post-card__chip"
              }
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="t-h4 post-card__title">{post?.title ?? "Loading…"}</h3>

        <p className="t-body post-card__excerpt">{post?.body ?? ""}</p>

        <div className="t-small post-card__meta">
          <span>
            <Icon name="calendar" size={16} />
            {author ? `${author.firstName} ${author.lastName}` : "—"}
          </span>
          <span>
            <Icon name="chart" size={16} />
            {commentCount} {commentCount === 1 ? "comment" : "comments"}
          </span>
        </div>

        <a href="#" className="t-h6 post-card__more">
          Learn More
          <Icon name="arrow-next" size={16} className="post-card__arrow" />
        </a>
      </div>
    </article>
  );
}

export function FeaturedPosts() {
  const { data } = useGetPostsQuery({ limit: CARD_IMAGES.length });
  const posts = data?.posts ?? [];

  return (
    <section className="section">
      <div className="posts__inner">
        <div className="posts__heading">
          <p className="t-h6 posts__eyebrow">Practice Advice</p>
          <h2 className="t-h2 posts__title">Featured Posts</h2>
        </div>

        <div className="posts__grid">
          {CARD_IMAGES.map((image, i) => (
            <PostCard key={image} post={posts[i]} image={image} />
          ))}
        </div>
      </div>
    </section>
  );
}
