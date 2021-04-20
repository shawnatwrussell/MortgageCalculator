function createChart(dataset) {
    var ctx = document.getElementById('myChart');
    let position = dataset.length - 1;
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Principal', 'Interest'],
            datasets: [{
                label: '% of total',
                data: [dataset[position].totalPrincipal.toFixed(2), dataset[position].totalInterest.toFixed(2)],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }]
        },
    });

}