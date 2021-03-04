const fileName = document.querySelector("#fileName");

function dropHandler(ev) {
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        let fileStuff = "";
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {

            if (ev.dataTransfer.items[i].kind === 'file') {
                var file = ev.dataTransfer.items[i].getAsFile();
                fileStuff = fileStuff + " " + file.name;

                fileName.innerHTML = fileStuff;
            }
        }
    }
}

function dragOverHandler(ev) {
    ev.preventDefault();
}