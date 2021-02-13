//Retriving the elements

const consoleLogList = document.querySelector('.editor__console-logs');
const executeCodeBtn = document.querySelector('.editor__run');
const resetCodeBtn = document.querySelector('.editor__reset');

// Setup Ace
let codeEditor = ace.edit("editorCode");
let defaultCode = 'console.log("Hello World");';
let consoleMessages = [];

let editorLib = {

    clearConsoleScreen() {

        consoleMessages.length = 0;
        
        //Remove all elemts of the log list
        while (consoleLogList.firstChild) {
            consoleLogList.removeChild(consoleLogList.firstChild);
        }
    },
    
    printToConsole() {
        consoleMessages.forEach(log => {
            const newLogItem = document.createElement('li');
            const newLogText = document.createElement('pre');

            newLogText.className = log.class;
            newLogText.textContent = `> ${log.message}`;

            newLogItem.appendChild(newLogText);

            consoleLogList.appendChild(newLogItem);
        })
    },
   init() {
    //Configure Ace

    //Theme
    codeEditor.setTheme("ace/theme/dracula");

    //Set language
    codeEditor.session.setMode("ace/mode/javascript");
    //Set options
    codeEditor.setOptions({
        fontSize: '12pt',
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
    });

    //Set the default
    codeEditor.setValue(defaultCode);

   }

}

//Events for buttons

executeCodeBtn.addEventListener('click', () => {

     //Clear console messages
     editorLib.clearConsoleScreen();

    //Get the input code
    const userCode = codeEditor.getValue();

    //Run and display the results
    try {
        new Function(userCode)();
    } catch (err){
        console.error(err);
    }
    //Print the console messages
    editorLib.printToConsole();
});

resetCodeBtn.addEventListener('click', () => {

    codeEditor.setValue(defaultCode);

    //Clear console messages
    editorLib.clearConsoleScreen();
});

editorLib.init();
