import {
  render,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import initializeStore from 'store';
import UnitLink from './UnitLink';

describe('Sequence', () => {
  let store;
  let defaultSequenceProps;

  function renderWithProps(props) {
    const component = (
      <Provider store={store}>
        <UnitLink
          {...props}
        />
      </Provider>
    );
    render(component);
  }

  beforeEach(() => {
    defaultSequenceProps = {
      id: 'block-v1:edX+DemoX+Demo_Course+type@vertical+block@bcdabcdabcdabcdabcdabcdabcdabcd1',
      first: true,
      isCurrentId: true,
      unit: {},
      expand: true,
      courseId: '1',
      initUnitId: 'block-v1:edX+DemoX+Demo_Course+type@vertical+block@bcdabcdabcdabcdabcdabcdabcdabcd1',
      sequenceId: 'block-v1:edX+DemoX+Demo_Course+type@sequential+block@bcdabcdabcdabcdabcdabcdabcdabcd2'
    };
    store = initializeStore();
  });
  test('show checked icon when complete', () => {
    const unit = {
      complete: true,
      title: 'Demo',
    };
    renderWithProps({
      ...defaultSequenceProps,
      unit,
    });

    const checkedButton = document.querySelector('.float-left.mt-1.text-success');
    const uncheckedButton = document.querySelector('.float-left.mt-1.text-gray-400');

    expect(checkedButton).toBeInTheDocument();
    expect(uncheckedButton).not.toBeInTheDocument();
  });

  test('show unchecked icon when incomplete', () => {
    const unit = {
      complete: false,
      title: 'Demo',
    };
    renderWithProps({
      ...defaultSequenceProps,
      unit,
    });

    const checkedButton = document.querySelector('.float-left.mt-1.text-success');
    const uncheckedButton = document.querySelector('.float-left.mt-1.text-gray-400');

    expect(uncheckedButton).toBeInTheDocument();
    expect(checkedButton).not.toBeInTheDocument();
  });

  test('unit is styled correctly when is first', () => {
    const unit = {
      complete: false,
      title: 'Demo',
    };
    renderWithProps({
      ...defaultSequenceProps,
      unit,
    });

    const unitWrapper = document.querySelector('li.w-100.m-0.pl-4.d-flex.align-items-center');

    expect(unitWrapper).not.toHaveClass('mt-2 pt-2 border-top border-light');
  });

  test('unit is styled correctly when is not first', () => {
    const unit = {
      complete: false,
      title: 'Demo',
    };
    renderWithProps({
      ...defaultSequenceProps,
      unit,
      first: false,
    });

    const unitWrapper = document.querySelector('li.w-100.m-0.pl-4.d-flex.align-items-center');

    expect(unitWrapper).toHaveClass('border-top border-light pt-2 bg-light pb-2');
  });
});
