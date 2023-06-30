import React from 'react'
import DateObject from "react-date-object"

const DatePost = ({date}) => {
    const datePost = new DateObject(date)
    const dateNow = new DateObject()
    
    let postSince = ''
    const postSinceYears = dateNow.year - datePost.year
    const postSinceMonths = dateNow.month - datePost.month
    const postSinceDays = dateNow.day - datePost.day
    const postSinceHours = dateNow.hour - datePost.hour
    const postSinceMinutes = dateNow.minute - datePost.minute
    const postSinceSecondes = dateNow.secondes - datePost.seconde

    const setPostSince = () => {
        if (postSinceYears > 0) {
            postSince = postSinceYears + ' an'            
            if (postSinceYears > 1) {
                postSince += 's'
            }
        }
        else if ((postSinceMonths) > 0) {
            postSince = postSinceMonths + ' mois'   
        }
        else if ((postSinceDays) > 0) {
            postSince = postSinceDays + ' jour'
            if (postSinceDays > 1) {
                postSince += 's'
            }
        }
        else if ((postSinceHours) > 0) {
            postSince = postSinceHours + ' heure'
            if (postSinceHours > 1) {
                postSince += 's'
            }
        }
        else if ((postSinceMinutes) > 0) {
            postSince = postSinceMinutes + ' minute'            
            if (postSinceMinutes > 1) {
                postSince += 's'
            }
        }
        else if ((postSinceSecondes) > 0) {
            postSince = postSinceSecondes                 
            if (postSinceSecondes > 1) {
                postSince = postSinceSecondes + 's'
            }               
        }
    }
    setPostSince()
    return (
        <div className='posts__preview__date'>Il y a {postSince}</div>
    );
};

export default DatePost;