export const useTransactionFilter = (transactions, searchTerm) => {
  const filteredTransactions = transactions.filter((transaction) =>
    Object.values(transaction).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return filteredTransactions;
};
