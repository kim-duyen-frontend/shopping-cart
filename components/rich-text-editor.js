import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import styles from "../styles/richtext.module.scss";

export default class RichTextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { editorEnable: false, editorState: EditorState.createEmpty() };
        this.inputRef = React.createRef();
        this.focus = () => this.inputRef.current.editor.focus();
        this.onChange = (editorState) => {
            this.setState({ editorState })
            this.props.getTextEditor(JSON.stringify(editorState))
        };
        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onTab = (e) => this._onTab(e);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }

    _handleKeyCommand(command) {
        const { editorState } = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    _toggleBlockType(blockType) {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
    }

    componentDidMount() {
        this.setState({ editorEnable: !this.state.editorEnable })
    }
    render() {
        const { editorState, editorEnable } = this.state;
        let className = 'RichEditor-editor';

        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }
        return (
            <>
                <div className={styles.richEditorRoot}>
                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={this.toggleBlockType}
                    />
                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={this.toggleInlineStyle}
                    />
                    <div className={styles.line}></div>
                    <div className={className} onClick={this.focus}>
                        {editorEnable && (
                            <Editor
                                blockStyleFn={getBlockStyle}
                                customStyleMap={styleMap}
                                editorState={editorState}
                                handleKeyCommand={this.handleKeyCommand}
                                onChange={this.onChange}
                                onTab={this.onTab}
                                placeholder="Mô tả sản phẩm..."
                                ref={this.inputRef}
                                spellCheck={true}
                            />
                        )}

                    </div>
                </div>
            </>
        );
    }
}

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
    }
};

function getBlockStyle(block) {
    if (block.getType() == "blockquote") {
        return 'RichEditor-blockquote';
    }
    if (block.getType() == "align-left") {
        if (block.getText()) {
            return 'align-text-left';
        }
    } else if (block.getType() == "align-center") {
        if (block.getText()) {
            return 'align-text-center';
        }
    } else if (block.getType() == "align-right") {
        if (block.getText()) {
            return 'align-text-right';
        }
    } else if (block.getType() == "align-justify") {
        if (block.getText()) {
            return 'align-text-justify';
        }
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }
    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    {
        label: 'H1',
        style: 'header-one'
    },
    {
        label: 'H2',
        style: 'header-two'
    },
    {
        label: 'H3',
        style: 'header-three'
    },
    {
        label: 'H4',
        style: 'header-four'
    },
    {
        label: 'H5',
        style: 'header-five'
    },
    {
        label: 'H6',
        style: 'header-six'
    },
    {
        label: 'Blockquote',
        style: 'blockquote'
    },
    {
        label: 'UL',
        style: 'unordered-list-item'
    },
    {
        label: 'OL',
        style: 'ordered-list-item'
    },
    {
        label: 'Code Block',
        style: 'code-block'
    },
    {
        label: 'Left',
        style: "align-left"
    },
    {
        label: 'Center',
        style: "align-center"
    },
    {
        label: 'Right',
        style: "align-right"
    },
    {
        label: 'Justify',
        style: "align-justify"
    }
];

const BlockStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
    return (
        <div className={styles.richEditor}>
            {BLOCK_TYPES.map(
                (type) => <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

const INLINE_STYLES = [
    {
        label: 'Bold',
        style: 'BOLD'
    }, {
        label: 'Italic',
        style: 'ITALIC'
    }, {
        label: 'Underline',
        style: 'UNDERLINE'
    }, {
        label: 'Monospace',
        style: 'CODE'
    }
];

const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className={styles.richEditor}>
            {INLINE_STYLES.map(
                type => <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};