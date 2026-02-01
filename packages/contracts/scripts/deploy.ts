import { ethers, run, network } from 'hardhat';
import { ERC20TokenFactory } from '../typechain-types';

async function main() {
  console.log(`Deploying to ${network.name}...`);
  
  const [deployer] = await ethers.getSigners();
  console.log('Deploying with account:', deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log('Account balance:', ethers.formatEther(balance), 'ETH');

  // Deploy factory
  const platformFee = ethers.parseEther('0.01'); // 0.01 ETH fee
  
  const ERC20TokenFactory = await ethers.getContractFactory('ERC20TokenFactory');
  const factory = await ERC20TokenFactory.deploy(deployer.address, platformFee);
  
  await factory.waitForDeployment();
  
  const factoryAddress = await factory.getAddress();
  console.log('ERC20TokenFactory deployed to:', factoryAddress);
  
  // Wait for block confirmations
  console.log('Waiting for block confirmations...');
  await factory.deploymentTransaction()?.wait(5);
  
  // Verify on Etherscan if not on local network
  if (network.name !== 'hardhat' && network.name !== 'localhost') {
    console.log('Verifying contract...');
    try {
      await run('verify:verify', {
        address: factoryAddress,
        constructorArguments: [deployer.address, platformFee],
      });
      console.log('Contract verified successfully!');
    } catch (error) {
      console.log('Verification failed:', error);
    }
  }
  
  console.log('\n=== Deployment Summary ===');
  console.log(`Network: ${network.name}`);
  console.log(`Factory Address: ${factoryAddress}`);
  console.log(`Platform Fee: ${ethers.formatEther(platformFee)} ETH`);
  console.log(`Deployer: ${deployer.address}`);
  console.log('========================\n');
  
  // Save deployment info
  const deploymentInfo = {
    network: network.name,
    factoryAddress,
    platformFee: platformFee.toString(),
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };
  
  console.log('Deployment Info:', JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
