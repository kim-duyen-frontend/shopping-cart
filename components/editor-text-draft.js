import React, { useState, useEffect } from "react";
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js";
import styles from "../styles/editordraftjs.module.scss";
import { FaBold, FaItalic, FaUnderline, FaCode } from "react-icons/fa";

const NoSsr = (props) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])
    return <>
        {mounted ? props.children : null}
    </>
}
const EditorTextDraft = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleFormatText = (command) => {
        let newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return true;
        }
        return false;
    }
    const convertAsJsonRaw = () => {
        const contentState = editorState.getCurrentContent();
        let raw = convertToRaw(contentState);
        return JSON.stringify(raw, null, 2);
    }
    const handSaveDescriptionContent = () => {
        const textJson = convertAsJsonRaw();
        localStorage.setItem("DraftContent", textJson);
    }
    const storageText = () => {
        const dataExist = localStorage.getItem("DraftContent");
        return dataExist ? JSON.parse(dataExist) : null;
    }
    const handLoadDescriptionContent = () => {
        const textData = storageText();
        if (textData !== null) {
            let contentState = convertFromRaw(textData);
            let newStateEditor = EditorState.createWithContent(contentState);
            setEditorState(newStateEditor);
        }
    }

    return (
        <>
            <div className={styles.editorText}>
                <div className={styles.formatText}>
                    <button onClick={() => handleFormatText("bold")}><FaBold /></button>
                    <button onClick={() => handleFormatText("italic")}><FaItalic /></button>
                    <button onClick={() => handleFormatText("underline")}><FaUnderline /></button>
                    <button onClick={() => handleFormatText("code")}><FaCode /></button>
                </div>
                <div className={styles.line}></div>
                <div className={styles.editor}>
                    <NoSsr>
                        <Editor
                            editorState={editorState}
                            onChange={(editorState) => setEditorState(editorState)}
                            handleKeyCommand={handleFormatText}
                        />
                    </NoSsr>
                </div>
            </div>
            <div className={styles.btnSubmit}>
                <button onClick={handSaveDescriptionContent}>lưu mô tả</button>
                <button onClick={handLoadDescriptionContent}>lấy lại mô tả</button>
            </div>
        </>
    )
}
export default EditorTextDraft;