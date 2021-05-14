import React, {useState} from 'react';
import {useProgress} from '../contexts/ProgressContext';

import {Box, Progress, Text, Skeleton, Heading} from "@chakra-ui/react"

function LessonBar() {

    const {attendance, scheme} = useProgress();
    const [loading] = useState(false);

    return (   
        <Box w="600px" mx="auto" my="1em" height="150px">
            <Skeleton isLoaded={!loading} height="100px">
                <Progress 
                    colorScheme={scheme.color} 
                    value={attendance*100} 
                    height="50px" 
                    borderRadius="10px"
                />
                {attendance >= 0 &&
                <Heading align="center" my="1rem" fontSize="2em" as="h2">
                    {(attendance*100).toFixed()+"%"}
                </Heading>}
                <Text align="center" mt=".5em">
                    {scheme.message}
                </Text>
            </Skeleton>
        </Box>
    )
}

export default LessonBar
