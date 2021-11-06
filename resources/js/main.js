import h from 'virtual-dom/h.js'
import {unified} from 'unified'
import english from 'retext-english'

const processor = unified().use(english)
const root = document.querySelector('#root')
let tree = render(document.getElementById("text"))
let dom = root.appendChild(createElement(tree))

function onchange(ev) {
    console.log("CHANGED!")
    const next = render(ev.target.value)
    dom = patch(dom, diff(tree, next))
    tree = next
}

function render(text) {
    const node = parse(text)

    return h('div', {classname: 'editor'}, [
        h('div', {key: 'draw', className: 'draw'}, underline(node)),
        h('textarea', {
            key: 'area',
            value: text,
            oninput: onchange
        })
    ])

    function underline() {
        
    }
}

window.myApp = {
    showInfo: () => {
        document.getElementById('info').innerHTML = `
            ${NL_APPID} is running on port ${NL_PORT}  inside ${NL_OS} 
            <br/><br/>
            <span>server: v${NL_VERSION} . client: v${NL_CVERSION}</span>
            `;
    },
    openDocs: () => {
        Neutralino.os.open("https://neutralino.js.org/docs");
    },
    openTutorial: () => {
        Neutralino.os.open("https://www.youtube.com/watch?v=txDlNNsgSh8&list=PLvTbqpiPhQRb2xNQlwMs0uVV0IN8N-pKj");
    },
    setTray: () => {
        if(NL_MODE != "window") {
            console.log("INFO: Tray menu is only available in the window mode.");
            return;
        }
        let tray = {
            icon: "/resources/icons/trayIcon.png",
            menuItems: [
                {id: "VERSION", text: "Get version"},
                {id: "SEP", text: "-"},
                {id: "QUIT", text: "Quit"}
            ]
        };
        Neutralino.os.setTray(tray);
    },
    onTrayMenuItemClicked: (event) => {
        switch(event.detail.id) {
            case "VERSION":
                Neutralino.os.showMessageBox("Version information",
                    `Neutralinojs server: v${NL_VERSION} | Neutralinojs client: v${NL_CVERSION}`);
                break;
            case "QUIT":
                Neutralino.app.exit();
                break;
        }
    },
    onWindowClose: () => {
        Neutralino.app.exit();
    }
};

// Initialize native API communication. This is non-blocking
// use 'ready' event to run code on app load.
// Avoid calling API functions before init or after init.
Neutralino.init(); 

Neutralino.events.on("trayMenuItemClicked", myApp.onTrayMenuItemClicked);
Neutralino.events.on("windowClose", myApp.onWindowClose);
Neutralino.events.on("ready", () => {
    if(NL_OS != "Darwin") { // TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
        window.myApp.setTray();
    }
})

window.myApp.showInfo();
