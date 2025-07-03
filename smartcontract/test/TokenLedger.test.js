const { expect } = require("chai");

describe("TokenLedger", function () {
  let TokenLedger, ledger, owner, addr1, addr2, addr3;

  beforeEach(async function () {
    TokenLedger = await ethers.getContractFactory("TokenLedger");
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    ledger = await TokenLedger.deploy();
    await ledger.deployed();
  });

  it("Should mint tokens to a user", async function () {
    await ledger.mint(addr1.address, 100);
    expect((await ledger.balanceOf(addr1.address)).toString()).to.equal("100");
  });

  it("Should mint tokens to multiple users", async function () {
    await ledger.mint(addr1.address, 100);
    await ledger.mint(addr2.address, 200);
    expect((await ledger.balanceOf(addr1.address)).toString()).to.equal("100");
    expect((await ledger.balanceOf(addr2.address)).toString()).to.equal("200");
  });

  it("Should allow owner to mint tokens to self", async function () {
    await ledger.mint(owner.address, 123);
    expect((await ledger.balanceOf(owner.address)).toString()).to.equal("123");
  });

  it("Should transfer tokens between users", async function () {
    await ledger.mint(owner.address, 100);
    await ledger.transfer(addr1.address, 50);
    expect((await ledger.balanceOf(addr1.address)).toString()).to.equal("50");
    expect((await ledger.balanceOf(owner.address)).toString()).to.equal("50");
  });

  it("Should allow transfer of full balance", async function () {
    await ledger.mint(owner.address, 100);
    await ledger.transfer(addr1.address, 100);
    expect((await ledger.balanceOf(owner.address)).toString()).to.equal("0");
    expect((await ledger.balanceOf(addr1.address)).toString()).to.equal("100");
  });

  it("Should allow transfer of 0 tokens", async function () {
    await ledger.mint(owner.address, 100);
    await ledger.transfer(addr1.address, 0);
    expect((await ledger.balanceOf(owner.address)).toString()).to.equal("100");
    expect((await ledger.balanceOf(addr1.address)).toString()).to.equal("0");
  });

  it("Should not allow non-owner to mint", async function () {
    await expect(
      ledger.connect(addr1).mint(addr1.address, 100)
    ).to.be.revertedWith("Not owner");
  });

  it("Should not allow transfer if insufficient balance", async function () {
    await expect(
      ledger.connect(addr1).transfer(addr2.address, 10)
    ).to.be.revertedWith("Insufficient balance");
  });

  it("Should emit Mint event", async function () {
    await expect(ledger.mint(addr1.address, 100))
      .to.emit(ledger, "Mint")
      .withArgs(addr1.address, 100);
  });

  it("Should emit Transfer event", async function () {
    await ledger.mint(owner.address, 50);
    await expect(ledger.transfer(addr1.address, 50))
      .to.emit(ledger, "Transfer")
      .withArgs(owner.address, addr1.address, 50);
  });

  it("Default balance is zero for new address", async function () {
    expect((await ledger.balanceOf(addr3.address)).toString()).to.equal("0");
  });
});