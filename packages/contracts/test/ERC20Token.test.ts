import { ethers } from 'hardhat';
import { expect } from 'chai';
import { ERC20Token, ERC20TokenFactory } from '../typechain-types';

describe('ERC20Token', function () {
  let token: ERC20Token;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const ERC20Token = await ethers.getContractFactory('ERC20Token');
    token = await ERC20Token.deploy({
      name: 'Test Token',
      symbol: 'TEST',
      decimals: 18,
      initialSupply: ethers.parseEther('1000000'),
      maxSupply: ethers.parseEther('2000000'),
      mintable: true,
      burnable: true,
      pausable: true,
      capped: true,
      permit: true,
      votes: true,
      owner: owner.address,
    });
    await token.waitForDeployment();
  });

  describe('Deployment', function () {
    it('Should set the right name and symbol', async function () {
      expect(await token.name()).to.equal('Test Token');
      expect(await token.symbol()).to.equal('TEST');
    });

    it('Should mint initial supply to owner', async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.equal(ethers.parseEther('1000000'));
    });

    it('Should set correct feature flags', async function () {
      expect(await token.isMintable()).to.be.true;
      expect(await token.isBurnable()).to.be.true;
      expect(await token.isPausable()).to.be.true;
      expect(await token.isCapped()).to.be.true;
      expect(await token.hasPermit()).to.be.true;
      expect(await token.hasVotes()).to.be.true;
    });
  });

  describe('Minting', function () {
    it('Should allow owner to mint when mintable', async function () {
      await token.mint(addr1.address, ethers.parseEther('1000'));
      expect(await token.balanceOf(addr1.address)).to.equal(ethers.parseEther('1000'));
    });

    it('Should not allow non-owner to mint', async function () {
      await expect(
        token.connect(addr1).mint(addr1.address, ethers.parseEther('1000'))
      ).to.be.revertedWithCustomError(token, 'OwnableUnauthorizedAccount');
    });

    it('Should respect max supply cap', async function () {
      await expect(
        token.mint(addr1.address, ethers.parseEther('2000000'))
      ).to.be.revertedWith('Exceeds max supply');
    });
  });

  describe('Burning', function () {
    it('Should allow token holders to burn', async function () {
      await token.transfer(addr1.address, ethers.parseEther('1000'));
      await token.connect(addr1).burn(ethers.parseEther('500'));
      expect(await token.balanceOf(addr1.address)).to.equal(ethers.parseEther('500'));
    });

    it('Should allow burnFrom with approval', async function () {
      await token.transfer(addr1.address, ethers.parseEther('1000'));
      await token.connect(addr1).approve(owner.address, ethers.parseEther('500'));
      await token.burnFrom(addr1.address, ethers.parseEther('500'));
      expect(await token.balanceOf(addr1.address)).to.equal(ethers.parseEther('500'));
    });
  });

  describe('Pausable', function () {
    it('Should allow owner to pause', async function () {
      await token.pause();
      expect(await token.paused()).to.be.true;
    });

    it('Should prevent transfers when paused', async function () {
      await token.pause();
      await expect(
        token.transfer(addr1.address, ethers.parseEther('100'))
      ).to.be.revertedWithCustomError(token, 'EnforcedPause');
    });

    it('Should allow owner to unpause', async function () {
      await token.pause();
      await token.unpause();
      expect(await token.paused()).to.be.false;
    });

    it('Should allow transfers after unpause', async function () {
      await token.pause();
      await token.unpause();
      await expect(token.transfer(addr1.address, ethers.parseEther('100'))).to.not.be.reverted;
    });
  });

  describe('Batch Operations', function () {
    it('Should perform batch transfer', async function () {
      const recipients = [addr1.address, addr2.address];
      const amounts = [ethers.parseEther('100'), ethers.parseEther('200')];
      
      await token.batchTransfer(recipients, amounts);
      
      expect(await token.balanceOf(addr1.address)).to.equal(ethers.parseEther('100'));
      expect(await token.balanceOf(addr2.address)).to.equal(ethers.parseEther('200'));
    });

    it('Should perform batch mint', async function () {
      const recipients = [addr1.address, addr2.address];
      const amounts = [ethers.parseEther('100'), ethers.parseEther('200')];
      
      await token.batchMint(recipients, amounts);
      
      expect(await token.balanceOf(addr1.address)).to.equal(ethers.parseEther('100'));
      expect(await token.balanceOf(addr2.address)).to.equal(ethers.parseEther('200'));
    });
  });

  describe('Permit', function () {
    it('Should support permit functionality', async function () {
      const amount = ethers.parseEther('1000');
      const deadline = Math.floor(Date.now() / 1000) + 3600;
      
      const domain = {
        name: await token.name(),
        version: '1',
        chainId: (await ethers.provider.getNetwork()).chainId,
        verifyingContract: await token.getAddress(),
      };
      
      const types = {
        Permit: [
          { name: 'owner', type: 'address' },
          { name: 'spender', type: 'address' },
          { name: 'value', type: 'uint256' },
          { name: 'nonce', type: 'uint256' },
          { name: 'deadline', type: 'uint256' },
        ],
      };
      
      const nonce = await token.nonces(owner.address);
      const value = {
        owner: owner.address,
        spender: addr1.address,
        value: amount,
        nonce: nonce,
        deadline: deadline,
      };
      
      const signature = await owner.signTypedData(domain, types, value);
      const sig = ethers.Signature.from(signature);
      
      await token.permit(
        owner.address,
        addr1.address,
        amount,
        deadline,
        sig.v,
        sig.r,
        sig.s
      );
      
      expect(await token.allowance(owner.address, addr1.address)).to.equal(amount);
    });
  });

  describe('Token Info', function () {
    it('Should return correct token info', async function () {
      const info = await token.getTokenInfo();
      expect(info.name_).to.equal('Test Token');
      expect(info.symbol_).to.equal('TEST');
      expect(info.decimals_).to.equal(18);
      expect(info.maxSupply_).to.equal(ethers.parseEther('2000000'));
      expect(info.features[0]).to.be.true; // mintable
      expect(info.features[1]).to.be.true; // burnable
    });
  });
});

