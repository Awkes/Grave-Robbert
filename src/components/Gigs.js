/** @jsx jsx */
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

import Box from './Box';

const Gigs = ({ gigs, noGigs, removeTickets }) => gigs?.length < 1 ? (
  <Box>{noGigs}</Box>
) : (
  <table sx={{
    backgroundColor: 'secondaryTrans',
    boxShadow: 0,
    borderRadius: 0,
    fontFamily: 'body',
    fontSize: 2,
    width: '100%',
    overflow: 'hidden',
    borderSpacing: 0,
  }}>
    <tbody sx={{
      '& > tr:nth-of-type(even)': { backgroundColor: 'rgba(255, 255, 255, .1)' },
      '& > tr:hover': { backgroundColor: 'secondary' }
    }}>
      {gigs.map(({ date, link, location, id, venue }) => {
        const [month, day, year] = date.split(' ');
        return (
          <tr 
            key={id} 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: '40px 1fr 1fr 40px',
              gridTemplateAreas: [`
                "date venue venue tickets"
                "date location location tickets"
              `,
              null,`
                "date venue location tickets"
                "date venue location tickets"
              `],
              columnGap: [2, null, 4],
              rowGap: 0,
              padding: 3,
              alignItems: 'center',
              justifyItems: 'center',
              transition: 'background-color ease-in-out .2s'
            }}
          >
            <td sx={{ color: 'primary', gridArea: 'date', fontSize: 1 }}>
              <time sx={{ textAlign: 'center' }}>
                <div sx={{ textTransform: 'uppercase' }}>
                  {month}
                </div>
                <div sx={{ fontWeight: 'bold', fontSize: 3, lineHeight: '15px', }}>
                  {day}
                </div>
                <div>
                  {year}
                </div>
              </time>
            </td>
            <td sx={{ 
              gridArea: 'venue',
              justifySelf: 'left', 
              fontWeight: 'bold',
            }}>
              {venue}
            </td>
            <td sx={{ 
              gridArea: 'location', 
              justifySelf: 'left', 
            }}>
              {location}
            </td>
            {link && !removeTickets && <td sx={{ gridArea: 'tickets', fontSize: '24px' }}>
              <a href={link} rel="noreferrer noopener" sx={{ color: 'primary' }} target="_blank">
                <FontAwesomeIcon icon={faTicketAlt} />
              </a>
            </td>}
          </tr>
        );}
      )}
    </tbody>
  </table>
);

export default Gigs;

Gigs.propTypes = {
  gigs: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      link: PropTypes.string,
      location: PropTypes.string,
      id: PropTypes.string,
      venue: PropTypes.string,
    })
  ),
  noGigs: PropTypes.string,
  removeTickets: PropTypes.bool,
};

Gigs.defaultProps = {
  gigs: [],
  noGigs: 'There are no gigs!',
  removeTickets: false,
};