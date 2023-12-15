import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={334}
    height={443}
    viewBox="0 0 334 443"
    backgroundColor="#cdcbcb"
    foregroundColor="#ecebeb"
  >
    <rect x="3" y="8" rx="17" ry="17" width="310" height="340" />
  </ContentLoader>
);

export default Skeleton;
