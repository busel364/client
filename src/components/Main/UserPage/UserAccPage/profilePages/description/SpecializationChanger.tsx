import React, { useEffect, useState } from 'react'
import styles from '../../../modules/userProfilePages.module.css'
import { DeleteOutlined } from '@ant-design/icons';

interface Props {
    item: string,
    index: number,
    removeSpecialization: (a: number) => void
    changeSpecialization: (a: number, e: any) => void
}


const SpecializationChanger = ({ index, item, changeSpecialization, removeSpecialization }: Props) => {    

    const [value, setValue] = useState(item);

    return (
        <div>
            <div className={`${styles.txt_field} text-end`}>
                <input type="text"
                    className='text-end'
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                        changeSpecialization(index, e.target.value)
                    }}
                    required />
                <label className='text-end'>תחום התמחות</label>
                <span></span>
            </div>
            <div className='text-end'>
                <DeleteOutlined
                    className={`${styles.deleteButton} mx-3`}
                    title='למחוק'
                    onClick={() => removeSpecialization(index)} />
            </div>
        </div>
    )
}

export default SpecializationChanger