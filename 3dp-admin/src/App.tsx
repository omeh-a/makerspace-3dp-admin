import React from 'react';
import ReactDOM from 'react-dom';
import SideBar from './components/Sidebar';

const App: React.FC = () => {
    return (
        <div className="App">
            <SideBar/>
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