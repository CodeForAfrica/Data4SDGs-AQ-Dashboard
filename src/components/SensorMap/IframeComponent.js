import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  fullHeight: {
    display: 'inline-block',
    margin: '0 auto',
    backgroundColor: 'white',
  },
});

function Iframe({
  title,
  src,
  height,
  width,
  frameBorder,
  scrolling,
  ...props
}) {
  const classes = useStyles(props);

  return (
    <iframe
      title={title}
      key={src}
      src={src}
      height={height}
      width={width}
      frameBorder={frameBorder}
      className={classes.fullHeight}
      scrolling={scrolling}
    />
  );
}

Iframe.propTypes = {
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  frameBorder: PropTypes.string,
  scrolling: PropTypes.string,
};

Iframe.defaultProps = {
  height: '',
  width: '',
  frameBorder: '0',
  scrolling: 'auto',
};
export default Iframe;
