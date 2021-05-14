import React, {useState} from 'react';
import './css/App.scss';

import {Button, Heading, Flex} from "@chakra-ui/react"

import LessonList from './components/LessonList';
import LessonBar from './components/LessonBar';
import LessonForm from './components/LessonForm';

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Flex direction="column" height="100vh">
      <Heading align="center" my="2rem" fontSize="32px">My Progress</Heading>
      <LessonList />
      <LessonBar />
      </Flex>

      <Button 
        position="absolute" top="1em" right="1em" zIndex="100"
        onClick={() => setShowForm(prev => !prev)}
      >
        {showForm ? "Close panel" : "Add lesson"}
      </Button>
      {showForm && 
        <LessonForm setShowForm={setShowForm} />
      }
    </>
  );
}

export default App;
