import React from 'react'
import { UserData } from '../../../../utils/types/UserTypes'
import Comments from './profilePages/comments/Comments'
import Grafics from './profilePages/Grafics/Grafics'
import Description from './profilePages/description/Description'
import Prices from './profilePages/prices/Prices'
import { useAppSelector } from '../../../../app/hooks'
import CommentsGuest from './profilePages/comments/CommentsGuest'
import QuestionsGuest from './profilePages/questions/QuestionsGuest/QuestionsGuest'
import DescriptionGuest from './profilePages/description/DescriptionGuest'
import PricesGuest from './profilePages/prices/PricesGuest'
import PreComments from './profilePages/comments/PreComments'
import NullPrice from './profilePages/prices/NullPrice'
import Questions from './profilePages/questions/QuestionsUser/Questions'

interface Props {
    user: UserData,
    curPage: string
}


const UserProfileCurPage = ({ user, curPage }: Props) => {
    const userState = useAppSelector(state => state.user);
    if (curPage === 'חוות דעת') {
        return (
            <PreComments user={user} />
        )
    }
    if (curPage === 'שאלות') {
        return (
            user._id === userState._id ? <Questions questionsAndAnswers={user.questionsAndAnswers!}/> : <QuestionsGuest user={user} questionsAndAnswers={user.questionsAndAnswers!}/>
        )
    }
    if (curPage === 'גרפים') {
        return (
            <Grafics />
        )
    }
    if (curPage === 'אודות') {
        return (
            user._id === userState._id ? <Description description={user.description} /> : <DescriptionGuest description={user.description} />
        )
    }
    if (curPage === 'מחירים') {
        return (
            user._id === userState._id ?

                <Prices user={user} />

                :

                user.prices && user.prices.length > 0 ?

                    <PricesGuest user={user} />

                    :

                    <div
                        className='my-5'
                        style={{ paddingBottom: '170px' }}>
                        <NullPrice />
                    </div>
        )
    } else {
        return null;
    }
}

export default UserProfileCurPage