describe('ERC20TokenFactory', function () {
  let factory: ERC20TokenFactory;
  let owner: any;
  let addr1: any;
  let addr2: any;
  const platformFee = ethers.parseEther('0.01');

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const ERC20TokenFactory = await ethers.getContractFactory('ERC20TokenFactory');
    factory = await ERC20TokenFactory.deploy(owner.address, platformFee);
    await factory.waitForDeployment();
  });

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      expect(await factory.owner()).to.equal(owner.address);
    });

    it('Should set the right platform fee', async function () {
      expect(await factory.platformFee()).to.equal(platformFee);
    });

    it('Should set the right fee recipient', async function () {
      expect(await factory.feeRecipient()).to.equal(owner.address);
    });
  });

  describe('Token Creation', function () {
    it('Should create a new token with fee', async function () {
      const tokenConfig = {
        name: 'My Token',
        symbol: 'MTK',
        decimals: 18,
        initialSupply: ethers.parseEther('1000000'),
        maxSupply: ethers.parseEther('2000000'),
        mintable: true,
        burnable: true,
        pausable: false,
        capped: true,
        permit: true,
        votes: false,
        owner: addr1.address,
      };

      const tx = await factory.connect(addr1).createToken(tokenConfig, { value: platformFee });
      const receipt = await tx.wait();
      
      // Check event
      const event = receipt?.logs.find(
        (log: any) => log.fragment?.name === 'TokenCreated'
      );
      expect(event).to.not.be.undefined;

      // Check token was recorded
      const tokens = await factory.getTokensByDeployer(addr1.address);
      expect(tokens.length).to.equal(1);
    });

    it('Should fail if insufficient fee', async function () {
      const tokenConfig = {
        name: 'My Token',
        symbol: 'MTK',
        decimals: 18,
        initialSupply: ethers.parseEther('1000000'),
        maxSupply: ethers.parseEther('2000000'),
        mintable: true,
        burnable: true,
        pausable: false,
        capped: true,
        permit: true,
        votes: false,
        owner: addr1.address,
      };

      await expect(
        factory.connect(addr1).createToken(tokenConfig, { value: ethers.parseEther('0.001') })
      ).to.be.revertedWith('Insufficient platform fee');
    });

    it('Should refund excess fee', async function () {
      const tokenConfig = {
        name: 'My Token',
        symbol: 'MTK',
        decimals: 18,
        initialSupply: ethers.parseEther('1000000'),
        maxSupply: ethers.parseEther('2000000'),
        mintable: true,
        burnable: true,
        pausable: false,
        capped: true,
        permit: true,
        votes: false,
        owner: addr1.address,
      };

      const balanceBefore = await ethers.provider.getBalance(addr1.address);
      
      const tx = await factory.connect(addr1).createToken(tokenConfig, { value: ethers.parseEther('0.02') });
      const receipt = await tx.wait();
      
      const gasUsed = receipt!.gasUsed * receipt!.gasPrice;
      const balanceAfter = await ethers.provider.getBalance(addr1.address);
      
      // Should have spent platformFee + gas, and got refund
      const expectedSpent = platformFee + gasUsed;
      const actualSpent = balanceBefore - balanceAfter;
      
      expect(actualSpent).to.be.closeTo(expectedSpent, ethers.parseEther('0.0001'));
    });
  });

  describe('Management', function () {
    it('Should allow owner to update platform fee', async function () {
      const newFee = ethers.parseEther('0.02');
      await expect(factory.updatePlatformFee(newFee))
        .to.emit(factory, 'PlatformFeeUpdated')
        .withArgs(platformFee, newFee);
      
      expect(await factory.platformFee()).to.equal(newFee);
    });

    it('Should not allow non-owner to update fee', async function () {
      await expect(
        factory.connect(addr1).updatePlatformFee(ethers.parseEther('0.02'))
      ).to.be.revertedWith('Not authorized');
    });

    it('Should allow owner to update fee recipient', async function () {
      await expect(factory.updateFeeRecipient(addr2.address))
        .to.emit(factory, 'FeeRecipientUpdated')
        .withArgs(owner.address, addr2.address);
      
      expect(await factory.feeRecipient()).to.equal(addr2.address);
    });

    it('Should allow owner to transfer ownership', async function () {
      await expect(factory.transferOwnership(addr1.address))
        .to.emit(factory, 'OwnershipTransferred')
        .withArgs(owner.address, addr1.address);
      
      expect(await factory.owner()).to.equal(addr1.address);
    });
  });

  describe('Queries', function () {
    beforeEach(async function () {
      // Create some tokens
      const tokenConfig = {
        name: 'Token',
        symbol: 'TKN',
        decimals: 18,
        initialSupply: ethers.parseEther('1000000'),
        maxSupply: ethers.parseEther('2000000'),
        mintable: true,
        burnable: true,
        pausable: false,
        capped: true,
        permit: true,
        votes: false,
        owner: addr1.address,
      };

      for (let i = 0; i < 3; i++) {
        await factory.connect(addr1).createToken(
          { ...tokenConfig, name: `Token ${i}`, symbol: `TKN${i}` },
          { value: platformFee }
        );
      }
    });

    it('Should return correct deployment count', async function () {
      expect(await factory.getDeploymentCount()).to.equal(3);
    });

    it('Should return tokens by deployer', async function () {
      const tokens = await factory.getTokensByDeployer(addr1.address);
      expect(tokens.length).to.equal(3);
    });

    it('Should return all tokens', async function () {
      const tokens = await factory.getAllTokens();
      expect(tokens.length).to.equal(3);
    });

    it('Should return paginated tokens', async function () {
      const tokens = await factory.getTokensPaginated(0, 2);
      expect(tokens.length).to.equal(2);
    });

    it('Should check if token is from factory', async function () {
      const tokens = await factory.getAllTokens();
      expect(await factory.isFactoryToken(tokens[0])).to.be.true;
      expect(await factory.isFactoryToken(addr2.address)).to.be.false;
    });
  });
});
