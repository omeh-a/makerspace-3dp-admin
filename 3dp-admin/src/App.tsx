import React from 'react';
import ReactDOM from 'react-dom';

const App: React.FC = () => {
    return (
        <div className="App">
            <p>REACTED!</p>
        </div>
    )
}

// Need to ignore the type of ReactDOM here because
// it is poorly supported, and apparently does not work
// in electron at all.
// @ts-ignore
const root = ReactDOM.createRoot(
    document.getElementById('root')
)

root.render(<App/>);