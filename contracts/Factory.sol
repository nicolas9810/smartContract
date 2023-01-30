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
    
    //mapping (address => address) public  mapOwnerContract;

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

    function CreateNewContract(VendorType vendorType,string memory nameOfTheContract, string memory good,uint256 price,uint256 impact,string memory country) external returns(address){
        Contract vendor = new Contract(payable (msg.sender),vendorType,nameOfTheContract,good,price,impact,country);
        //mapOwnerContract[owner]=address(vendor);
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
    uint256 public quantity;
    uint256 public impact;
    uint256 public price;

    Product product;
    

  

    address payable public owner;
    address  factory;

    function getOwner() public view returns(address){
        return owner;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }


    
    constructor(address payable _owner, VendorType _vendor,string memory _name,string memory _good,uint256 _price,uint256 _impact,string memory _country) ERC20("DevToken", "DVT"){
        owner = _owner;
        vendor=_vendor;
        factory = msg.sender;
        nameOfTheContract=_name;
        good=_good;
        country=_country;
        impact=_impact;
        price=_price;
        createGoods();

    }

    function issueToken( uint256 amount ) public onlyOwner{ 
            uint256 value = amount - (amount*impact*25)/100 ;
            _mint(msg.sender, value);
            emit newToken(amount,value);
    }

    event newToken(uint256 amount,uint256 value);
    
    function createGoods() private{
            product = Product(good,country,impact,price,0);
            
    }

    event newGoodStock(string msg,uint256 newQuantity);

    function generateGoods(uint256 q)external {
        quantity=quantity+q;
        emit newGoodStock("New good Stock ",q);
    }


    modifier enoughGood(uint256 q){
        require(quantity > q);
        _;
    }
    function buyGoods( uint256 _quantity) external enoughGood(_quantity){
        approve(msg.sender,_quantity*price);
        transferFrom(msg.sender,owner,_quantity*price);
        emit bought(msg.sender,owner,_quantity*price,good,_quantity);
        quantity=quantity-_quantity;
        emit newGoodStock("New good Stock ",quantity);

    }

    event bought(address indexed _from, address indexed _to, uint amount,string _good, uint256 quantity);
    
}