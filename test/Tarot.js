const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Tarot Contract", function () {
  let Tarot, tarot, owner, addr1, addr2;

  beforeEach(async function () {
    Tarot = await ethers.getContractFactory("Tarot");
    [owner, addr1, addr2, _] = await ethers.getSigners();
    tarot = await Tarot.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await tarot.owner()).to.equal(owner.address);
    });

    it("Should have the correct name and symbol", async function () {
      expect(await tarot.name()).to.equal("Tarot Reading");
      expect(await tarot.symbol()).to.equal("TAROT");
    });
  });

  describe("Minting", function () {
    it("Should mint a token and assign it to the recipient", async function () {
      const tokenUri = "https://example.com/token/1";
      await expect(tarot.mintCertificate(addr1.address, tokenUri))
        .to.emit(tarot, "Transfer")
        .withArgs(ethers.constants.AddressZero, addr1.address, 1);

      expect(await tarot.ownerOf(1)).to.equal(addr1.address);
      expect(await tarot.tokenURI(1)).to.equal(tokenUri);
    });

    it("Should increment tokenIdCounter when minting multiple tokens", async function () {
      const tokenUri1 = "https://example.com/token/1";
      const tokenUri2 = "https://example.com/token/2";

      await tarot.mintCertificate(addr1.address, tokenUri1);
      await tarot.mintCertificate(addr2.address, tokenUri2);

      expect(await tarot.ownerOf(1)).to.equal(addr1.address);
      expect(await tarot.tokenURI(1)).to.equal(tokenUri1);

      expect(await tarot.ownerOf(2)).to.equal(addr2.address);
      expect(await tarot.tokenURI(2)).to.equal(tokenUri2);
    });

    it("Should revert when trying to query a non-existent token URI", async function () {
      await expect(tarot.tokenURI(9999)).to.be.revertedWith(
        "ERC721URIStorage: URI query for nonexistent token"
      );
    });
  });
});
