import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Collapsible, IconButton } from '@edx/paragon';
import { useSelector } from 'react-redux';
import { faCheckCircle as fasCheckCircle, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle as farCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import messages from './messages';
import UnitLink from './UnitLink';

function SequenceLink({
  id,
  sequence,
  expand,
  courseId,
  defaultOpen,
  initUnitId
}) {
  const {
    complete,
    title,
    unitIds,
  } = sequence;
  const {
    units,
  } = useSelector(state => state.outline.outlineData);
  const isFirstUnit = unitIds.includes(initUnitId)

  const [open, setOpen] = useState(true);
  
  useEffect(() => {
    setOpen(expand || isFirstUnit);
  }, [expand || isFirstUnit]);

  // useEffect(() => {
  //   setOpen(isFirstUnit);
  // }, [isFirstUnit]);



  const sequenceTitle = (
    <div className="row w-100 m-0">
      <div className="col-auto p-0">
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
      </div>
      <div className="col-10 ml-3 p-0 font-weight-bold text-dark-500">
        <span className="align-middle">{title}</span>
      </div>
    </div>
  );

  return (
    <div>
      {unitIds.length > 0
      && (
      <li className="section-wrapper">
        <Collapsible
          className="mb-2"
          styling="card-lg"
          title={sequenceTitle}
          open={open}
          onToggle={() => { setOpen(!open); }}
          iconWhenClosed={(
            <IconButton
              alt={messages.openSection.defaultMessage}
              icon={faPlus}
              onClick={() => { setOpen(true); }}
              size="sm"
            />
          )}
          iconWhenOpen={(
            <IconButton
              alt={messages.close.defaultMessage}
              icon={faMinus}
              onClick={() => { setOpen(false); }}
              size="sm"
            />
          )}
        >
          <ol className="list-unstyled subsection-list">
            <div>
              {unitIds.map((unitId, index) => (
                <UnitLink
                  key={unitId}
                  id={unitId}
                  sequenceId={id}
                  unit={units[unitId]}
                  first={index === 0}
                  courseId={courseId}
                />
              ))}
            </div>
          </ol>
        </Collapsible>
      </li>
      )}
    </div>
  );
}

SequenceLink.propTypes = {
  id: PropTypes.string.isRequired,
  initUnitId: PropTypes.string.isRequired,
  sequence: PropTypes.shape().isRequired,
  expand: PropTypes.bool.isRequired,
  defaultOpen: PropTypes.bool.isRequired,
  courseId: PropTypes.string.isRequired,

};

export default SequenceLink;
