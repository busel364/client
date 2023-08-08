import React, { useEffect, useState } from 'react'
import styles from '../../../modules/userProfilePages.module.css'
import { DescriptionUser } from '../../../../../../utils/types/UserTypes'
import SpecializationChanger from './SpecializationChanger'
import { PlusCircleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { updateDescription } from '../../../../../../reducers/AsyncActions/AccountActions';
import { adminUpdateDescription } from '../../../../../../reducers/AsyncActions/SelectedUserActions';

interface Props {
    description: DescriptionUser | null,
    setIsOn: (a: boolean) => void,
    _id: string,
    variant: number
}

const DescriptionChanger = ({ description, setIsOn, _id, variant }: Props) => {

    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.user.token)

    const [exp, setExp] = useState(description?.experience ? description?.experience : '');
    const [main, setMain] = useState(description?.main ? description?.main : '');
    const [specializations, setSpecializations] = useState(description?.specialization ? description?.specialization : [''] as string[]);
    const [warrantly, setWarrantly] = useState(description?.warrantly ? description?.warrantly : '');


    const handleSubmit = () => {
        if (variant === 1) {
            try {
                dispatch(updateDescription(token!, { experience: exp, main, specialization: specializations, warrantly }, _id))
                setIsOn(false)
            } catch (error) {
                console.log(error);
            }
        }
        if (variant === 2) {
            try {
                dispatch(adminUpdateDescription(token!, { experience: exp, main, specialization: specializations, warrantly }, _id))
                setIsOn(false)
            } catch (error) {
                console.log(error);
            }
        }
    }

    const changeSpecialization = (index: number, e: any) => {
        const arr = specializations;
        arr[index] = e;
        setSpecializations(arr);
    }

    const removeSpecialization = (index: number) => {
        const arr = [...specializations];
        arr.splice(index, 1);
        setSpecializations(arr);
    }

    const handleAdderSpecialization = () => {
        const arr = [...specializations];
        arr.push('');
        setSpecializations(arr)
    }

    useEffect(() => {
    }, [specializations])


    return (
        <div className={`container col-12 py-5 text-center`}>
            <div className={`${styles.center} col-12 `}>
                <p className='pt-4 mb-0' style={{ fontSize: '1.8rem', fontWeight: '100', color: '#333' }}>אודות</p>
                <div className={styles.form}>
                    <div className={`col-sm-10 col-md-12 row m-0 p-0`}>
                        <div className={`${styles.txt_field}`}
                            style={{ textAlign: 'end', display: 'block' }}>
                            <textarea
                                className='text-end'
                                value={main}
                                onChange={(e) => setMain(e.target.value)}
                                required></textarea>
                            <label className={`${styles.labelTextArea}`} >מידע כללית</label>
                            <span className={`${styles.spanTextArea}`}></span>
                        </div>
                        <div className={`${styles.txt_field}`}
                            style={{ textAlign: 'end', display: 'block' }}>
                            <textarea
                                className='text-end'
                                value={exp}
                                onChange={(e) => setExp(e.target.value)}
                                required></textarea>
                            <label className={`${styles.labelTextArea}`} >ותק בתחום</label>
                            <span className={`${styles.spanTextArea}`}></span>
                        </div>
                        <div className={`${styles.txt_field}`}
                            style={{ textAlign: 'end', display: 'block' }}>
                            <textarea
                                className='text-end'
                                value={warrantly}
                                onChange={(e) => setWarrantly(e.target.value)}
                                required></textarea>
                            <label className={`${styles.labelTextArea}`} >האחריות כוללת</label>
                            <span className={`${styles.spanTextArea}`}></span>
                        </div>
                        {specializations.map((item, index) => <SpecializationChanger
                            item={item}
                            changeSpecialization={changeSpecialization}
                            removeSpecialization={removeSpecialization}
                            index={index}
                            key={item + "+" + index}
                        />)}
                        <div>
                            <PlusCircleOutlined
                                title='להוסיף תחום התמחות'
                                className={`${styles.plusSquareBig} my-3`}
                                onClick={handleAdderSpecialization}
                            />
                        </div>
                        <input className='col-6' type="submit" value="לשמור" onClick={() => handleSubmit()} />
                        <div className='text-center'>
                            <p className={`${styles.pass} my-3 pb-0`} style={{ width: '100px', margin: '0 auto' }} onClick={() => setIsOn(false)}>לחזור</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DescriptionChanger

