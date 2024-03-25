let counter = 0;

function count(){
    counter++;
    document.querySelector("h1").innerHTML = counter;
    if (counter % 10 === 0) {
        alert(`Count is now ${counter}`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button').onclick = count; /* count without parentheses does not include the return value of the count() function */
});
