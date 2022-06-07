// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

//we not use the same libs than the Remix IDE project
// import "https://github.com/0xcert/ethereum-erc721/src/contracts/tokens/nf-token-metadata.sol";
// import "https://github.com/0xcert/ethereum-erc721/src/contracts/ownership/ownable.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

//NFTsContract replace BoredPetsNFT 
contract NFTContract is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address marketplaceContract;
    event NFTMinted(uint256);

    constructor(address _marketplaceContract) ERC721("Futbol Club Barcelona", "FCB") {
        marketplaceContract = _marketplaceContract;
    }

    function mint(string memory _tokenURI) public {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        setApprovalForAll(marketplaceContract, true);
        emit NFTMinted(newTokenId);
    }

}