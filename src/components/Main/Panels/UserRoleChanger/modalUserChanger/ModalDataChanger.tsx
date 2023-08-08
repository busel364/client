import React, { useEffect, useState } from 'react'
import styles from '../../../UserPage/modules/userAcc.module.css'
import stylesPanels from '../../modules/panels.module.css'
import DescriptionChanger from '../../../UserPage/UserAccPage/profilePages/description/DescriptionChanger';
import { UserData } from '../../../../../utils/types/UserTypes';
import PriceChangerPanel from './PriceChangerPanel';

interface Props {
    user: UserData,
    setIsOn: (a: boolean) => void
}

const ModalDataChanger = ({ setIsOn, user }: Props) => {
    const [value, setValue] = useState(false);
    const [menu, setMenu] = useState(0);

    return (value && menu === 1 ?

        <div className={`${styles.form}`} style={{ overflowY: 'scroll', height: '640px' }}>
            <div className={`col-sm-10 col-md-12`} >
                <DescriptionChanger variant={2} _id={user._id!} description={user.description} setIsOn={setValue} />
            </div>
        </div>

        :

        value && menu === 2 ?

            <div className={`${styles.form}`} style={{ overflowY: 'scroll', height: '640px' }}>
                <div className={`col-sm-10 col-md-12`} >
                    <PriceChangerPanel user={user} setIsOn={setValue} />
                </div>
            </div>

            :

            <div className={`${styles.form}`} style={{}}>
                <div className={`col-sm-10 col-md-12`} >
                    <div className={`${styles.divSubmit} py-5 mt-5`}>
                        <input className='' type="submit" value="לשינוי אודות" onClick={() => {
                            setValue(true)
                            setMenu(1)
                        }} />
                    </div>
                    <div className={`${styles.divSubmit} py-5`}>
                        <input className='' type="submit" value="לשינוי מחירים" onClick={() => {
                            setValue(true)
                            setMenu(2)
                        }} />
                    </div>
                    <div className='text-center  mb-5'>
                        <p className={`${styles.pass} py-3`} onClick={() => setIsOn(false)}>לחזור</p>
                    </div>
                </div>
            </div>
    )
}

export default ModalDataChanger