import React from 'react';
import renderer from 'react-test-renderer';
import { Toggle } from './Toggle';
import { mount, shallow } from 'enzyme';

describe('<Toggle />', () => {
    const defaultToggle = <Toggle>Normal toggle</Toggle>;
    const checkedToggle = (
        <Toggle checked className='blue'
            size='s'>
            Small toggle
        </Toggle>
    );
    const disabledToggle = <Toggle disabled>Normal toggle</Toggle>;
    const disabledCheckedToggle = (
        <Toggle checked disabled>
            Normal toggle
        </Toggle>
    );

    test('create toggle component', () => {
        // Default toggle
        let component = renderer.create(defaultToggle);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        // checked toggle
        component = renderer.create(checkedToggle);
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        // disabled toggle
        component = renderer.create(disabledToggle);
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        // checked disabled toggle
        component = renderer.create(disabledCheckedToggle);
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Toggle state change', () => {
        const wrapper = shallow(defaultToggle);

        // check that toggle is not checked
        expect(wrapper.state(['checked'])).toBeFalsy();

        // simulate changing toggle
        wrapper.find('input[type="checkbox"]').simulate('change');

        // check that toggle is checked
        expect(wrapper.state(['checked'])).toBeTruthy();
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the Toggle component', () => {
            const element = mount(<Toggle data-sample='Sample' />);

            expect(
                element.getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });

        test('should allow props to be spread to the Toggle component\'s label element', () => {
            const element = mount(<Toggle labelProps={{'data-sample': 'Sample'}} />);

            expect(
                element.find('label').getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });

        test('should allow props to be spread to the Toggle component\'s input element', () => {
            const element = mount(<Toggle inputProps={{'data-sample': 'Sample'}} />);

            expect(
                element.find('input').getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
