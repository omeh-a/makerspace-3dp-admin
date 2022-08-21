import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Main from './pages/Main';

function render(): void {
  ReactDOM.render(<Main/>, document.body);
}

render();