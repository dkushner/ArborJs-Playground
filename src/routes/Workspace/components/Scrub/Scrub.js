import React from 'react';
import classes from './Scrub.scss';
import Axiom from '../Axiom';

class Scrub extends React.Component {
  render() {
    const { axiom, setAxiom, togglePlayback, playing } = this.props;

    return (
      <div className={classes.scrub}>
        <div className={classes.track}>
          <div className={classes.head} />
        </div>
        <div className={"col-md-4"}>
          <Axiom />
        </div>
        <div className={"col-md-4"}>
          <div className={classes.actions}>
            <button className={classes.secondary}>
              <i className={"fa fa-fast-backward"} />
            </button>
            <button className={"btn " + classes.primary} onClick={togglePlayback}>
              {(() => {
                if (playing) {
                  return <i className={"fa fa-pause"} />;
                } else {
                  return <i className={"fa fa-play"} />;
                }
              })()}
            </button>
            <button className={classes.secondary}>
              <i className={"fa fa-fast-forward"} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Scrub;
