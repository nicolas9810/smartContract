// const { EthersEvent } = require("alchemy-sdk/dist/src/internal/ethers-event");
// const { ethers } = require("hardhat");

const { Contract } = require("alchemy-sdk");

let FactoryContract;

let Logged_User_Contract_Address;
let Contract_Address;
const Contract_ABI =[
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "enum VendorType",
				"name": "_vendor",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_good",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_impact",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_country",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_good",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			}
		],
		"name": "bought",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "newToken",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_quantity",
				"type": "uint256"
			}
		],
		"name": "buyGoods",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "country",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "q",
				"type": "uint256"
			}
		],
		"name": "generateGoods",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "good",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "impact",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "issueToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nameOfTheContract",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "price",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "quantity",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "vendor",
		"outputs": [
			{
				"internalType": "enum VendorType",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];



let EventContract = ClientReceipt.at(Logged_User_Contract_Address)

EventContract.on("newToken",(amount,value)=>{
    

    const tmp = Contract_Address.balanceOf(msg.sender);
    balance.value="Balance: "+ tmp;

    const box = document.createElement("div");
    box.className="card";

    const _amount = document.createElement("div");
    _amount.className=".text";
    _amount.innerHTML="Amount requested: "+amount;
    box.appendChild(_amount);

    const val = document.createElement("div");
    val.className=".text";
    val.innerHTML="Amount actually obtained: "+value;
    box.appendChild(val);

    const card = document.getElementsByClassName(contract-container);
    card[0].appendChild(box);
    setCurrentLoggedUserBalance();



});



const balance = document.querySelector("balance");
const buyTokenButton = document.querySelector("buy-button");
const token_amount =document.querySelector("amount");


function setCurrentLoggedUserBalance(){
    const value = Contract_Address.balanceOf(msg.sender);
    balance.value="Balance: "+value;
}


buyTokenButton.addEventListener("click",function (){
    Logged_User_Contract_Address.issueToken(token_amount.value);
});




const buyGoodsButton = document.querySelector("buyGoodsButton");
const numberOfGoods = document.querySelector("number-of-goods");

buyGoodsButton.addEventListener("click",function(){
    const goods=numberOfGoods.value;
    Contract_Address.buyGoods(goods);
    EventContract.on("newGoodStock",()=>{
        document.getElementById("stock").innerHTML="Stocked goods: "+ Contract_Address.quantity();

    });


});


const createGoodsButton=document.querySelector("create-goods-button");
createGoodsButton.addEventListener("click",function(){
    const numbOfGoods=document.querySelector("number-of-goods").value;
    Contract_Address.generateGoods(numbOfGoods);
EventContract.on("newGoodStock",()=>{
        document.getElementById("stock").innerHTML="Stocked goods: "+ Contract_Address.quantity();
        
    });

})



// const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
// provider.send("eth_requestAccounts", []).then(() => {
//   provider.listAccounts().then((accounts) => {
//     const signer = provider.getSigner(accounts[0]);

//     /* 3.1 Create instance of pet smart contract */
//     FContract = new ethers.Contract(
//       Turing_Contract_Address,
//       Turing_Contract_ABI,
//       signer
//     );
//   });
// });


function addingContract(name,type,country,good,id,group,contr){

    const box = document.createElement("div");
    box.className="card";

    const title = document.createElement("div");
    title.className=".title";
    title.innerHTML=name;
    box.appendChild(title);

    const product = document.createElement("div");
    product.className=".text";
    product.innerHTML=good;
    box.appendChild(product);

    const vendor = document.createElement("div");
    vendor.className=".text";
    vendor.innerHTML=type;
    box.appendChild(vendor);

    const paese = document.createElement("div");
    paese.className=".text";
    paese.innerHTML=country;
    box.appendChild(paese);
    

    const button = document.createElement("button");
    button.className="access-button";
    button.id=id;
    button.innerHTML="Open";

    button.addEventListener("click",function(name,good,country){
        Contract_Address=contr
        document.getElementById("name-of-the-contract").innerHTML=name;
        document.getElementById("country").innerHTML="Country: "+country;
        document.getElementById("product").innerHTML="typeofGood: "+ good;
        document.getElementById("stock").innerHTML="Stocked goods: "+ quantity();
        if(Contract_Address.impact()==0)
            document.getElementById("impact").innerHTML="Impact: LOW";
        if(Contract_Address.impact()==1)
            document.getElementById("impact").innerHTML="Impact: MEDIUM";
        else
            document.getElementById("impact").innerHTML="Impact: MEDIUM";
    });


    box.appendChild(button);



    // const card =document.getElementsByClassName("contract-container");
    // card[0].appendChild(box);

    const card = document.getElementsByClassName(contract-container);
    card[group].appendChild(box);
}

function generateProducerList(){
    const array = [];
    const numProd = FactoryContract.numberOfProducers();
    for( let i =0; i< numProd;i++){
        const tmpContr = FactoryContract.getContractP(i)
        const name =tmpContr.nameOfTheContract();
        const vendor=tmpContr.vendor();
        const country=tmpContr.country();
        const good=tmpContr.good();
        addingContract(name,vendor,country,good,i,0,tmpContr)
    }
}

function generateFactoryList(){
    const array = [];
    const numProd = FactoryContract.numberOfProducers();
    for( let i =0; i< numProd;i++){
        const tmpContr = FactoryContract.getContractP(i)
        const name =tmpContr.nameOfTheContract();
        const vendor=tmpContr.vendor();
        const country=tmpContr.country();
        const good=tmpContr.good();
        addingContract(name,vendor,country,good,i,1)
    }
}

function generateShopList(){
    const array = [];
    const numProd = FactoryContract.numberOfProducers();
    for( let i =0; i< numProd;i++){
        const tmpContr = FactoryContract.getContractP(i)
        const name =tmpContr.nameOfTheContract();
        const vendor=tmpContr.vendor();
        const country=tmpContr.country();
        const good=tmpContr.good();
        addingContract(name,vendor,country,good,i,2)
    }
}


