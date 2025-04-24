document.addEventListener("DOMContentLoaded", function () {
    let balance = 19593;
    let coinsPerClick = 20; 
    let passiveIncome = 1; 
    const clickCircle = document.getElementById("click-circle");
    const balanceDisplay = document.querySelector(".balance");
    const totalCoinsDisplay = document.getElementById("total-coins");
    const coinsPerClickDisplay = document.getElementById("coins-per-click");
    const passiveIncomeDisplay = document.getElementById("passive-income");
    const buyButtons = document.querySelectorAll(".buy-button");

 
    function updateStats() {
        balanceDisplay.textContent = balance.toLocaleString();
        totalCoinsDisplay.textContent = balance.toLocaleString();
        coinsPerClickDisplay.textContent = coinsPerClick;
        passiveIncomeDisplay.textContent = `${passiveIncome}/sec`;
    }


    clickCircle.addEventListener("click", function () {
        balance += coinsPerClick;
        updateStats();
    });


    setInterval(() => {
        balance += passiveIncome;
        updateStats();
    }, 1000);


    const upgrades = {
        speed: 40000,
        multiplier: 40000,
        power: 10000,
        bonus: 40000,
        stream: 40000
    };


    const upgradeEffects = {
        speed: () => passiveIncome += 1,
        multiplier: () => coinsPerClick += 10,
        power: () => coinsPerClick *= 2,
        bonus: () => coinsPerClick += Math.floor(Math.random() * 10),
        stream: () => passiveIncome += 2
    };

    buyButtons.forEach(button => {
        button.addEventListener("click", function () {
            const upgrade = this.getAttribute("data-upgrade");
            const price = upgrades[upgrade];

            if (balance >= price) {
                balance -= price;
                upgradeEffects[upgrade]();
                updateStats();
                this.disabled = true;
                alert(`Purchased ${upgrade} for $${price}!`);
            } else {
                alert("Not enough balance!");
            }
        });
    });


    updateStats();
});