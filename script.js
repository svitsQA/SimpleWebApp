function loadData(month, year) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const selectedMonthYear = `${month} ${year}`;
            const selectedData = data[selectedMonthYear] || [];

            // Обновление каждой строки таблицы
            updateRow('rent', selectedData.find(item => item.hasOwnProperty('rent_is_paid')));
            updateRow('rentMedia', selectedData.find(item => item.hasOwnProperty('rentMedia_is_paid')));
            updateRow('englishSvitlana', selectedData.find(item => item.hasOwnProperty('englishSvitlana_is_paid')));
            updateRow('englishYaroslav', selectedData.find(item => item.hasOwnProperty('englishYaroslav_is_paid')));
            updateRow('schoolBreakfast', selectedData.find(item => item.hasOwnProperty('schoolBreakfast_is_paid')));
            updateRow('robotyka', selectedData.find(item => item.hasOwnProperty('robotyka_is_paid')));
            updateRow('mathematics', selectedData.find(item => item.hasOwnProperty('mathematics_is_paid')));
            updateRow('internet', selectedData.find(item => item.hasOwnProperty('internet_is_paid')));
            updateRow('accountant', selectedData.find(item => item.hasOwnProperty('accountant_is_paid')));
            updateRow('zus', selectedData.find(item => item.hasOwnProperty('zus_is_paid')));
            updateRow('tax', selectedData.find(item => item.hasOwnProperty('tax_is_paid')));
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
}


function updateRow(prefix, data) {
    const isPaidCell = document.getElementById(`${prefix}IsPaid`);
    const paymentDateCell = document.getElementById(`${prefix}PaymentDate`);
    const paymentAmountCell = document.getElementById(`${prefix}PaymentAmount`);

    if (data) {
        const isPaidInput = isPaidCell.querySelector('input[type="checkbox"]');
        isPaidInput.checked = data[`${prefix}_is_paid`];
        const paymentDateInput = paymentDateCell.querySelector('input[type="date"]');
        paymentDateInput.value = data[`${prefix}_payment_date`] || '';
        const paymentAmountInput = paymentAmountCell.querySelector('input[type="number"]');
        paymentAmountInput.value = data[`${prefix}_payment_amount`] || '';
    } else {
        // Если данных нет, поля будут оставаться пустыми
        isPaidCell.querySelector('input[type="checkbox"]').checked = false;
        paymentDateCell.querySelector('input[type="date"]').value = '';
        paymentAmountCell.querySelector('input[type="number"]').value = '';
    }
}

document.getElementById('monthSelect').addEventListener('change', function() {
    const selectedMonth = this.value;
    const selectedYear = document.getElementById('yearSelect').value;
    loadData(selectedMonth, selectedYear);
});

document.getElementById('yearSelect').addEventListener('change', function() {
    const selectedMonth = document.getElementById('monthSelect').value;
    const selectedYear = this.value;
    loadData(selectedMonth, selectedYear);
});

const currentMonth = document.getElementById('monthSelect').value;
const currentYear = document.getElementById('yearSelect').value;
loadData(currentMonth, currentYear);

document.getElementById('saveButton').addEventListener('click', function() {
    const updatedData = {
        January_2024: {
            rent_is_paid: document.getElementById('rentIsPaid').querySelector('input[type="checkbox"]').checked,
            rent_payment_date: document.getElementById('rentPaymentDate').querySelector('input[type="date"]').value,
            rent_payment_amount: document.getElementById('rentPaymentAmount').querySelector('input[type="number"]').value,
            // Повторить этот процесс для остальных данных
        }
    };

    fetch('http://localhost:8080/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data saved successfully:', data);
    })
    .catch(error => {
        console.error('Error saving data:', error);
    });
});


