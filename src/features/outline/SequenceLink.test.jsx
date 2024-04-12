import {
  render,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import initializeStore from 'store';

import SequenceLink from './SequenceLink';

describe('Sequence', () => {
  let store;
  let defaultSequenceProps;

  function renderWithProps(props) {
    const component = (
      <Provider store={store}>
        <SequenceLink
          {...props}
        />
      </Provider>
    );
    render(component);
  }

  beforeEach(() => {
    defaultSequenceProps = {
      id: 'block-v1:edX+DemoX+Demo_Course+type@sequential+block@bcdabcdabcdabcdabcdabcdabcdabcd2',
      first: true,
      sequence: {},
      expand: true,
      courseId: '1',
      initUnitId: 'block-v1:edX+DemoX+Demo_Course+type@vertical+block@bcdabcdabcdabcdabcdabcdabcdabcd1'
    };
    store = initializeStore();
  });

  test('show checked icon when complete', () => {
    const sequence = {
      complete: true,
      title: 'Demo',
      unitIds: ['block-v1:edX+DemoX+Demo_Course+type@vertical+block@bcdabcdabcdabcdabcdabcdabcdabcd1'],
      
    };
    renderWithProps({
      ...defaultSequenceProps,
      sequence,
    });

    const checkedButton = document.querySelector('.float-left.mt-1.text-success');
    const uncheckedButton = document.querySelector('.float-left.mt-1.text-gray-400');

    expect(checkedButton).toBeInTheDocument();
    expect(uncheckedButton).not.toBeInTheDocument();
  });

  test('show unchecked icon when incomplete', () => {
    const sequence = {
      complete: false,
      title: 'Demo',
      unitIds: ['0'],
    };
    renderWithProps({
      ...defaultSequenceProps,
      sequence,
    });

    const checkedButton = document.querySelector('.float-left.mt-1.text-success');
    const uncheckedButton = document.querySelector('.float-left.mt-1.text-gray-400');

    expect(uncheckedButton).toBeInTheDocument();
    expect(checkedButton).not.toBeInTheDocument();
  });
});
