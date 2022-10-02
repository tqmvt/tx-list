/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';

const apiUrl = 'https://eth-mainnet.alchemyapi.io/v2/';
const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const daiContractAddress = process.env.NEXT_PUBLIC_DAI_CONTRACT_ADDRESS;
const body = {
  id: 1,
  jsonrpc: '2.0',
  method: 'alchemy_getAssetTransfers',
  params: [
    {
      fromBlock: '0xEC36C4',
      toBlock: 'latest',
      contractAddresses: [daiContractAddress],
      category: ['erc20'],
      withMetadata: true,
      excludeZeroValue: true,
      maxCount: '0x64',
      order: 'desc',
    },
  ],
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(`${apiUrl}${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return res.status(response.status).end();
    }

    const data = await response.json();

    res.status(200).json(data.result);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};

export default handler;
