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
        multiplier: 25000,
        power: 10000,
        bonus: 20000,
        stream: 15000
    };


    const upgradeEffects = {
        speed: () => passiveIncome += 50000,
        multiplier: () => coinsPerClick += 10000,
        power: () => coinsPerClick *= 2,
        bonus: () => coinsPerClick += Math.floor(Math.random() * 1000000),
        stream: () => passiveIncome += 200000
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
    clickCircle.addEventListener("click", async function () {
        try {
            const res = await fetch("http://localhost:3000/click", {
                method: "POST"
            });
            const data = await res.json();
            balance = data.balance;
            updateStats();
        } catch (err) {
            console.error("Click error:", err);
        }
    });

    setInterval(async () => {
        try {
            const res = await fetch("http://localhost:3000/passive-income", {
                method: "POST"
            });
            const data = await res.json();
            balance = data.balance;
            updateStats();
        } catch (err) {
            console.error("Passive income error:", err);
        }
    }, 1000);


    updateStats();
});