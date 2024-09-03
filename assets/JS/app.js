
const billInput = document.getElementById('bill');
const personInput = document.getElementById('person');
const customPerInput = document.getElementById('customPer');
const tipDiv = document.getElementById('tip');
const totalDiv = document.getElementById('total');
const selectBtn = document.querySelector('.select-btn');
const resetButton = document.getElementById('reset');

const personErrorMessage = document.getElementById('person-message');
personErrorMessage.textContent = "Can't be zero";
personErrorMessage.style.color = 'red';

const originalBackgroundColor = resetButton.style.backgroundColor;

billInput.addEventListener('input', updateResetButtonStyle);
personInput.addEventListener('input', updateResetButtonStyle);
customPerInput.addEventListener('input', updateResetButtonStyle);

selectBtn.addEventListener('click', (event) => {
    const clickedDiv = event.target;

    if (clickedDiv.tagName === 'DIV') {
        const tipPercentage = parseInt(clickedDiv.textContent.replace('%', ''));
        calculateTip(tipPercentage);
    }
});

customPerInput.addEventListener('input', () => {
    calculateTip(parseFloat(customPerInput.value));
});

resetButton.addEventListener('click', reset);

function updateResetButtonStyle() {
    if (billInput.value !== '' || personInput.value !== '' || customPerInput.value !== '') {
        resetButton.style.backgroundColor = 'hsl(172, 67%, 45%)';
    } else {
        resetButton.style.backgroundColor = originalBackgroundColor;
    }
}

personErrorMessage.style.display = 'none'; 
personInput.style.border = '1px solid hsl(189, 41%, 97%)';

function calculateTip(tipPercentage) {
    const bill = parseFloat(billInput.value);
    const person = parseInt(personInput.value);

    if (personInput.value === '') {
        personErrorMessage.style.display = 'block';
        personInput.style.border = '2px solid red';
        return;
    } else {
        personErrorMessage.style.display = 'none'; 
        personInput.style.border = '1px solid hsl(189, 41%, 97%)';
    }

    const tip = ((bill * tipPercentage) / 100) / person;
    const total = (bill + tip) / person;

    tipDiv.textContent = `$${tip.toFixed(2)}`;
    totalDiv.textContent = `$${total.toFixed(2)}`;
}

function reset() {
    billInput.value = '';
    personInput.value = '';
    personErrorMessage.style.display = 'none'; 
    personInput.style.border = '1px solid hsl(189, 41%, 97%)';
    customPerInput.value = '';
    tipDiv.textContent = '$0.00';
    totalDiv.textContent = '$0.00';
    document.querySelector('.select-btn div.active').classList.remove('active');
    resetButton.style.backgroundColor = originalBackgroundColor;
}