import express from 'express';
import { ethers } from 'ethers';
import MyTokenABI from '../../../tier-3-contract/artifacts/contracts/MyToken.sol/MyToken.json';

const router = express.Router();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const contractAddress = process.env.CONTRACT_ADDRESS!;
const contract = new ethers.Contract(contractAddress, MyTokenABI.abi, provider);

router.get('/:address', async (req, res) => {
  const { address } = req.params;
  try {
    // Giả sử contract có function tokensOfOwner(address) trả tokenIds[]
    const tokenIds = await contract.tokensOfOwner(address);
    const tokens = await Promise.all(tokenIds.map(async (id: any) => {
      const owner = await contract.ownerOf(id);
      return { tokenId: id.toString(), owner };
    }));

    res.json(tokens);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tokens' });
  }
});

export default router;
