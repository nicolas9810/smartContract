const { expect } = require("chai");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");


describe("Factory contract", function() {

    async function deployFactoryFixture(){

        const Factory = await ethers.getContractFactory("Factory");
        const [owner, addr1, addr2, addr3] = await ethers.getSigners();

        const hardhatFactory = await Factory.deploy();

        await hardhatFactory.deployed();

        return { hardhatFactory, owner, addr1, addr2, addr3 };
    }

    async function deployContractFixture(){
        
        const [owner, addr1, addr2, addr3] = await ethers.getSigners();
        const Factory = await ethers.getContractFactory("Factory");
        const hardhatFactory = await Factory.deploy();
        await hardhatFactory.deployed();

        await hardhatFactory.issueToken(addr1,10000);
        await hardhatFactory.issueToken(addr2,10000);
        await hardhatFactory.issueToken(addr3,10000);


        await hardhatFactory.connect(addr1).CreateNewContract(0,"prova & CO", "cotone");
        await hardhatFactory.connect(addr2).CreateNewContract(1,"Nike", "magliette");
        await hardhatFactory.connect(addr3).CreateNewContract(2,"store", "magliette");

        
        
        const contr1 = await hardhatFactory.getContractP(0);
        const contrProd = await ethers.getContractAt("Contract", contr1)            
        await contrProd.createGoods("cotone",1,"italy",1000);
        await contrProd.createGoods("cotone",10,"italy",1000);
        await contrProd.createGoods("cotone",50,"italy",1000);


        const contr2 = await hardhatFactory.getContractF(0);
        const contrFact = await ethers.getContractAt("Contract", contr2)    
        
        const contr3 = await hardhatFactory.getContractS(0);
        const contrShop = await ethers.getContractAt("Contract", contr3)     



        return { hardhatFactory, contrProd, contrFact, contrShop };
        
    }

    describe("Deployment", function (){

        it("Should set the right owner", async function (){

            const { hardhatFactory, owner} = await loadFixture(deployFactoryFixture);

            expect(await hardhatFactory.owner()).to.equal(owner.address);

            // const [ produ ] = await ethers.getSigners();
            // const conProd = await hardhatFactory.connect(produ).CreateNewContract(0,"prova & CO", "cotone");
            
            // const myContractAd = await hardhatFactory.ContractArrayTypeP(0);
            // const myContract = await ethers.getContractAt("Contract", myContractAd);

            // expect(await myContract.owner()).to.equal(conProd.address);

            // const conFact = await hardhatFactory.connect(facto).CreateNewContract(1,"prova2 & CO", "magliette");
            // await expect( conFact.owner().to.equal(facto.address));

            // const conShop = await hardhatFactory.connect(shop).CreateNewContract(2,"prova3 & CO", "h&m");
            // await expect( conShop.owner().to.equal(shop.address));
            
        });

        it("Should check address of first Contract", async function(){
           
            const { hardhatFactory, owner, addr1} = await loadFixture(deployFactoryFixture);

            expect(await hardhatFactory.owner()).to.equal(owner.address);

            const test = await hardhatFactory.connect(addr1).CreateNewContract(0,"prova & CO", "cotone");
            const myContract = await hardhatFactory.getContractP(0);
            const add = await ethers.getContractAt("Contract", myContract)            
            expect(await add.getOwner()).to.equal(addr1.address);

        });

        it("Check the goods produced by 3 different contract", async function(){
            const { Factory, contrProd, contrFact, contrShop } = await loadFixture(deployContractFixture);
            expect(await contrProd.good()).to.equal("cotone");
            expect(await contrFact.good()).to.equal("magliette");
            //console.log("TEST ,",contrShop.vendor());
            expect(await contrShop.good()).to.equal("magliette");

        });

        it("Check the type of 3 different contract", async function(){
            const { Factory, contrProd, contrFact, contrShop } = await loadFixture(deployContractFixture);
            expect(await contrProd.vendor()).to.equal(0);
            expect(await contrFact.vendor()).to.equal(1);
            // console.log("TEST ,",contrShop.vendor());
            expect(await contrShop.vendor()).to.equal(2);

        });


    })


});