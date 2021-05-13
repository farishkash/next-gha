export const GraphCMSImageLoader = ({ src, width }) => {
  const relativeSrc = (imgSrc) => imgSrc.split('/').pop();
  return `https://media.graphcms.com/resize=width:${width}/${relativeSrc(src)}`;
};

export default GraphCMSImageLoader;
