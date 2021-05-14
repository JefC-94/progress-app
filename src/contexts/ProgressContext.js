import React, {createContext, useContext, useState, useEffect} from 'react';
import {axiosObject} from '../Constants';
import {useToast} from '@chakra-ui/react';


const ProgressContext = createContext();

export function useProgress(){
    return useContext(ProgressContext);
}

export function ProgressProvider(props){
    const [lessons, setLessons] = useState([]);
    const toast = useToast();

    const [attendance, setAttendance] = useState(0)
    const [scheme, setScheme] = useState({
        message: "",
        color: ""
    });

    useEffect(() => {
        getLessons();
        return () => {
            setLessons([]);
        }
    }, []);

    //CALCULATE ATTENDANCE EVERYTIME LESSONS CHANGE
    useEffect(() => {
        //calculate the attended lessons in relation to the attended+skipped lessons (ie the lessons that are set)
        if(lessons.filter(el => el.attended !== 0).length === 0){
            setAttendance(-1);
        } else {
            setAttendance(lessons.filter(el => (el.attended === 2)).length / (lessons.filter(el => el.attended !== 0).length).toFixed(2));
        }
    }, [lessons]);

    //REMAKE SCHEME WHEN ATTENDANCE CHANGES
    useEffect(() => {
        getScheme();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attendance]);

    // GET/READ CRUD OPERATION:

    async function getLessons(){
        const request = await axiosObject.get(`/lesson?join=location&order=date`);
        setLessons(request.data.records);
    }

    // OTHER CRUD OPERATIONS FOR LESSONS

    // ADD

    async function addLesson(date, location){
        try{
            const request = await axiosObject.post(`/lesson`, {
                date : date,
                attended : 0,
                location_id: location
            });
            console.log(request.data);
            getLessons();
            toast({
                title: "Lesson added",
                description: "New lesson has been added",
                status: "success",
                duration: 2000,
                isClosable: true
            });
        } catch(err){
            console.log(err);
            toast({
                title: "Error",
                description: "Something went wrong",
                status: "error",
                duration: 2000,
                isClosable: true
            });
        }
    }

    // UPDATE

    async function updateLesson(id, att){
        try{
            const request = await axiosObject.put(`/lesson/${id}`, {
                attended: att
            });
            console.log(request);
            getLessons();
        } catch(err) {
            console.log(err);
            toast({
                title: "Error",
                description: "Something went wrong",
                status: "error",
                duration: 2000,
                isClosable: true
            });
        }
    }

    // DELETE

    async function deleteLesson(id){
        try{
            const request = await axiosObject.delete(`/lesson/${id}`);
            console.log(request.data);
            getLessons();
        } catch(err){
            console.log(err);
        }
    }

    //ATTENDANCE CALCULATIONS:

    function getScheme(){
        switch(true){
            case attendance >= .90:
                setScheme(prevVal => ({...prevVal, message: "You're doing amazing!", color: "green"}));
                break;
            case attendance >= .66 && attendance < .90:
                setScheme(prevVal => ({...prevVal, message: "This is going great!", color: "green"}));
                break;
            case attendance > .5 && attendance < .66:
                setScheme(prevVal => ({...prevVal, message: "Just a little more!", color: "orange"}));
                break;
            case attendance > .25 && attendance <= .5:
                setScheme(prevVal => ({...prevVal, message: "You have to do better!", color: "red"}));
                break;
            case attendance >= 0 && attendance <= .25:
                setScheme(prevVal => ({...prevVal, message: "You're going to have to do something about this!", color: "red"}));
                break;
            case attendance === -1:
                setScheme(prevVal => ({...prevVal, message: "You have not set any attendances yet", color: "grey"}));
                break;
            default:
                setScheme({message: "", color: ""});
        }
    }

    return (
        <ProgressContext.Provider value={{
            lessons,
            addLesson,
            deleteLesson,
            updateLesson,
            attendance,
            scheme
        }} >
            {props.children}
        </ProgressContext.Provider>
    )

}