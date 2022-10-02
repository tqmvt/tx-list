import dayjs from 'dayjs';
import { ethers } from 'ethers';
import React from 'react';

import { useEventContext } from '@/context/event';
const AlchemyUrl = 'https://eth-mainnet.alchemyapi.io/v2/';

export const rpcProvider = new ethers.providers.StaticJsonRpcProvider(
  `${AlchemyUrl}${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
);

const daiContractAddress = process.env.NEXT_PUBLIC_DAI_CONTRACT_ADDRESS;
const filter = {
  address: daiContractAddress,
  topics: [ethers.utils.id('Transfer(address,address,uint256)')],
};

const blockTimestamp: Record<number, number> = {};

const setBlockTimestamp = (blockNumber: number, timestamp: number) => {
  blockTimestamp[blockNumber] = timestamp;
};

const getBlockTimestamp = async (blockNumber: number) => {
  if (!blockTimestamp[blockNumber]) {
    const timestamp = (await rpcProvider.getBlock(blockNumber)).timestamp;
    setBlockTimestamp(blockNumber, timestamp);

    // TODO: try-catch
  }

  return blockTimestamp[blockNumber];
};

const useEvent = () => {
  const { setEvent, setHasNewEvent, setCurrentBlockNumber } = useEventContext();

  // eslint-disable-next-line
  const filterCallback = React.useCallback(async (args: any) => {
    // Subscribe to Transfer events
    const {
      transactionHash,
      blockNumber,
      data,
      topics: [, _from, _to],
    } = args;

    const timestamp = await getBlockTimestamp(blockNumber);

    const convertedTimestamp = dayjs(timestamp * 1000).format(
      'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
    );

    setEvent({
      hash: transactionHash,
      value: Number(
        ethers.utils.formatEther(
          ethers.utils.hexStripZeros(data) !== '0x'
            ? ethers.BigNumber.from(ethers.utils.hexStripZeros(data)).toString()
            : '0'
        )
      ),
      from: ethers.utils.hexStripZeros(_from),
      to: ethers.utils.hexStripZeros(_to),
      metadata: {
        blockTimestamp: convertedTimestamp,
      },
      isNew: true,
    });

    setCurrentBlockNumber(blockNumber);
    setHasNewEvent(true);

    // eslint-disable-next-line
  }, []);

  const subscribe = React.useCallback(() => {
    // console.count('subscribe');

    rpcProvider.on(filter, filterCallback);
  }, [filterCallback]);

  const unsubscribe = React.useCallback(() => {
    // console.count('unsubscribe');
    rpcProvider.off(filter);
  }, []);

  return { unsubscribe, subscribe };
};

export default useEvent;
