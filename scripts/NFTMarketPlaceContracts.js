var NFTContract = artifacts.require("NFTContract");
var MarketPlaceContract = artifacts.require("MarketPlaceContract");

async function logNftLists(marketplace) {
    let listedNfts = await marketplace.getListedNfts.call()
    //we change the first address of Ganache
    const accountAddress = '0x87912f1af571e00A5eCbA0a07b3de2777F5dAB2b'
    let myNfts = await marketplace.getMyNfts.call({from: accountAddress})
    let myListedNfts = await marketplace.getMyListedNfts.call({from: accountAddress})
    console.log(`listedNfts: ${listedNfts.length}`)
    console.log(`myNfts: ${myNfts.length}`)
    console.log(`myListedNfts ${myListedNfts.length}\n`)
}

const main = async (cb) => {
  try {
    //we deploy our two contracts
    const nft = await NFTContract.deployed()
    const marketplacecontract = await MarketPlaceContract.deployed()

    console.log('MINT AND LIST 3 NFTs')
    let listingFee = await marketplacecontract.getListingFee()
    listingFee = listingFee.toString()
    let txn1 = await nft.mint("URI1")
    let tokenId1 = txn1.logs[2].args[0].toNumber()
    await marketplacecontract.listNft(nft.address, tokenId1, 1, {value: listingFee})
    console.log(`Minted and listed ${tokenId1}`)
    let txn2 = await nft.mint("URI1")
    let tokenId2 = txn2.logs[2].args[0].toNumber()
    await marketplacecontract.listNft(nft.address, tokenId2, 1, {value: listingFee})
    console.log(`Minted and listed ${tokenId2}`)
    let txn3 = await nft.mint("URI1")
    let tokenId3 = txn3.logs[2].args[0].toNumber()
    await marketplacecontract.listNft(nft.address, tokenId3, 1, {value: listingFee})
    console.log(`Minted and listed ${tokenId3}`)
    await logNftLists(marketplacecontract)

    console.log('BUY 2 NFTs')
    await marketplacecontract.buyNft(nft.address, tokenId1, {value: 1})
    await marketplacecontract.buyNft(nft.address, tokenId2, {value: 1})
    await logNftLists(marketplacecontract)

    console.log('RESELL 1 NFT')
    await marketplacecontract.resellNft(nft.address, tokenId2, 1, {value: listingFee})
    await logNftLists(marketplacecontract)

  } catch(err) {
    console.log('Doh! ', err);
  }
  cb();
}

module.exports = main;