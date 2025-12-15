export const flexDefinitions = {
    flexDirection: {
        title: 'flex-direction',
        description: 'Determines how the flex items are placed inside the flex container (main axis vs cross axis).',
        options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    flexWrap: {
        title: 'flex-wrap',
        description: 'Determines whether flex items are forced onto one line or can wrap onto multiple lines.',
        options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
    justifyContent: {
        title: 'justify-content',
        description: 'Determines how the flex items are distributed along the main axis of the flex container.',
        options: [
            'flex-start',
            'flex-end',
            'center',
            'space-between',
            'space-around',
            'space-evenly',
        ],
    },
    alignItems: {
        title: 'align-items',
        description: 'Defines the default behavior for how flex items are laid out along the cross axis on the current line.',
        options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
    },
    alignContent: {
        title: 'align-content',
        description: 'Aligns a flex container\'s lines within the flex container when there is extra space in the cross-axis.',
        options: [
            'stretch',
            'flex-start',
            'flex-end',
            'center',
            'space-between',
            'space-around',
        ],
    },
    alignSelf: {
        title: 'align-self',
        description: 'Allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.',
        options: ['auto', 'stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
    },
    rowGap: {
        title: 'row-gap',
        description: 'Sets the size of the gap between rows in a flex container.',
    },
    columnGap: {
        title: 'column-gap',
        description: 'Sets the size of the gap between columns in a flex container.',
    },
    gap: {
        title: 'gap',
        description: 'Shorthand for row-gap and column-gap. Syntax: gap: <row-gap> <column-gap>; or gap: <both>;',
    },
    flex: {
        title: 'flex',
        description: 'Shorthand for flex-grow, flex-shrink and flex-basis. Syntax: flex: <grow> <shrink> <basis>;',
    },
} as const;
