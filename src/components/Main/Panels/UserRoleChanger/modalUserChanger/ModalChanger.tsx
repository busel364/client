import React, { useEffect, useRef, useState } from 'react'
import styles from '../../../UserPage/modules/userAcc.module.css'
import stylesPanels from '../../modules/panels.module.css'
import { UserData } from '../../../../../utils/types/UserTypes'
import { deleteUser, fetchImage, updateRoles, updateUser } from '../../../../../reducers/AsyncActions/AccountActions'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks'
import { base_url } from '../../../../../utils/utils'
import ModalDataChanger from './ModalDataChanger'
import { getUsers } from '../../../../../reducers/AsyncActions/UsersActions'

interface Props {
    setIsOn: (a: boolean) => void
    user: UserData
}

const ModalChanger = ({ setIsOn, user }: Props) => {
    const dispatch = useAppDispatch();
    const a = useAppSelector(state => state.user);

    const [name, setName] = useState(user ? user.fullName ? user.fullName : '' : '');
    const [tel, setTel] = useState(user ? user.tel ? user.tel : '' : '');
    const [isClicked, setIsClicked] = useState(false);
    const [deleteChecker, setDeleteChecker] = useState(false);
    const [img, setImg] = useState<any>(null);
    const filePicker = useRef<any>(null);

    const handlePicker = () => {
        filePicker.current!.click();
    }

    const handleSubmit = () => {
        try {
            if (img) {
                dispatch(
                    fetchImage(img,
                        {
                            _id: user._id!,
                            tel: tel!,
                            fullName: name!,
                            avatarUrl: user.avatarUrl!,
                            token: a.token!
                        }
                    )
                )
            } else {
                dispatch(
                    updateUser(
                        {
                            _id: user._id!,
                            tel: tel!,
                            fullName: name!,
                            avatarUrl: user.avatarUrl!,
                            token: a.token!
                        }
                    )
                )
            }
            setIsOn(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (user ?
        <div className={`${stylesPanels.divContainer} col-sm-12 col-md-12 col-lg-10`}>
            <div
                className={`${stylesPanels.divBlock}`}
                onClick={() => setIsOn(false)}></div>
            <div className={`container col-12 text-center`} style={{ height: '400px', margin: '0 auto', paddingTop: '15vh' }} >
                <div className={`${stylesPanels.center} col-12 col-sm-10 col-md-9 `} style={{ zIndex: '30', }}>
                    <p className='pt-4 mb-0' style={{ fontSize: '1.8rem', fontWeight: '100', color: '#333' }}>הגדרות</p>
                    {!isClicked ?
                        <div className={`${styles.form}`} >
                            <div className={`col-12`}>
                                <div className={`col-7 col-sm-5 col-md-4 col-lg-3 col-xl-2 mb-5 mt-4 ${styles.settingImgDiv}`}
                                    style={{
                                        backgroundColor: 'black',
                                        borderRadius: '50%',
                                        margin: '0 auto'
                                    }}>
                                    <img
                                        className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${styles.settingImg}`}
                                        style={{
                                            objectFit: 'cover',
                                            margin: '0 auto',
                                            borderRadius: '50%',
                                            height: '164px'
                                        }}
                                        src={!user.avatarUrl ?
                                            !img ?
                                                require('../../../../../utils/imgs/istockphoto-1337144146-612x612.jpg') :
                                                URL.createObjectURL(img) :
                                            !img ? `${base_url}${user.avatarUrl}` :
                                                URL.createObjectURL(img)}
                                        alt={user.fullName!}
                                        onClick={handlePicker} />
                                    <input
                                        ref={filePicker}
                                        className={`${styles.hiddenInput}`}
                                        type='file'
                                        onChange={(e) => setImg(e.target.files![0])}
                                        accept='image/*, .png,.jpg,.gif,.web' />
                                </div>
                            </div>
                            <div className={`${styles.txt_field} text-end`}>
                                <input type="text"
                                    className='text-end'
                                    value={name!}
                                    onChange={(e) => setName(e.target.value)}
                                    required />
                                <label>שם מלא</label>
                                <span></span>
                            </div>
                            <div className={`${styles.txt_field} text-end`}>
                                <input type="text"
                                    className='text-end'
                                    value={tel!}
                                    onChange={(e) => setTel(e.target.value)}
                                    required />
                                <label>טלפון</label>
                                <span></span>
                            </div>
                            {user.roles?.toString().toLocaleLowerCase().includes('user') ?

                                <div className={`${styles.divSubmit}`}>
                                    <input className='' type="submit" value="לשינוי מידע" onClick={() => setIsClicked(true)} />
                                </div>

                                :

                                null
                            }
                            <div className={`${styles.divSubmit} pt-2`}>
                                <input className='' type="submit" value="לשמור שינויים" onClick={() => handleSubmit()} />
                            </div>
                            <div className='pt-2'>
                                {!deleteChecker ?
                                    <button
                                        className={`${styles.removeRoleButton}`}
                                        onClick={() => setDeleteChecker(true)}
                                    >למחוק משתמש
                                    </button>

                                    :

                                    <div className='row row-cols-2'>
                                        <div className='col'>
                                            <input type="submit" value="לחזור" onClick={() => setDeleteChecker(false)} />
                                        </div>
                                        <button
                                            className={`${styles.removeRoleButton} col`}
                                            onClick={() => {
                                                try {
                                                    dispatch(deleteUser(user._id!))
                                                } catch (error) {
                                                    console.log(error);
                                                }
                                                setIsOn(false)
                                            }}
                                        >למחוק
                                        </button>
                                    </div>
                                }
                            </div>
                            <div className='text-center'>
                                <p className={`${styles.pass} py-3`} onClick={() => setIsOn(false)}>לחזור</p>
                            </div>
                        </div>

                        :

                        <ModalDataChanger setIsOn={setIsClicked} user={user} />
                    }
                </div>
            </div>
        </div>

        :

        null
    )
}

export default ModalChanger