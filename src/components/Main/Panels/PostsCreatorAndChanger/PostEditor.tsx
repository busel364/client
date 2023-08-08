import React, { useEffect, useRef, useState } from 'react'
import styles from '../modules/panels.module.css'
import EmailEditor from 'react-email-editor';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { createNews, deleteNews, getNew } from '../../../../reducers/AsyncActions/NewsActions';
import { removeNew } from '../../../../reducers/NewsReducer/NewsReducer';

interface Props {
    design: any | null,
    _id: string | undefined
    setIsOn: (a: boolean) => void
}

const PostEditor = ({ design, _id, setIsOn }: Props) => {

    const dispatch = useAppDispatch();

    const emailEditorRef = useRef<any>(null);

    const exportHtml = () => {
        emailEditorRef.current.editor.exportHtml((data: any) => {
            try {
                dispatch(createNews(data));
                setIsOn(false)
            } catch (error) {

            }
        });
    };


    const onReady = () => {
        if (design) {
            emailEditorRef.current.editor.loadDesign(design)
        }
    };

    return (
        <div>
            <div>
                <button className={`${styles.newNewsPostButton} mx-2 mb-3 py-2`} onClick={exportHtml}>לשמור</button>
                {
                    _id ?

                        <button
                            className={`${styles.newNewsPostButton} mx-2 mb-3 py-2`}
                            onClick={() => {
                                dispatch(removeNew())
                                dispatch(deleteNews(_id!))
                                setIsOn(false)
                            }}
                        >למחוק
                        </button>

                        :

                        null

                }
                <button className={`${styles.newNewsPostButton} mx-2 mb-3 py-2`} onClick={() => setIsOn(false)}>לחזור</button>
            </div>
            <EmailEditor ref={emailEditorRef} onReady={onReady} />
        </div >
    );
}

export default PostEditor