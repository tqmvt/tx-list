import useSWR from 'swr';
// import { fullNodeRpcProvider } from '@/hooks/use-event';
// import ENS, { getEnsAddress } from '@ensdomains/ensjs';
// import { TransactionType } from '@/pages/types';

const useTxlist = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR('/api/txlist', fetcher);

  // let txlist;
  // if (data?.transfers && fullNodeRpcProvider) {
  //   txlist = data.transfers.map(async (tx: TransactionType) => {
  //     const ens = new ENS({
  //       provider: fullNodeRpcProvider,
  //       ensAddress: getEnsAddress('1'),
  //     });
  //     const ensFrom = await ens.getName(tx.from);
  //     const ensTo = await ens.getName(tx.to);

  //     let txtemp = { ...tx };
  //     if (ensFrom?.name) txtemp.from = ensFrom;
  //     if (ensTo?.name) txtemp.to = ensTo;
  //   });
  // }
  return { txlist: data?.transfers, error };
};

export default useTxlist;
