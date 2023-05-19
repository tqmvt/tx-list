import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { addressShortener } from '@/lib/address-shortener';
import { roundValue } from '@/lib/round-value';
import { TransactionType } from '@/lib/types';
import useEvent from '@/hooks/use-event';
import useTxlist from '@/hooks/use-txlist';

import Input from '@/components/input/Input';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { useEventContext } from '@/context/event';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import DownArrow from '~/icons/arrow-down-solid.svg';
import UpArrow from '~/icons/arrow-up-solid.svg';
import LinkArrow from '~/icons/external-link-alt-solid.svg';

enum SortType {
  ASC,
  DESC,
  NONE,
}

export default function HomePage() {
  const { txlist } = useTxlist();
  const [transactionsList, setTransactionsList] = useState<TransactionType[]>(
    []
  );
  const { subscribe, unsubscribe } = useEvent();
  const { event, hasNewEvent, setHasNewEvent } = useEventContext();

  const [searchFrom, setSearchFrom] = useState<string>('');
  const [searchTo, setSearchTo] = useState<string>('');
  const [sortTimestamp, setSortTimestamp] = useState(SortType.NONE);
  const [sortAmount, setSortAmount] = useState(SortType.NONE);

  const handleSortTimestamp = () => {
    let sortType;
    if (sortTimestamp === SortType.ASC) {
      sortType = SortType.DESC;
    } else if (sortTimestamp === SortType.DESC) {
      sortType = SortType.NONE;
    } else {
      sortType = SortType.ASC;
    }
    setSortTimestamp(sortType);
  };

  const handleSortAmount = () => {
    let sortType;
    if (sortAmount === SortType.ASC) {
      sortType = SortType.DESC;
    } else if (sortAmount === SortType.DESC) {
      sortType = SortType.NONE;
    } else {
      sortType = SortType.ASC;
    }
    setSortAmount(sortType);
  };

  const handleCopy = (code: string) => async () => {
    navigator.clipboard.writeText(code);
    toast('Address copied!');
  };

  const getFilteredTransactions = (
    from: string,
    to: string,
    amountSort: SortType,
    timestampSort: SortType
  ) => {
    if (!transactionsList) return [];

    let transactions = transactionsList;
    if (timestampSort !== SortType.NONE) {
      transactions = transactions.sort(
        (a: TransactionType, b: TransactionType) =>
          timestampSort === SortType.ASC
            ? new Date(a.metadata.blockTimestamp).getTime() -
              new Date(b.metadata.blockTimestamp).getTime()
            : new Date(b.metadata.blockTimestamp).getTime() -
              new Date(a.metadata.blockTimestamp).getTime()
      );
    }

    if (amountSort !== SortType.NONE) {
      transactions = transactions.sort(
        (a: TransactionType, b: TransactionType) =>
          amountSort === SortType.ASC ? a.value - b.value : b.value - a.value
      );
    }

    return transactions.filter(
      (tx: TransactionType) =>
        tx.from.toLowerCase().includes(from.toLowerCase()) &&
        tx.to.toLowerCase().includes(to.toLowerCase())
    );
  };

  useEffect(() => {
    subscribe();

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (hasNewEvent) {
      const tempList: TransactionType[] = [...transactionsList];

      tempList.unshift(event);
      setTransactionsList(tempList);
      setHasNewEvent(false);
    }
    // eslint-disable-next-line
  }, [hasNewEvent]);

  useEffect(() => {
    setTransactionsList(txlist);
  }, [txlist]);

  return (
    <Layout>
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout min-h-screen'>
            <h1 className='mt-10'>TxList</h1>
            <p className='my-10 mt-3'>DAI transactions on the mainnet</p>

            <div className='md:flex md:justify-between lg:justify-start'>
              <Input
                value={searchFrom}
                setValue={(e) => setSearchFrom(e.target.value)}
                className='mr-5 w-full md:w-5/12 lg:w-auto'
                placeholder='sender'
              />

              <Input
                value={searchTo}
                setValue={(e) => setSearchTo(e.target.value)}
                className='w-full  md:w-5/12 lg:w-auto'
                placeholder='recipient'
              />
            </div>

            <div className='w-full overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='w-2/12'>
                      <div className='flex items-center'>
                        <span>txn hash</span>
                      </div>
                    </th>
                    <th className='w-2/12 text-left'>sender</th>
                    <th className='w-2/12 text-left'>recipient</th>
                    <th className='w-2/12 cursor-pointer'>
                      <div className='flex items-center'>
                        <span
                          onClick={handleSortAmount}
                          className='text-blue-800'
                        >
                          amount
                        </span>
                        {sortAmount === SortType.ASC && (
                          <DownArrow className='ml-2' />
                        )}
                        {sortAmount === SortType.DESC && (
                          <UpArrow className='ml-2' />
                        )}
                      </div>
                    </th>
                    <th className='w-4/12 cursor-pointer'>
                      <div className='flex items-center'>
                        <span
                          onClick={handleSortTimestamp}
                          className='text-blue-800'
                        >
                          timestamp
                        </span>
                        {sortTimestamp === SortType.ASC && (
                          <DownArrow className='ml-2' />
                        )}
                        {sortTimestamp === SortType.DESC && (
                          <UpArrow className='ml-2' />
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                {transactionsList &&
                  getFilteredTransactions(
                    searchFrom,
                    searchTo,
                    sortAmount,
                    sortTimestamp
                  ).map((tx: TransactionType, index: number) => {
                    return (
                      <tbody key={index}>
                        <tr className={tx.isNew ? 'bg-animation' : ''}>
                          <td className='w-2/12'>
                            <a
                              href={`https://etherscan.io/tx/${tx.hash}`}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='flex items-center'
                            >
                              <LinkArrow className='mr-3' />
                              <span>{addressShortener(tx.hash)}</span>
                            </a>
                          </td>
                          <td
                            onClick={handleCopy(tx.from)}
                            className='w-2/12 cursor-pointer'
                          >
                            {addressShortener(tx.from)}
                          </td>
                          <td
                            onClick={handleCopy(tx.to)}
                            className='w-2/12 cursor-pointer'
                          >
                            {addressShortener(tx.to)}
                          </td>
                          <td className='w-2/12'>
                            {roundValue(tx.value).toLocaleString()}
                          </td>
                          <td className='w-4/12'>
                            <span>{tx.metadata.blockTimestamp}</span>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            </div>

            <footer className='my-10 text-gray-700'>
              © {new Date().getFullYear()}
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
