import React, { useRef, useState } from 'react'
import styles from '../../modules/userAcc.module.css'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { fetchImage, updateUser } from '../../../../../reducers/AsyncActions/AccountActions';
import { base_url } from '../../../../../utils/utils';

interface Props{
    setChangePassword:(v:boolean)=>void
    setIsSettingsOn: (v:boolean)=>void
}


const Settings = ({setChangePassword,setIsSettingsOn}:Props) => {

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);

    const [name, setName] = useState(user.fullName);
    const [tel, setTel] = useState(user.tel);

    const [img, setImg] = useState<any>(null);
    const filePicker = useRef<any>(null);

    const handlePicker = () => {
        filePicker.current!.click();
    }

    const handleSubmit = () => {
        if (img) {
            dispatch(
                fetchImage(img,
                    {
                        _id: user._id!,
                        tel: user.tel!,
                        fullName: name!,
                        avatarUrl: user.avatarUrl!,
                        token: user.token!
                    }
                )
            )
        } else {
            dispatch(
                updateUser(
                    {
                        _id: user._id!,
                        tel: user.tel!,
                        fullName: name!,
                        avatarUrl: user.avatarUrl!,
                        token: user.token!
                    }
                )
            )
        }
    }


    return (
        <div className={`container col-12 py-5 my-5 text-center`}>
            <div className={`${styles.center} col-10 col-sm-6 col-md-5 py-3 my-5`}>
                <p className='pt-4 mb-0' style={{ fontSize: '1.8rem', fontWeight: '100', color: '#333' }}>הגדרות</p>
                <div className={styles.form}>
                    <div className={`col-sm-10 col-md-12`}>
                        <div className={`col-9 col-sm-12 col-md-9 col-lg-6 col-xl-4 mb-5 mt-4 ${styles.settingImgDiv}`}
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
                            value={name!}
                            onChange={(e) => setName(e.target.value)}
                            required />
                        <label>שם מלא</label>
                        <span></span>
                    </div>
                    <div className={`${styles.txt_field} text-end`}>
                        <input type="text"
                            value={tel!}
                            onChange={(e) => setTel(e.target.value)}
                            required />
                        <label>טלפון</label>
                        <span></span>
                    </div>
                    <input type="submit" value="לשמור שינויים" onClick={() => handleSubmit()} />
                    <div className='row'>
                        <p className={`${styles.pass} mt-4 col-12 col-lg-6 m-0`} onClick={() => setChangePassword(true)}>לשינוי סיסמא</p>
                        <p className={`${styles.pass} mt-4 col-12 col-lg-6 m-0`} onClick={() => setIsSettingsOn(false)}>לחזור</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Settings