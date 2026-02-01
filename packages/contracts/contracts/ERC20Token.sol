// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

/**
 * @title ERC20Token
 * @dev Feature-rich ERC20 token with selectable capabilities
 * Features supported: Mintable, Burnable, Pausable, Capped, Permit, Votes
 */
contract ERC20Token is 
    ERC20, 
    ERC20Burnable, 
    ERC20Pausable, 
    ERC20Permit, 
    ERC20Votes,
    Ownable,
    ERC20Capped 
{
    // Feature flags
    bool public immutable isMintable;
    bool public immutable isBurnable;
    bool public immutable isPausable;
    bool public immutable isCapped;
    bool public immutable hasPermit;
    bool public immutable hasVotes;

    uint256 public immutable maxSupply;

    /**
     * @dev Token configuration struct
     */
    struct TokenConfig {
        string name;
        string symbol;
        uint8 decimals;
        uint256 initialSupply;
        uint256 maxSupply;
        bool mintable;
        bool burnable;
        bool pausable;
        bool capped;
        bool permit;
        bool votes;
        address owner;
    }

    /**
     * @dev Constructor with full configuration
     * @param config Token configuration parameters
     */
    constructor(TokenConfig memory config) 
        ERC20(config.name, config.symbol) 
        ERC20Permit(config.name)
        Ownable(config.owner)
        ERC20Capped(config.maxSupply)
    {
        require(config.decimals <= 18, "Decimals must be <= 18");
        require(bytes(config.name).length > 0, "Name cannot be empty");
        require(bytes(config.symbol).length > 0, "Symbol cannot be empty");
        require(bytes(config.symbol).length <= 11, "Symbol too long");
        
        if (config.capped) {
            require(config.maxSupply > 0, "Max supply must be > 0");
            require(config.initialSupply <= config.maxSupply, "Initial supply exceeds max");
        }

        isMintable = config.mintable;
        isBurnable = config.burnable;
        isPausable = config.pausable;
        isCapped = config.capped;
        hasPermit = config.permit;
        hasVotes = config.votes;
        maxSupply = config.maxSupply;

        // Mint initial supply to owner
        if (config.initialSupply > 0) {
            _mint(config.owner, config.initialSupply);
        }
    }

    /**
     * @dev Returns the number of decimals used
     */
    function decimals() public pure override returns (uint8) {
        return 18;
    }

    /**
     * @dev Mint new tokens (only if mintable and only owner)
     * @param to Address to mint tokens to
     * @param amount Amount to mint
     */
    function mint(address to, uint256 amount) public onlyOwner {
        require(isMintable, "Token is not mintable");
        if (isCapped) {
            require(totalSupply() + amount <= maxSupply, "Exceeds max supply");
        }
        _mint(to, amount);
    }

    /**
     * @dev Pause token transfers (only if pausable and only owner)
     */
    function pause() public onlyOwner {
        require(isPausable, "Token is not pausable");
        _pause();
    }

    /**
     * @dev Unpause token transfers (only if pausable and only owner)
     */
    function unpause() public onlyOwner {
        require(isPausable, "Token is not pausable");
        _unpause();
    }

    /**
     * @dev Batch transfer tokens to multiple addresses
     * @param recipients Array of recipient addresses
     * @param amounts Array of amounts to transfer
     */
    function batchTransfer(
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external returns (bool) {
        require(recipients.length == amounts.length, "Length mismatch");
        require(recipients.length > 0, "Empty arrays");
        
        for (uint256 i = 0; i < recipients.length; i++) {
            _transfer(_msgSender(), recipients[i], amounts[i]);
        }
        return true;
    }

    /**
     * @dev Batch mint tokens (only owner, only if mintable)
     * @param recipients Array of recipient addresses
     * @param amounts Array of amounts to mint
     */
    function batchMint(
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external onlyOwner {
        require(isMintable, "Token is not mintable");
        require(recipients.length == amounts.length, "Length mismatch");
        require(recipients.length > 0, "Empty arrays");
        
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }
        
        if (isCapped) {
            require(totalSupply() + totalAmount <= maxSupply, "Exceeds max supply");
        }
        
        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], amounts[i]);
        }
    }

    /**
     * @dev Get token metadata and configuration
     */
    function getTokenInfo() external view returns (
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 totalSupply_,
        uint256 maxSupply_,
        bool[6] memory features
    ) {
        return (
            name(),
            symbol(),
            decimals(),
            totalSupply(),
            maxSupply,
            [isMintable, isBurnable, isPausable, isCapped, hasPermit, hasVotes]
        );
    }

    /**
     * @dev Check if an address is the owner
     */
    function isOwner(address account) external view returns (bool) {
        return account == owner();
    }

    // Override required functions
    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable, ERC20Votes, ERC20Capped)
    {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}
