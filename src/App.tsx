import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/lara-light-indigo/theme.css";  
import "primereact/resources/primereact.min.css";                  
import "primeicons/primeicons.css";    
import { useState } from 'react';

function App() {

    const [displayBasic, setDisplayBasic] = useState(false);

    const [position, setPosition] = useState('center');

    const dialogFuncMap: any = {
        'displayBasic': setDisplayBasic,
    }

    const onClick = (name: string, position: any) => {
        dialogFuncMap[`${name}`](true);
        if (position) {
            setPosition(position);
        }
    }
const onHide = (name: string) => {
        dialogFuncMap[`${name}`](false);
    }
const renderFooter = (name: string) => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
            </div>
        );
    }

  return (
    <div className="">
<Button label="Show" icon="pi pi-external-link" onClick={() => onClick('displayBasic')} />
                <Dialog header="Header" visible={displayBasic} style={{ width: '70vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Dialog>
        <Button className="p-button-sm" label="Save" />
    </div>
  )
}

export default App
