import React from 'react';
import PropTypes from 'prop-types';
import { faCheckCircle as fasCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle as farCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@edx/paragon';
import messages from './messages';
import { postEventOutlineToParent } from './eventsHandler';

function UnitLink({
  id,
  first,
  unit,
  sequenceId,
  isCurrentId,
}) {
  const {
    complete,
    title,
  } = unit;
  const fullId = `${sequenceId}/${id}`;
  return (
    <li className={`w-100 m-0 pl-4 d-flex ${isCurrentId && 'bg-light'} align-items-center ${!first && 'mt-2 pt-2 border-top border-light'} `}>
      {complete ? (
        <FontAwesomeIcon
          icon={fasCheckCircle}
          fixedWidth
          className="float-left text-success mt-1"
          aria-hidden="true"
          title={messages.completedAssignment.defaultMessage}
        />
      ) : (
        <FontAwesomeIcon
          icon={farCheckCircle}
          fixedWidth
          className="float-left text-gray-400 mt-1"
          aria-hidden="true"
          title={messages.incompleteAssignment.defaultMessage}
        />
      )}
      <Button.Deprecated
        className="btn-link"
        onClick={() => { postEventOutlineToParent('outline_sidebar_navigation_started', fullId); }}
      >
        {title}
      </Button.Deprecated>
    </li>
  );
}

UnitLink.propTypes = {
  id: PropTypes.string.isRequired,
  sequenceId: PropTypes.string.isRequired,
  first: PropTypes.bool.isRequired,
  unit: PropTypes.shape().isRequired,
  isCurrentId: PropTypes.bool.isRequired,

};

export default UnitLink;
