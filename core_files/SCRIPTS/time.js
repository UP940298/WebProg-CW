function time() {
    var today = new Date();
    document.getElementById('time').innerHTML = today.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true });
    var timer = setTimeout(time, 1000);
}