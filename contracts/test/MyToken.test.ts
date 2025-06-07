import { ethers } from "hardhat";
import { expect } from "chai";

describe("MyToken", function () {
  it("Should deploy and assign initial supply to owner", async function () {
    const [owner] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy();
    await myToken.waitForDeployment();

    const balance = await myToken.balanceOf(owner.address);
    expect(balance).to.equal(ethers.parseUnits("1000000", 18));
  });

  it("Should allow owner to mint tokens", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy();
    await myToken.waitForDeployment();

    await myToken.mint(addr1.address, ethers.parseUnits("1000", 18));
    const balance = await myToken.balanceOf(addr1.address);
    expect(balance).to.equal(ethers.parseUnits("1000", 18));
  });

  it("Should not allow non-owner to mint", async function () {
    const [, , nonOwner] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy();
    await myToken.waitForDeployment();

    await expect(
      myToken.connect(nonOwner).mint(nonOwner.address, 1n)
    ).to.be.revertedWithCustomError(myToken, "OwnableUnauthorizedAccount")
      .withArgs(nonOwner.address);
  });

  it("Should transfer tokens correctly", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy();
    await myToken.waitForDeployment();

    await myToken.transfer(addr1.address, ethers.parseUnits("5000", 18));
    const balance = await myToken.balanceOf(addr1.address);
    expect(balance).to.equal(ethers.parseUnits("5000", 18));
  });
});
