import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class MultiInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bShowList: false,
            tags: []
        };
    }

    // create tags to display in dropdown list
    createTagList = data => {
        const randNum = Math.floor(Math.random() * 1000000 + 1);
        return data.map((item, index) => (
            <li key={index}>
                <label className='fd-menu__item' htmlFor={index + `_${randNum}`}>
                    <input
                        checked={this.isChecked(item)}
                        className='fd-checkbox'
                        id={index + `_${randNum}`}
                        onChange={this.updateSelectedTags}
                        type='checkbox'
                        value={item} />
                    {item}
                </label>
            </li>
        ));
    };

    // create tag elements to display below input box
    createTags = () => {
        return this.state.tags.map((tag, index) => (
            <span
                className='fd-token'
                key={index}
                onClick={this.removeTag}
                role='button'>
                {tag}
            </span>
        ));
    };

    // add/remove tag to tag collection
    updateSelectedTags = event => {
        const tag = event.target.value;

        if (this.state.tags.indexOf(tag) === -1) {
            this.setState(
                prevState => {
                    const tags = prevState.tags;
                    tags.push(tag);

                    return { tags: tags };
                },
                () => this.props.onTagsUpdate(this.state.tags)
            );
        } else {
            this.setState(
                prevState => {
                    let tags = prevState.tags.filter(item => {
                        return item.toLowerCase() !== tag.toLowerCase();
                    });

                    return { tags: tags };
                },
                () => this.props.onTagsUpdate(this.state.tags)
            );
        }
    };

    // check to see if tag is should be checked in list
    isChecked = tag => {
        if (this.state.tags.indexOf(tag) === -1) {
            return false;
        } else {
            return true;
        }
    };

    // remove/close tag
    removeTag = event => {
        const tag = event.target.innerText;

        this.setState(
            prevState => {
                const tags = prevState.tags.filter(item => {
                    return item.toLowerCase() !== tag.toLowerCase();
                });

                return { tags: tags };
            },
            () => this.props.onTagsUpdate(this.state.tags)
        );
    };

    // show/hide tag list drop down
    showHideTagList = () => {
        this.setState(prevState => {
            return { bShowList: !prevState.bShowList };
        });
    };

    render() {
        const {
            buttonProps,
            compact,
            className,
            data,
            listProps,
            inputProps,
            onTagsUpdate,
            placeHolder,
            tagProps,
            ...rest
        } = this.props;

        const multiInputClasses = classnames(
            'fd-multi-input',
            className
        );

        const inputGroupClassNames = classnames(
            'fd-input-group',
            'fd-input-group--after',
            {
                'fd-input-group--compact': compact
            }
        );

        const inputClassNames = classnames(
            'fd-input',
            {
                'fd-input--compact': compact
            }
        );

        return (
            <div
                {...rest}
                className={multiInputClasses}>
                <div className='fd-multi-input-field'>
                    <div className='fd-popover'>
                        <div className='fd-popover__control'>
                            <div
                                aria-expanded={this.state.bShowList}
                                aria-haspopup='true'
                                aria-label='Image label'
                                className='fd-combobox-control'>
                                <div className={inputGroupClassNames}>
                                    <input
                                        {...inputProps}
                                        className={inputClassNames}
                                        onClick={this.showHideTagList}
                                        placeholder={placeHolder}
                                        type='text' />
                                    <span
                                        className='fd-input-group__addon fd-input-group__addon--after
                                fd-input-group__addon--button'>
                                        <button
                                            {...buttonProps}
                                            className='fd-button--light sap-icon--navigation-down-arrow'
                                            onClick={this.showHideTagList} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            aria-hidden={!this.state.bShowList}
                            className='fd-popover__body fd-popover__body--no-arrow'>
                            <nav className='fd-menu'>
                                <ul {...listProps} className='fd-menu__list'>{this.createTagList(data)}</ul>
                            </nav>
                        </div>
                    </div>
                </div>
                {this.state.tags.length > 0 ? (
                    <div {...tagProps} className='fd-multi-input-tags'>{this.createTags()}</div>
                ) : (
                    ''
                )}
            </div>
        );
    }
}

MultiInput.propTypes = {
    data: PropTypes.array.isRequired,
    buttonProps: PropTypes.object,
    className: PropTypes.string,
    compact: PropTypes.bool,
    inputProps: PropTypes.object,
    listProps: PropTypes.object,
    placeHolder: PropTypes.string,
    tagProps: PropTypes.object,
    onTagsUpdate: PropTypes.func
};
