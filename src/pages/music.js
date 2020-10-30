/** @jsx jsx */
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { jsx } from 'theme-ui';

import FigureButton from '../components/FigureButton';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import Section from '../components/Section';
import YouTubeVideo from '../components/YouTubeVideo';
import youTubeImage from '../utils/youTubeImage';


const Music = ({ data }) => {
  const {
    music: { 
      title,
      discoHeading,
      discography,
      videoHeading,
      videos
    }  
  } = data;
  
  const [activeItem, setActiveItem] = useState(null);

  function showItem(type, index) {
    switch (type) {
    case 'disco':
      return setActiveItem(<div>{discography[index]?.title}</div>);
    case 'video':
      return setActiveItem(<YouTubeVideo id={videos[index]?.videoId} />);
    default:
      setActiveItem(null);
    }
  }

  return (
    <Layout heading={title} subtitle={title}>
      <Section heading={discoHeading}>
        <div sx={{
          display: 'grid',
          gridTemplateColumns: ['1fr', null, '1fr 1fr', '1fr 1fr 1fr'],
          gap: 5,
        }}>
          {discography.map(({ title, image, id }, i) => (
            <FigureButton 
              caption={title} 
              image={image} 
              key={id} 
              onClick={() => showItem('disco', i)}
            />
          ))}
        </div>
      </Section>

      <Section heading={videoHeading}>
        <div sx={{
          display: 'grid',
          gridTemplateColumns: ['1fr', null, '1fr 1fr', '1fr 1fr 1fr'],
          gap: 5,
        }}>
          {videos.map(({ title, videoId, id }, i) => (
            <FigureButton 
              caption={title} 
              image={youTubeImage(videoId)} 
              key={id} 
              onClick={() => showItem('video', i)}
            />
          ))}
        </div>
      </Section>

      <Modal close={showItem}>
        {activeItem}
      </Modal>
    </Layout>
  );
};

export default Music;

Music.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
  query {
    music: pagesYaml(fields: {type: {eq: "music"}}) {
      title
      discoHeading
      discography {
        title
        date
        info
        image
        links {
          link
          title
          id
        }
        tracks {
          track
          id
        }
        id
      }
      videoHeading
      videos {
        title
        videoId
        id
      }
    }
  }
`;