import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Button } from '@edx/paragon';

import { fetchCourseOutline } from './data';
import messages from './messages';
import Section from './Section';
import { FAILED, LOADING } from './data/slice';
import { handleOutlineEvent } from './eventsHandler';

function CourseOutline() {
  const { 
    courseId: courseIdFromUrl,
    unitId: unitIdFromUrl,
  } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourseOutline(courseIdFromUrl));
  }, [courseIdFromUrl, dispatch]);

  const {
    courseId,
    courseStatus,
  } = useSelector(state => state.outline);
  const {
    course,
    sections,
  } = useSelector(state => state.outline.outlineData);
  const [expandAll, setExpandAll] = useState(false);

  // If an event occurs in frontend-app-learning setExpandAll will be set as true.
  useEffect(() => {
    handleOutlineEvent(setExpandAll);
  }, [setExpandAll]);

  if (courseStatus === LOADING) {
    return (
      <h3>{messages.loading.defaultMessage}</h3>
    );
  }

  if (courseStatus === FAILED) {
    return (
      <h3>{messages.failed.defaultMessage}</h3>
    );
  }

  return (
    <aside className="sidebar">
      <nav className="p-3" aria-label="Sidebar Navigation">
        <Button
          id="expandButton"
          variant="outline-primary w-100 mb-3"
          onClick={() => { setExpandAll(!expandAll); }}
        >
          {expandAll ? messages.collapseAll.defaultMessage : messages.expandAll.defaultMessage}
        </Button>
        <ol id="sidebar-outline" className="list-unstyled">
          {course.sectionIds.map((sectionId) => (
            <Section
              key={sectionId}
              courseId={courseId}
              expand={expandAll}
              section={sections[sectionId]}
              initUnitId={unitIdFromUrl}
            />
          ))}
        </ol>
      </nav>
    </aside>
  );
}

export default CourseOutline;
