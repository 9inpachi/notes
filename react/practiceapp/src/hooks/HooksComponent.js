import React, { useState, useEffect, useContext } from 'react';

// function HooksComponent({ count }) {
//     var [count, setCount] = useState(count);
//     var [someVar, setSomeVar] = useState(23);
//     // When the component is initiated or updated (can be w.r.t the 2nd argument)
//     useEffect(() => {
//         console.log('useEffect called');
//     }, [someVar]);
//     return (
//         <div>
//             <p>Count: {count}</p>
//             <button onClick={() => setCount(count + 1)}>Increase</button>
//             <button onClick={() => setCount(count - 1)}>Decrease</button>
//         </div>
//     );
// }

// For useContext
var themes = {
    dark: {
        type: 'dark',
        foreground: '#b8b8b8',
        background: '#292929'
    },
    light: {
        type: 'light',
        foreground: '#292929',
        background: '#b8b8b8'
    }
}

var ThemeContextDark = React.createContext(themes.dark);

function HooksComponent() {
    var theme = useContext(ThemeContextDark);
    return (
        <div>
            <p style={{background: theme.background, color: theme.foreground}}>Styled by theme context</p>
            <button>Change Theme</button>
        </div>
    );
}

export default HooksComponent;