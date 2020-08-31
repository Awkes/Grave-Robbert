/** @jsx jsx */
import { Match } from '@reach/router';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

const linkStyle = {
  fontFamily: 'button',
  color: 'text',
  textDecoration: 'none',
  display: 'block',
  paddingY: 2,
  paddingX: 3,
  '@media(pointer: fine)': {
    '&:hover': {
      animation: 'linkAnimation .2s infinite',
      textShadow: t =>
        `-1px -1px 1px ${t.colors.primary},
          1px 1px 1px ${t.colors.primary},    
          -1px 1px 1px ${t.colors.primary},
          1px -1px 1px ${t.colors.primary}`
    },
    '@keyframes linkAnimation': {
      '0%': {
        textShadow: t =>
          `0 -2px 2px ${t.colors.primary},
          0 2px 2px ${t.colors.primary},
          -2px 0 2px ${t.colors.primary},
          2px 0 2px ${t.colors.primary}`
      },
      '66%': {
        textShadow: t =>
          `0 -2px 2px ${t.colors.primary},
          0 2px 2px ${t.colors.primary},
          -3px 0 2px ${t.colors.primary},
          3px 0 2px ${t.colors.primary}`  
      },
      '100%': {
        textShadow: t =>
          `0 -3px 2px ${t.colors.primary},
          0 3px 2px ${t.colors.primary},
          -2px 0 2px ${t.colors.primary},
          2px 0 2px ${t.colors.primary}`  
      }
    }
  }
};

const Menu = ({ links, horizontal, right, small, onClick }) => (
  <ul sx={{ listStyleType: 'none', margin: 0, padding: 0, textAlign: right ? 'right' : 'center' }}>
    {links.map(({ __typename, title, link, url, id }) => (
      <li 
        key={id}
        sx={{ 
          display: horizontal ? 'inline-block' : 'block',
          fontSize: small ? 4 : 5,
        }}
      >
        {__typename === 'DatoCmsExternalLink'
          ? (
            <a 
              href={url} 
              onClick={onClick}
              rel="noreferrer noopener" 
              sx={linkStyle} 
              target="_blank"
            >
              {title}
            </a>
          ) : (
            <Match path={`${link?.slug}/*`}>
              {({ match }) => (
                <Link 
                  onClick={onClick}
                  sx={match 
                    ? { 
                      ...linkStyle,
                      '&:before': { content: '"["', color: 'primary' },
                      '&:after': { content: '"]"', color: 'primary' } 
                    }
                    : linkStyle
                  } 
                  to={link?.slug}
                >
                  {title}
                </Link>
              )}
            </Match>
          )}
      </li>
    ))}
  </ul>
);

export default Menu;

Menu.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.shape({
        slug: PropTypes.string
      }),
      url: PropTypes.string,
      id: PropTypes.string,
      __typename: PropTypes.string,
    })
  ).isRequired,
  horizontal: PropTypes.bool,
  onClick: PropTypes.func,
  right: PropTypes.bool,
  small: PropTypes.bool,
};

Menu.defaultProps = {
  horizontal: false,
  onClick: null,
  right: false,
  small: false,
};