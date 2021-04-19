//Returns an array of information to be templated
function calculateLoan(amount, term, rate) {
    //TWO: Calculate the Collected User Data
    //Total Monthly Payment = (amount loaned) * (rate/1200) / (1 – (1 + rate/1200)^(-Number of Months) )
    let totalMonPay = (amount) * (rate / 1200) / (1 - Math.pow((1 + rate / 1200), -term));
    let remainingBal = amount; //Remaining Balance = Balance After Each Monthly Payment 
    let interestPay = remainingBal * (rate / 1200); //Interest Payment = Previous Remaining Balance * rate/1200
    let principalPay = totalMonPay - interestPay; //Principal Payment = Total Monthly Payment - Interest Payment
    let totalInterest = 0; //Remaining Balance = Previous Remaining Balance - principal payments
    let totalPrincipal = 0; //Total amount paid on principal

    // let loanData = JSON.parse(sessionStorage.getItem("calculateLoan")) || [];
    let loanData = [];
    //For loop based on rate for(let i = 1; i <= term; i++)
    for (let i = 1; i <= term; i++) { //To show the month use the index of the loop
        let obj = {};
        obj["totalMonPay"] = principalPay + interestPay;
        obj["totalInterest"] = totalInterest += interestPay; //total interest will gradually increase as monthly payments are made
        obj["principalPay"] = principalPay = totalMonPay - interestPay; //Principal will increase since interest amount owed goes down
        obj["remainingBal"] = remainingBal -= principalPay; //Remaining balance will slowly decrease as payments are made
        obj["interestPay"] = interestPay = remainingBal * (rate / 1200); //As loop continues, it gradually decreases as more payments are made
        obj["totalPrincipal"] = totalPrincipal += totalMonPay;
        obj["month"] = month = i;
        //obj["totalMonPay"] = totalMonPay;

        loanData.push(obj);

        // sessionStorage.setItem("calculateLoan", JSON.stringify(loanData));
    }

    return loanData;

    //In each loop you need to store: What month, total interest paid, total principal paid, interest for this
    //month, principal for this month, remaining principle (amount - total principal) 
}

//Your Payments Section=Display Area for User Input Form
function loadCalculationResult() {
    let loanData = [];
    loanData = startLoan;
    displayData(loanData, amount, term, rate);

};

function startLoan() {
    //ONE: User Input Form Section
    const amount = Number(document.getElementById("loanAmount").value); //Input = Total Loan Amount 
    const term = Number(document.getElementById("loanTerm").value); //Input = Term of the Loan in Months
    const rate = Number(document.getElementById("loanRate").value); //Input = Interest Rate

    let calculationResult = calculateLoan(amount, term, rate);

    displayData(calculationResult, amount, term, rate);
}

//Amoritized Loan Payment Schedule Table
function displayData(loanData, amount) {
    //Use amount, term, and rate to redisplay the information the user entered on the table
    const template = document.getElementById("Schedule-Template");
    const resultsBody = document.getElementById("resultsBody");
    //Clear Table First
    resultsBody.innerHTML = "";
    for (let i = 0; i < loanData.length; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("month").textContent = loanData[i].month;
        dataRow.getElementById("payment").textContent = loanData[i].totalMonPay.toFixed(2);
        dataRow.getElementById("principalPay").textContent = loanData[i].principalPay.toFixed(2);
        dataRow.getElementById("totalPrincipal").textContent = loanData[i].totalPrincipal.toFixed(2);
        dataRow.getElementById("interestPay").textContent = loanData[i].interestPay.toFixed(2);
        dataRow.getElementById("totalInterest").textContent = loanData[i].totalInterest.toFixed(2);
        dataRow.getElementById("newBalance").textContent = loanData[i].remainingBal.toFixed(2);

        resultsBody.appendChild(dataRow);

        

        //Use .toFixed(2) to display the output as standard US currency
        //Only use it for display you need to retain the full value for calculations
    }

    //Build out the summary area
    document.getElementById("monthlyPayment").innerText = loanData[0].totalMonPay.toFixed(2);
    document.getElementById("totalPrincipal").innerText = amount;
    document.getElementById("totalInterest").innerText = loanData[loanData.length - 1].totalInterest.toFixed(2);
    document.getElementById("totalCost").innerText = (amount + loanData[loanData.length - 1].totalInterest).toFixed(2);

}