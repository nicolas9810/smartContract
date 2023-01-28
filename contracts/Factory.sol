// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


import "hardhat/console.sol";

   struct Product{
        string name;
        string country;
        uint256 impact;
        uint256 price;
        uint256 quantity;
    }

    enum VendorType { PRODUCER, FACTORY, SHOP}

contract Factory{

    address public owner;

    constructor(){
        owner = msg.sender;
    }

    Contract [] public ContractArrayTypeP;
    int public numberOfProducers;
    Contract [] public ContractArrayTypeF;
    int public numberOfFactories;
    Contract [] public ContractArrayTypeS;
    int public numberOfShops;



   function getContractP(uint256 index) public view returns (address){
        return address(ContractArrayTypeP[index]);
   }

   function getContractF(uint256 index) public view returns (address){
        return address(ContractArrayTypeF[index]);
   }

   function getContractS(uint256 index) public view returns (address){
        return address(ContractArrayTypeS[index]);
   }

    function CreateNewContract(VendorType vendorType,string memory nameOfTheContract, string memory good,string memory country) external returns(address){
        Contract vendor = new Contract(payable(msg.sender),vendorType,nameOfTheContract,good,country);
        
        if(vendorType == VendorType.PRODUCER){
            ContractArrayTypeP.push(vendor);
            console.log("vendor = ",0);

        }
        if(vendorType == VendorType.FACTORY){
            ContractArrayTypeF.push(vendor);
            console.log("vendor = ",1);

        }
        if(vendorType == VendorType.SHOP){
            ContractArrayTypeS.push(vendor);
            console.log("vendor = ",2);

        }
        console.log("The address of the created contract is: ",
           address(vendor)

        );
        return address(vendor);
    }

}


contract Contract is ERC20{
 
    string public nameOfTheContract;
    VendorType public vendor;
    string public good;
    string public country;
    
    Product [100] public orders;
    uint256 ID;
    mapping( uint256 => Product) public goodsProduced;
    mapping( uint256 => Product) public goodsBought;
    uint256 averageImpact;
    uint256 numOrder;

    address payable public owner;
    address  factory;

    function getOwner() public view returns(address){
        return owner;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    modifier maximumOrder{
        require(numOrder < 100);
        _;
    }



    
    constructor(address payable own, VendorType value,string memory name,string memory g,string memory c) ERC20("DevToken", "DVT"){
        owner = own;
        vendor=value;
        ID=0;
        factory = msg.sender;
        nameOfTheContract=name;
        good=g;
        country=c;


    }

    function issueToken(address receiver, uint256 amount ) public { 
            _mint(receiver, amount);
    }
    
    function createGoods(string memory name, uint256 impact, uint256 price,string memory country,uint256 quantity)public
        onlyOwner{
            Product memory product = Product(name,country,impact,price,quantity);
            goodsProduced[ID]= product;
            ID++;
    }

    function requestNewGoods(string memory name, uint256  quantity) external {
        if(numOrder<100){
            Product memory product;
            product.name=name;
            product.quantity=quantity;
            orders[numOrder]=product;
            numOrder++;
        }
    }

    modifier enoughGood(uint256 id,uint256 quantity){
        require(goodsProduced[id].quantity > quantity);
        _;
    }
    function orderGoods(uint256 id, uint256 quantity) external enoughGood(id,quantity){
        if(goodsProduced[id].quantity > quantity){
            uint256 value = quantity * goodsProduced[id].price;
            transferFrom(msg.sender,owner,value);
            goodsProduced[id].quantity=goodsProduced[id].quantity-quantity;
        }
    }
    
}