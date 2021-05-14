import React from 'react'

import {IconButton} from '@chakra-ui/react';

function ArrowButton({slide, icon, disabled}) {

    return (
        <IconButton 
            variant="arrow"
            _hover={{ color: "gray.600" }}
            onClick={() => slide()}
            icon={icon}
            disabled={disabled}
        />
    )
}

export default ArrowButton
