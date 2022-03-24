// SPDX-License-Identifier: AGPL-3.0-only

pragma solidity 0.8.10;

import "https://github.com/aave/lens-protocol/blob/main/contracts/interfaces/IFollowModule.sol";
import "https://github.com/aave/lens-protocol/blob/main/contracts/core/modules/ModuleBase.sol";
import "https://github.com/aave/lens-protocol/blob/main/contracts/core/modules/follow/FollowValidatorFollowModuleBase.sol";

interface MetaLensFactory_ERC721 {
    function balanceOf(address sender) external view returns (uint256);

    function safeMint(address to) external;
}

contract MetaLensFollowModule is
    IFollowModule,
    FollowValidatorFollowModuleBase
{
    error TokenInvalid();

    mapping(uint256 => uint256) internal _tokenIdByProfile;

    constructor(address hub) ModuleBase(hub) {}

    function initializeFollowModule(uint256 profileId, bytes calldata data)
        external
        override
        onlyHub
        returns (bytes memory)
    {
        uint256 tokenId = abi.decode(data, (uint256));
        _tokenIdByProfile[profileId] = tokenId;
        return data;
    }

    function processFollow(
        address follower,
        uint256 profileId,
        bytes calldata data
    ) external view override {
        uint256 tokenId = abi.decode(data, (uint256));
        if (tokenId != _tokenIdByProfile[profileId]) revert TokenInvalid();
    }

    function processFollowMint(address follower, address nftAddress)
        public
        returns (bool)
    {
        MetaLensFactory_ERC721 M = MetaLensFactory_ERC721(nftAddress);
        M.safeMint(follower);
        return true;
    }

    function followModuleTransferHook(
        uint256 profileId,
        address from,
        address to,
        uint256 followNFTTokenId
    ) external override {}
}
