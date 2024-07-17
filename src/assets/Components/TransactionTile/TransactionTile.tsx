import "./TransactionTile.scss";

type TransactionTileProps = {
  vendor: string;
  amount: number;
  category: string;
  date: string;
};

const TransactionTile = ({
  vendor,
  amount,
  category,
  date,
}: TransactionTileProps) => {
  let emojiCategory;

  switch (category.toLowerCase()) {
    case "food":
      emojiCategory = "🍔";
      break;
    case "drink":
      emojiCategory = "☕";
      break;
    case "clothing":
      emojiCategory = "🛍";
      break;
    case "retail":
      emojiCategory = "🛍";
  }

  return (
    <div className="transaction-tile">
      <p className="transaction-tile__category">
        {emojiCategory}
        {}
      </p>
      <p className="transaction-tile__vendor">{vendor}</p>
      <p className="transaction-tile__amount">£{amount}</p>
      <p className="transaction-tile__date">{date}</p>
    </div>
  );
};

export default TransactionTile;
