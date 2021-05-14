import React, {useState, useEffect} from 'react';
import {useProgress} from '../contexts/ProgressContext';
import {axiosObject} from '../Constants';

import {Button, Input, Container, Flex, Heading, Select} from '@chakra-ui/react';

function LessonForm({setShowForm}) {
    const [dateField, setDateField] = useState('');
    const [locations, setLocations] = useState([]);
    const [selLoc, setSelLoc] = useState();

    const {addLesson} = useProgress();

    useEffect(() => {
        fetchLocations();
    }, []);

    async function fetchLocations(){
        const request = await axiosObject.get(`/location`);
        setLocations(request.data.records);
        setSelLoc(request.data.records[0].id);
    }

    function formSubmit(){
        if(dateField){
            const date = Math.round(new Date(dateField).getTime()/1000);
            addLesson(date, selLoc);
            setDateField('');
            setShowForm(false);
        }
    }
    
    return (
        <Container 
        position="absolute" top="0px" right="0px" 
        backgroundColor="white" height="100%" 
        paddingY="5em" width="300px"
        borderLeftWidth="2px" borderColor="gray.400"
        >
            <Heading as="h4" fontSize="2xl" mb=".5em" align="center">Add a new lesson</Heading>
            <form onSubmit={(e) => {
                e.preventDefault();
                formSubmit();
            }}>
                <Flex direction="column">
                    <Input type="date" w="auto" value={dateField} onChange={(e) => setDateField(e.target.value)} />
                    <Select my="1em" value={selLoc} onChange={(e) => setSelLoc(e.target.value)}>
                        {locations && locations.map(location => {
                            return (
                                <option key={location.id} value={location.id} >{location.building}</option>
                            )
                        })}
                    </Select>
                    <Button borderRadius="5" variant="primary" type="submit">Add lesson</Button>
                </Flex>
            </form>
        </Container>
    )
}

export default LessonForm
