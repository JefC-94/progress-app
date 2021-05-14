import React from 'react';
import {useProgress} from '../contexts/ProgressContext';
import {Button, Box, Text, Divider, Container, Grid, Flex, GridItem} from '@chakra-ui/react';
import {DeleteIcon} from '@chakra-ui/icons';

function LessonList() {

    const {lessons, updateLesson, deleteLesson} = useProgress();

    function makeDate(datestring){
        let date = new Date(datestring * 1000);
        let month = date.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
        return date.getDate() + " " + month + " " + date.getFullYear();
    }

    return (
        <Box w="600px" mx="auto" my="2em" minHeight="200px" overflowY="auto" >
            {lessons && lessons.map((lesson, index) => {
                return (
                    <Container 
                        backgroundColor={index % 2 === 0 ? "gray.50" : "white"}
                        key={lesson.id} m="0" p="0" borderLeftWidth="4px" 
                        
                        borderLeftColor={
                            lesson.attended === 0 ? "grey.400" : lesson.attended === 1 ? "red.400" : "green.300"
                        }
                    >
                    <Grid paddingLeft="1em" templateColumns="repeat(3, 1fr)" gap={6} paddingY="1em" alignItems="center">
                        <Box>
                            <Text fontWeight="600">{makeDate(lesson.date)}</Text>
                            <Text fontSize="14px" color="gray.500">{lesson.location_id.building}</Text>
                        </Box>
                        <Box>
                            {lesson.attended !== 0 && <Text fontStyle="italic">{lesson.attended === 2 ? "Attended" : "Skipped"}</Text>}
                        </Box>
                        <Flex justifyContent="flex-end">
                            {lesson.attended !== 2 && <Button variant="secondary" size="sm" onClick={() => updateLesson(lesson.id, 2)} >I went</Button>}
                            {lesson.attended !== 1 && <Button variant="secondary" size="sm" onClick={() => updateLesson(lesson.id, 1)} >I skipped</Button>}    
                            
                            {<Button mx="3" variant="basic" size="sm" onClick={() => deleteLesson(lesson.id)} ><DeleteIcon color="gray.600" /></Button>}
                        </Flex>
                    </Grid>
                    <Divider />
                    </Container>
                )
            })}
        </Box>
    )
}

export default LessonList
