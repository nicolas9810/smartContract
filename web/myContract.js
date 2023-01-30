let FactoryContract;

let Contract_Address;

const Contract_ABI ="";

let EventContract = ClientReceipt.at(Contract_Address)

EventContract.on("newToken",(amount,value)=>{

    const box = document.createElement("div");
    box.className="card";

    const _amount = document.createElement("div");
    _amount.className=".text";
    _amount.innerHTML="Amount requested: "+amount;
    box.appendChild(_amount);

    const value = document.createElement("div");
    value.className=".text";
    value.innerHTML="Amount actually obtained: "+value;
    box.appendChild(value);

    const card = document.getElementsByClassName(contract-container);
    card[0].appendChild(box);

});
