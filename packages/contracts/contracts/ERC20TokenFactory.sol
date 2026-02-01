// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ERC20Token.sol";

/**
 * @title ERC20TokenFactory
 * @dev Factory contract for deploying ERC20 tokens with customizable features
 */
contract ERC20TokenFactory {
    
    // Array of all deployed tokens
    address[] public deployedTokens;
    
    // Mapping from deployer to their tokens
    mapping(address => address[]) public tokensByDeployer;
    
    // Mapping from token address to deployment info
    mapping(address => TokenDeployment) public tokenDeployments;
    
    // Platform fee (0.01 ETH default, can be changed by owner)
    uint256 public platformFee;
    
    // Fee recipient
    address public feeRecipient;
    
    // Contract owner
    address public owner;
    
    /**
     * @dev Token deployment information
     */
    struct TokenDeployment {
        address tokenAddress;
        address deployer;
        string name;
        string symbol;
        uint256 deployedAt;
        uint256 deploymentFee;
        bool verified;
    }
    
    /**
     * @dev Events
     */
    event TokenCreated(
        address indexed tokenAddress,
        address indexed deployer,
        string name,
        string symbol,
        uint256 timestamp
    );
    
    event PlatformFeeUpdated(uint256 oldFee, uint256 newFee);
    event FeeRecipientUpdated(address oldRecipient, address newRecipient);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    /**
     * @dev Constructor
     * @param _feeRecipient Address to receive platform fees
     * @param _platformFee Initial platform fee in wei
     */
    constructor(address _feeRecipient, uint256 _platformFee) {
        require(_feeRecipient != address(0), "Invalid fee recipient");
        owner = msg.sender;
        feeRecipient = _feeRecipient;
        platformFee = _platformFee;
    }
    
    /**
     * @dev Modifier to restrict functions to owner
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }
    
    /**
     * @dev Create a new ERC20 token
     * @param config Token configuration
     * @return tokenAddress Address of the newly deployed token
     */
    function createToken(ERC20Token.TokenConfig calldata config) 
        external 
        payable 
        returns (address tokenAddress) 
    {
        // Check if fee is required and paid
        if (platformFee > 0) {
            require(msg.value >= platformFee, "Insufficient platform fee");
            
            // Refund excess
            if (msg.value > platformFee) {
                (bool refundSuccess, ) = msg.sender.call{value: msg.value - platformFee}("");
                require(refundSuccess, "Refund failed");
            }
            
            // Transfer fee to recipient
            (bool feeSuccess, ) = feeRecipient.call{value: platformFee}("");
            require(feeSuccess, "Fee transfer failed");
        } else {
            // Refund any ETH sent if no fee
            if (msg.value > 0) {
                (bool success, ) = msg.sender.call{value: msg.value}("");
                require(success, "Refund failed");
            }
        }
        
        // Deploy new token
        ERC20Token newToken = new ERC20Token(config);
        tokenAddress = address(newToken);
        
        // Record deployment
        deployedTokens.push(tokenAddress);
        tokensByDeployer[msg.sender].push(tokenAddress);
        
        tokenDeployments[tokenAddress] = TokenDeployment({
            tokenAddress: tokenAddress,
            deployer: msg.sender,
            name: config.name,
            symbol: config.symbol,
            deployedAt: block.timestamp,
            deploymentFee: platformFee,
            verified: false
        });
        
        emit TokenCreated(
            tokenAddress,
            msg.sender,
            config.name,
            config.symbol,
            block.timestamp
        );
        
        return tokenAddress;
    }
    
    /**
     * @dev Get all deployed tokens
     * @return Array of token addresses
     */
    function getAllTokens() external view returns (address[] memory) {
        return deployedTokens;
    }
    
    /**
     * @dev Get tokens deployed by a specific address
     * @param deployer Address of the deployer
     * @return Array of token addresses
     */
    function getTokensByDeployer(address deployer) 
        external 
        view 
        returns (address[] memory) 
    {
        return tokensByDeployer[deployer];
    }
    
    /**
     * @dev Get deployment count
     * @return Total number of deployed tokens
     */
    function getDeploymentCount() external view returns (uint256) {
        return deployedTokens.length;
    }
    
    /**
     * @dev Get deployment info for a token
     * @param token Token address
     * @return Token deployment information
     */
    function getTokenInfo(address token) 
        external 
        view 
        returns (TokenDeployment memory) 
    {
        return tokenDeployments[token];
    }
    
    /**
     * @dev Get paginated tokens
     * @param offset Start index
     * @param limit Number of tokens to return
     * @return Array of token addresses
     */
    function getTokensPaginated(uint256 offset, uint256 limit) 
        external 
        view 
        returns (address[] memory) 
    {
        require(offset < deployedTokens.length, "Offset out of bounds");
        
        uint256 end = offset + limit;
        if (end > deployedTokens.length) {
            end = deployedTokens.length;
        }
        
        uint256 resultLength = end - offset;
        address[] memory result = new address[](resultLength);
        
        for (uint256 i = 0; i < resultLength; i++) {
            result[i] = deployedTokens[offset + i];
        }
        
        return result;
    }
    
    /**
     * @dev Update platform fee (owner only)
     * @param newFee New platform fee in wei
     */
    function updatePlatformFee(uint256 newFee) external onlyOwner {
        uint256 oldFee = platformFee;
        platformFee = newFee;
        emit PlatformFeeUpdated(oldFee, newFee);
    }
    
    /**
     * @dev Update fee recipient (owner only)
     * @param newRecipient New fee recipient address
     */
    function updateFeeRecipient(address newRecipient) external onlyOwner {
        require(newRecipient != address(0), "Invalid address");
        address oldRecipient = feeRecipient;
        feeRecipient = newRecipient;
        emit FeeRecipientUpdated(oldRecipient, newRecipient);
    }
    
    /**
     * @dev Transfer ownership (owner only)
     * @param newOwner New owner address
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        address oldOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
    
    /**
     * @dev Mark token as verified (owner only)
     * @param token Token address to mark
     */
    function markTokenVerified(address token) external onlyOwner {
        require(tokenDeployments[token].tokenAddress != address(0), "Token not found");
        tokenDeployments[token].verified = true;
    }
    
    /**
     * @dev Withdraw any stuck ETH (owner only)
     */
    function withdraw() external onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
    
    /**
     * @dev Check if a token was deployed by this factory
     * @param token Token address to check
     * @return True if deployed by this factory
     */
    function isFactoryToken(address token) external view returns (bool) {
        return tokenDeployments[token].tokenAddress != address(0);
    }
    
    /**
     * @dev Get factory statistics
     * @return totalTokens Total number of tokens
     * @return currentFee Current platform fee
     * @return totalFeesCollected Total fees collected (estimated)
     */
    function getFactoryStats() 
        external 
        view 
        returns (
            uint256 totalTokens,
            uint256 currentFee,
            uint256 totalFeesCollected
        ) 
    {
        return (
            deployedTokens.length,
            platformFee,
            deployedTokens.length * platformFee
        );
    }
    
    /**
     * @dev Receive function to accept ETH
     */
    receive() external payable {
        // Accept ETH
    }
}
