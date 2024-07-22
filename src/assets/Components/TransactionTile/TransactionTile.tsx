import "./TransactionTile.scss";

type TransactionTileProps = {
  vendor: string;
  amount: string;
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
    case "eating out":
      emojiCategory = "🍔";
      break;
    case "transport":
      emojiCategory = "🚌";
      break;
    case "shopping":
      emojiCategory = "🛍";
      break;
    case "groceries":
      emojiCategory = "🥦";
      break;
    case "bills":
      emojiCategory = "🧾";
      break;
    case "entertainment":
      emojiCategory = "🎭";
      break;
      case "gifts":
      emojiCategory = "🎁";
      break;
      case "health":
      emojiCategory = "🧬";
      break;
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
